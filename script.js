// script.js
let restaurantInfo = { ...DEFAULT_RESTAURANT_INFO };
let menuData = [];
let allOrdersCache = [];
let activeCategory = "الكل";
let cart = {};
let orderType = "dinein"; // الافتراضي صالة داخل المطعم
let appliedDiscount = 0;
let currentDetailItem = null;
let activeOrderId = localStorage.getItem("last_order_id") || null;
let currentTrackedOrder = null;
let countdownInterval = null;

const categoriesBar = document.getElementById("categoriesBar");
const menuContainer = document.getElementById("menuContainer");
const featuredSection = document.getElementById("featuredSection");
const featuredSlider = document.getElementById("featuredSlider");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

const floatingCart = document.getElementById("floatingCart");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");
const openCartBtn = document.getElementById("openCartBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeCartBtn = document.getElementById("closeCartBtn");
const selectedItemsList = document.getElementById("selectedItemsList");
const sendOrderBtn = document.getElementById("sendOrderBtn");

const infoModal = document.getElementById("infoModal");
const itemDetailModal = document.getElementById("itemDetailModal");
const orderTrackerModal = document.getElementById("orderTrackerModal");

const toastNotification = document.getElementById("toastNotification");
const toastText = document.getElementById("toastText");
let toastTimeout;

function showToast(msg) {
  toastText.textContent = msg;
  toastNotification.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toastNotification.classList.remove("show"), 1800);
}

function applyDesignSettings(design) {
  const d = { ...DEFAULT_RESTAURANT_INFO.design, ...design };
  document.body.setAttribute("data-layout", d.layout || "modern");
  document.documentElement.style.setProperty("--color-primary", d.primaryColor || "#D97706");
  document.documentElement.style.setProperty("--color-primary-soft", `${d.primaryColor || "#D97706"}22`);
  document.documentElement.style.setProperty("--card-radius", d.borderRadius || "18px");
  document.documentElement.style.setProperty("--font-scale", d.fontScale || "1");

  const userOverrideTheme = localStorage.getItem("user_theme_override");
  const activeTheme = userOverrideTheme || d.themeMode || "light";
  document.documentElement.setAttribute("data-theme", activeTheme);
  themeIcon.textContent = activeTheme === "dark" ? "☀️" : "🌙";
}

themeToggleBtn.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("user_theme_override", next);
  themeIcon.textContent = next === "dark" ? "☀️" : "🌙";
});

function populateTablesDropdown() {
  const select = document.getElementById("custTableSelect");
  const total = Number(restaurantInfo.totalTables || 12);
  // معرفة الترابيزات المشغولة حالياً
  const occupiedTables = allOrdersCache
    .filter(o => o.orderType === "dinein" && o.status !== "completed" && o.status !== "cancelled")
    .map(o => Number(o.tableNumber));

  let optionsHTML = `<option value="">-- اختر رقم الترابيزة --</option>`;
  for (let t = 1; t <= total; t++) {
    const isBusy = occupiedTables.includes(t);
    optionsHTML += `<option value="${t}">ترابيزة رقم ${t} ${isBusy ? "(مشغولة حالياً)" : "(متاحة)"}</option>`;
  }
  select.innerHTML = optionsHTML;
}

function applyRestaurantInfo(info) {
  restaurantInfo = { ...DEFAULT_RESTAURANT_INFO, ...info };
  applyDesignSettings(restaurantInfo.design);

  document.title = `${restaurantInfo.name} | قائمة الطعام`;
  document.getElementById("restName").textContent = restaurantInfo.name;
  document.getElementById("restTagline").textContent = restaurantInfo.tagline;
  if (restaurantInfo.logo) document.getElementById("restLogo").src = restaurantInfo.logo;
  if (restaurantInfo.coverImg) document.getElementById("restCoverImg").src = restaurantInfo.coverImg;

  const isOpen = restaurantInfo.isOpen !== false;
  document.getElementById("closedBanner").style.display = isOpen ? "none" : "block";
  const statusPill = document.getElementById("restStatusPill");
  statusPill.className = `status-pill ${isOpen ? "open" : "closed"}`;
  statusPill.textContent = isOpen ? "● مفتوح الآن" : "● مغلق حالياً";
  sendOrderBtn.disabled = !isOpen;
  sendOrderBtn.textContent = isOpen ? "تأكيد وإرسال الطلب الآن ✓" : "عذراً، المطعم مغلق حالياً";

  document.getElementById("restHotlineText").textContent = restaurantInfo.hotline;
  document.getElementById("restHotlineLink").href = `tel:${restaurantInfo.hotline}`;
  document.getElementById("restMapDirect").href = restaurantInfo.mapUrl || "#";
  document.getElementById("footerText").textContent = `${restaurantInfo.name} • جميع الحقوق محفوظة`;

  document.getElementById("infoModalTitle").textContent = `عن ${restaurantInfo.name}`;
  document.getElementById("infoAbout").textContent = restaurantInfo.about;
  document.getElementById("infoHours").textContent = restaurantInfo.workingHours;
  document.getElementById("infoAddress").textContent = restaurantInfo.address;
  document.getElementById("infoMapLink").href = restaurantInfo.mapUrl || "#";
  document.getElementById("infoPhoneLink").textContent = restaurantInfo.hotline;
  document.getElementById("infoPhoneLink").href = `tel:${restaurantInfo.hotline}`;

  const socialRow = document.getElementById("socialLinksRow");
  let socialHTML = "";
  if (restaurantInfo.facebook) socialHTML += `<a href="${restaurantInfo.facebook}" target="_blank" class="social-pill">فيسبوك</a>`;
  if (restaurantInfo.instagram) socialHTML += `<a href="${restaurantInfo.instagram}" target="_blank" class="social-pill">إنستجرام</a>`;
  socialRow.innerHTML = socialHTML;

  populateTablesDropdown();
  updateCartUIOnly();
}

function initFirebaseListeners() {
  db.ref("restaurantInfo").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) applyRestaurantInfo(data);
    else {
      db.ref("restaurantInfo").set(DEFAULT_RESTAURANT_INFO);
      applyRestaurantInfo(DEFAULT_RESTAURANT_INFO);
    }
  });

  db.ref("menuItems").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const rawList = Array.isArray(data) ? data : Object.values(data);
      menuData = rawList.filter(item => item && item.available !== false);
    } else {
      const initialObj = {};
      DEFAULT_MENU_ITEMS.forEach(item => { initialObj[item.id] = item; });
      db.ref("menuItems").set(initialObj);
      menuData = DEFAULT_MENU_ITEMS;
    }
    renderCategories();
    renderFeatured();
    renderMenu();
    updateCartUIOnly();
  });

  db.ref("orders").on("value", (snap) => {
    const data = snap.val();
    allOrdersCache = data ? Object.values(data) : [];
    populateTablesDropdown();
  });

  if (activeOrderId) listenToOrderStatus(activeOrderId);
}

function renderCategories() {
  const uniqueCats = ["الكل", ...new Set(menuData.map(item => item.category))];
  if (!uniqueCats.includes(activeCategory)) activeCategory = "الكل";
  categoriesBar.innerHTML = uniqueCats.map(cat => `
    <button class="cat-tab ${cat === activeCategory ? 'active' : ''}" onclick="selectCategory('${cat}', this)">${cat}</button>
  `).join("");
}

function selectCategory(cat, el) {
  activeCategory = cat;
  renderCategories();
  renderMenu();
  if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function renderFeatured() {
  const featured = menuData.filter(i => i.badge && i.badge.trim() !== "");
  if (featured.length === 0 || activeCategory !== "الكل" || searchInput.value.trim() !== "") {
    featuredSection.style.display = "none";
    return;
  }
  featuredSection.style.display = "block";
  featuredSlider.innerHTML = featured.map(item => {
    const qty = cart[item.id] || 0;
    return `
      <div class="featured-card">
        <div class="featured-thumb" onclick="openItemDetail('${item.id}')">
          <span class="item-badge ${item.badge.includes('عرض') ? 'offer' : ''}">${item.badge}</span>
          <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='./mixed-grill.jpg';" />
        </div>
        <div class="featured-body">
          <h4 onclick="openItemDetail('${item.id}')">${item.name}</h4>
          <div class="featured-footer">
            <span class="item-price">${item.price} ج.م</span>
            ${qty > 0 ? `
              <div class="qty-counter">
                <button class="qty-btn" onclick="decreaseCart('${item.id}')">-</button>
                <span class="qty-num">${qty}</span>
                <button class="qty-btn" onclick="addToCart('${item.id}')">+</button>
              </div>
            ` : `<button class="add-btn" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}')">+</button>`}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function addToCart(id, name) {
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
  if (name) showToast(`تمت إضافة ${name}`);
}

function decreaseCart(id) {
  if (cart[id]) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    updateCart();
  }
}

function calculateTotals() {
  let count = 0;
  let subTotal = 0;
  Object.keys(cart).forEach(id => {
    const item = menuData.find(d => String(d.id) === String(id));
    if (item) {
      count += cart[id];
      subTotal += cart[id] * Number(item.price);
    }
  });

  const vatRate = restaurantInfo.vatEnabled !== false ? Number(restaurantInfo.vatRate || 14) : 0;
  const vatAmount = Math.round((subTotal * vatRate) / 100);
  const deliveryFee = (orderType === "delivery" && subTotal > 0) ? Number(restaurantInfo.deliveryFee || 0) : 0;
  const discount = subTotal > 0 ? appliedDiscount : 0;
  const grandTotal = Math.max(0, subTotal + vatAmount + deliveryFee - discount);

  return { count, subTotal, vatRate, vatAmount, deliveryFee, discount, grandTotal };
}

function updateCartUIOnly() {
  const { count, subTotal, vatRate, vatAmount, deliveryFee, discount, grandTotal } = calculateTotals();
  cartBadge.textContent = count;
  cartTotal.textContent = `${subTotal} ج.م`;

  document.getElementById("subTotalText").textContent = `${subTotal} ج.م`;
  
  const vatRow = document.getElementById("vatRow");
  if (vatRate > 0) {
    vatRow.style.display = "flex";
    vatRow.querySelector("span:first-child").textContent = `ضريبة القيمة المضافة (${vatRate}%):`;
    document.getElementById("vatText").textContent = `${vatAmount} ج.م`;
  } else {
    vatRow.style.display = "none";
  }

  document.getElementById("deliveryFeeRow").style.display = orderType === "delivery" ? "flex" : "none";
  document.getElementById("deliveryFeeText").textContent = deliveryFee > 0 ? `${deliveryFee} ج.م` : "مجاني";
  
  document.getElementById("discountRow").style.display = discount > 0 ? "flex" : "none";
  document.getElementById("discountText").textContent = `-${discount} ج.م`;
  document.getElementById("finalTotal").textContent = `${grandTotal} ج.م`;

  if (count > 0) floatingCart.classList.add("active");
  else {
    floatingCart.classList.remove("active");
    checkoutModal.classList.remove("active");
  }
  if (currentDetailItem) renderDetailActions(currentDetailItem);
}

function updateCart() {
  updateCartUIOnly();
  renderFeatured();
  renderMenu();
  renderCartSheet();
}

function renderCartSheet() {
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    selectedItemsList.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:0.85rem; padding:10px 0;">السلة فارغة</p>`;
    return;
  }
  selectedItemsList.innerHTML = ids.map(id => {
    const item = menuData.find(d => String(d.id) === String(id));
    if (!item) return "";
    const qty = cart[id];
    return `
      <div class="cart-item-row">
        <div>
          <strong>${item.name}</strong>
          <div style="color:var(--text-muted); font-size:0.75rem;">${item.price * qty} ج.م (${item.price} × ${qty})</div>
        </div>
        <div class="qty-counter">
          <button class="qty-btn" onclick="decreaseCart('${item.id}')">-</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="addToCart('${item.id}')">+</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderMenu() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = menuData.filter(item => {
    const matchCat = activeCategory === "الكل" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(q) || (item.desc && item.desc.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    menuContainer.innerHTML = `<div class="loading-state">لا توجد أصناف مطابقة للبحث.</div>`;
    return;
  }

  const groups = {};
  filtered.forEach(item => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  });

  menuContainer.innerHTML = Object.keys(groups).map(cat => `
    <section class="menu-section">
      <h3 class="section-title">${cat}</h3>
      <div class="items-list">
        ${groups[cat].map(item => {
          const qty = cart[item.id] || 0;
          const badgeHTML = item.badge ? `<span class="item-badge ${item.badge.includes('عرض') ? 'offer' : ''}">${item.badge}</span>` : "";
          return `
            <div class="item-card">
              <div class="item-thumb" onclick="openItemDetail('${item.id}')">
                ${badgeHTML}
                <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='./mixed-grill.jpg';" />
              </div>
              <div class="item-details">
                <h4 onclick="openItemDetail('${item.id}')">${item.name}</h4>
                <p>${item.desc || ""}</p>
                <div class="item-footer">
                  <span class="item-price">${item.price} ج.م</span>
                  ${qty > 0 ? `
                    <div class="qty-counter">
                      <button class="qty-btn" onclick="decreaseCart('${item.id}')">-</button>
                      <span class="qty-num">${qty}</span>
                      <button class="qty-btn" onclick="addToCart('${item.id}')">+</button>
                    </div>
                  ` : `<button class="add-btn" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}')">أضف +</button>`}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
}

window.openItemDetail = function(id) {
  const item = menuData.find(d => String(d.id) === String(id));
  if (!item) return;
  currentDetailItem = item;
  document.getElementById("detailImg").src = item.img || "./mixed-grill.jpg";
  document.getElementById("detailName").textContent = item.name;
  document.getElementById("detailPrice").textContent = `${item.price} ج.م`;
  document.getElementById("detailDesc").textContent = item.desc || "محضر طازجاً بأجود المكونات.";
  const badgeEl = document.getElementById("detailBadge");
  if (item.badge) { badgeEl.textContent = item.badge; badgeEl.style.display = "inline-block"; }
  else badgeEl.style.display = "none";
  renderDetailActions(item);
  itemDetailModal.classList.add("active");
};

function renderDetailActions(item) {
  const qty = cart[item.id] || 0;
  const box = document.getElementById("detailActions");
  if (qty > 0) {
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="qty-counter" style="padding:6px 12px;">
          <button class="qty-btn" onclick="decreaseCart('${item.id}')">-</button>
          <span class="qty-num" style="font-size:1rem;">${qty}</span>
          <button class="qty-btn" onclick="addToCart('${item.id}')">+</button>
        </div>
        <button class="add-btn" style="padding:10px 18px; background:var(--color-primary); color:var(--color-primary-text);" onclick="itemDetailModal.classList.remove('active')">متابعة التصفح ✓</button>
      </div>
    `;
  } else {
    box.innerHTML = `<button class="btn-submit-order" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}')">إضافة للطلب • ${item.price} ج.م</button>`;
  }
}

document.getElementById("closeItemDetailBtn").addEventListener("click", () => { itemDetailModal.classList.remove("active"); currentDetailItem = null; });
itemDetailModal.addEventListener("click", (e) => { if (e.target === itemDetailModal) { itemDetailModal.classList.remove("active"); currentDetailItem = null; } });

document.getElementById("applyPromoBtn").addEventListener("click", () => {
  const entered = document.getElementById("promoInput").value.trim().toUpperCase();
  const msgEl = document.getElementById("promoMsg");
  msgEl.style.display = "block";

  if (restaurantInfo.promoCode && entered === restaurantInfo.promoCode.toUpperCase()) {
    appliedDiscount = Number(restaurantInfo.promoDiscount || 0);
    msgEl.style.color = "#16a34a";
    msgEl.textContent = `✓ تم تطبيق خصم ${appliedDiscount} ج.م بنجاح!`;
  } else {
    appliedDiscount = 0;
    msgEl.style.color = "#dc2626";
    msgEl.textContent = "✕ كود الخصم غير صحيح أو منتهي";
  }
  updateCartUIOnly();
});

searchInput.addEventListener("input", () => {
  clearSearchBtn.style.display = searchInput.value.trim().length > 0 ? "block" : "none";
  renderFeatured();
  renderMenu();
});
clearSearchBtn.addEventListener("click", () => { searchInput.value = ""; clearSearchBtn.style.display = "none"; renderFeatured(); renderMenu(); });

document.getElementById("openInfoBtn").addEventListener("click", () => infoModal.classList.add("active"));
document.getElementById("openInfoBtn2").addEventListener("click", () => infoModal.classList.add("active"));
document.getElementById("closeInfoBtn").addEventListener("click", () => infoModal.classList.remove("active"));
infoModal.addEventListener("click", (e) => { if (e.target === infoModal) infoModal.classList.remove("active"); });

openCartBtn.addEventListener("click", () => checkoutModal.classList.add("active"));
closeCartBtn.addEventListener("click", () => checkoutModal.classList.remove("active"));
checkoutModal.addEventListener("click", (e) => { if (e.target === checkoutModal) checkoutModal.classList.remove("active"); });

// التبديل بين صالة ودليفري
document.getElementById("typeDineinBtn").addEventListener("click", function() {
  orderType = "dinein";
  this.classList.add("active");
  document.getElementById("typeDeliveryBtn").classList.remove("active");
  document.getElementById("tableFieldLabel").style.display = "flex";
  document.getElementById("addressFieldLabel").style.display = "none";
  updateCartUIOnly();
});

document.getElementById("typeDeliveryBtn").addEventListener("click", function() {
  orderType = "delivery";
  this.classList.add("active");
  document.getElementById("typeDineinBtn").classList.remove("active");
  document.getElementById("tableFieldLabel").style.display = "none";
  document.getElementById("addressFieldLabel").style.display = "flex";
  updateCartUIOnly();
});

// إرسال الطلب
sendOrderBtn.addEventListener("click", () => {
  if (restaurantInfo.isOpen === false) return;

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const tableNumber = document.getElementById("custTableSelect").value;
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("custNotes").value.trim();

  if (!name || !phone) { alert("يرجى إدخال الاسم ورقم الموبايل"); return; }
  if (orderType === "dinein" && !tableNumber) { alert("يرجى اختيار رقم الترابيزة"); return; }
  if (orderType === "delivery" && !address) { alert("يرجى إدخال العنوان بالتفصيل للتوصيل"); return; }

  const itemsList = [];
  Object.keys(cart).forEach(id => {
    const item = menuData.find(d => String(d.id) === String(id));
    if (item) {
      itemsList.push({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        qty: cart[id],
        total: Number(item.price) * cart[id]
      });
    }
  });

  if (itemsList.length === 0) return;

  const { subTotal, vatRate, vatAmount, deliveryFee, discount, grandTotal } = calculateTotals();
  const orderNumber = Math.floor(1000 + Math.random() * 9000);
  const orderId = `ord_${Date.now()}`;
  const prepMins = Number(restaurantInfo.prepTimeMinutes || 20);

  const orderPayload = {
    orderId,
    orderNumber,
    customerName: name,
    customerPhone: phone,
    orderType,
    tableNumber: orderType === "dinein" ? Number(tableNumber) : null,
    address: orderType === "dinein" ? `صالة - ترابيزة ${tableNumber}` : address,
    notes,
    items: itemsList,
    subTotal,
    vatRate,
    vatAmount,
    deliveryFee,
    discount,
    grandTotal,
    status: "pending", // pending (مفتوح/قيد التحضير) | preparing | delivering | completed (تم التحصيل)
    estimatedReadyAt: Date.now() + prepMins * 60 * 1000,
    createdAt: Date.now()
  };

  sendOrderBtn.disabled = true;
  sendOrderBtn.textContent = "جاري إرسال الطلب...";

  db.ref(`orders/${orderId}`).set(orderPayload).then(() => {
    cart = {};
    appliedDiscount = 0;
    localStorage.setItem("last_order_id", orderId);
    activeOrderId = orderId;
    checkoutModal.classList.remove("active");
    updateCart();
    listenToOrderStatus(orderId);
    orderTrackerModal.classList.add("active");
  }).finally(() => {
    sendOrderBtn.disabled = false;
    sendOrderBtn.textContent = "تأكيد وإرسال الطلب الآن ✓";
  });
});

// عداد تنازلي للصالة
function startDineinCountdown(readyTimestamp) {
  if (countdownInterval) clearInterval(countdownInterval);
  const digitsEl = document.getElementById("countdownDigits");

  function tick() {
    const diff = readyTimestamp - Date.now();
    if (diff <= 0) {
      digitsEl.textContent = "00:00";
      document.getElementById("trackerStatusTitle").textContent = "طلبك جاهز وينزل على الترابيزة الآن! 🍽️";
      clearInterval(countdownInterval);
      return;
    }
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    digitsEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  tick();
  countdownInterval = setInterval(tick, 1000);
}

// متابعة الطلب والفاتورة لايف
function listenToOrderStatus(orderId) {
  const trackBtn = document.getElementById("trackMyOrderBtn");
  db.ref(`orders/${orderId}`).on("value", (snap) => {
    const ord = snap.val();
    currentTrackedOrder = ord;
    if (!ord) {
      trackBtn.style.display = "none";
      return;
    }
    trackBtn.style.display = "inline-flex";
    document.getElementById("trackerOrderNum").textContent = `طلب #${ord.orderNumber} ${ord.orderType === "dinein" ? `• ترابيزة ${ord.tableNumber}` : ""}`;

    const dineinBox = document.getElementById("dineinLiveSection");
    const deliveryBox = document.getElementById("deliveryStepsSection");

    if (ord.orderType === "dinein") {
      // تجربة الصالة: عداد وقت + حساب مفتوح بدون "في الطريق"
      dineinBox.style.display = "block";
      deliveryBox.style.display = "none";
      const tabBadge = document.getElementById("openTabStatusBadge");

      if (ord.status === "completed") {
        if (countdownInterval) clearInterval(countdownInterval);
        document.getElementById("countdownDigits").textContent = "تم التحصيل ✓";
        document.getElementById("trackerStatusTitle").textContent = "تم سداد الفاتورة وإغلاق الترابيزة ✅";
        document.getElementById("trackerStatusDesc").textContent = "شكراً لزيارتك! يمكنك حفظ الإيصال PDF بالأسفل.";
        tabBadge.textContent = "✅ تم التحصيل والحساب مغلق";
        tabBadge.style.background = "rgba(37, 99, 235, 0.14)";
        tabBadge.style.color = "#2563eb";
      } else {
        document.getElementById("trackerStatusTitle").textContent = "تم استلام طلبك وجاري تحضيره 👨‍🍳";
        document.getElementById("trackerStatusDesc").textContent = `سينزل على ترابيزة رقم ${ord.tableNumber} خلال الوقت الموضح.`;
        tabBadge.textContent = "🟢 حساب الترابيزة مفتوح (أي إضافات تطلبها ستظهر هنا فوراً)";
        startDineinCountdown(ord.estimatedReadyAt || (ord.createdAt + 20 * 60000));
      }
    } else {
      // تجربة الدليفري
      dineinBox.style.display = "none";
      deliveryBox.style.display = "grid";

      const steps = ["pending", "preparing", "delivering", "completed"];
      steps.forEach(s => document.getElementById(`step-${s}`).classList.remove("active"));
      const currentIdx = steps.indexOf(ord.status);
      if (currentIdx >= 0) {
        for (let i = 0; i <= currentIdx; i++) document.getElementById(`step-${steps[i]}`).classList.add("active");
      }

      const statusInfo = {
        pending: { title: "تم استلام طلبك بنجاح ⏳", desc: "طلبك وصل للكاشير وجاري تأكيده الآن." },
        preparing: { title: "الشيف بدأ يجهز طلبك 👨‍🍳", desc: "أكلك بيتحضر طازج الآن في المطبخ." },
        delivering: { title: "طلبك خرج للتوصيل 🛵", desc: "المندوب في الطريق إليك حالاً." },
        completed: { title: "تم تسليم الطلب بنجاح ✅", desc: "بالهنا والشفا! نتمنى لك تجربة رائعة." },
        cancelled: { title: "عذراً، تم إلغاء الطلب ❌", desc: "يرجى التواصل مع المطعم للاستفسار." }
      };
      const info = statusInfo[ord.status] || statusInfo.pending;
      document.getElementById("trackerStatusTitle").textContent = info.title;
      document.getElementById("trackerStatusDesc").textContent = info.desc;
    }

    // عرض الفاتورة المحدثة بالضريبة وأي إضافات ضافها الكاشير
    document.getElementById("trackerOrderDetails").innerHTML = `
      <strong style="display:block; margin-bottom:6px; color:var(--color-primary);">تفاصيل الفاتورة الحالية:</strong>
      ${(ord.items || []).map(i => `<div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>• ${i.name} × ${i.qty}</span><strong>${i.total} ج.م</strong></div>`).join("")}
      <div style="border-top:1px dashed var(--border-subtle); margin-top:6px; padding-top:6px;">
        <div style="display:flex; justify-content:space-between; color:var(--text-muted);"><span>المجموع الفرعي:</span><span>${ord.subTotal} ج.م</span></div>
        ${ord.vatAmount > 0 ? `<div style="display:flex; justify-content:space-between; color:var(--text-muted);"><span>ضريبة القيمة المضافة (${ord.vatRate || 14}%):</span><span>${ord.vatAmount} ج.م</span></div>` : ""}
        ${ord.deliveryFee > 0 ? `<div style="display:flex; justify-content:space-between; color:var(--text-muted);"><span>التوصيل:</span><span>${ord.deliveryFee} ج.م</span></div>` : ""}
        ${ord.discount > 0 ? `<div style="display:flex; justify-content:space-between; color:#16a34a;"><span>الخصم:</span><span>-${ord.discount} ج.م</span></div>` : ""}
        <div style="display:flex; justify-content:space-between; font-size:0.98rem; font-weight:900; margin-top:5px;">
          <span>الإجمالي النهائي:</span><strong style="color:var(--color-primary);">${ord.grandTotal} ج.م</strong>
        </div>
      </div>
    `;
  });
}

document.getElementById("customerPrintPdfBtn").addEventListener("click", () => {
  if (currentTrackedOrder) printThermalReceipt(currentTrackedOrder, restaurantInfo);
});

document.getElementById("trackMyOrderBtn").addEventListener("click", () => orderTrackerModal.classList.add("active"));
document.getElementById("closeTrackerBtn").addEventListener("click", () => orderTrackerModal.classList.remove("active"));
orderTrackerModal.addEventListener("click", (e) => { if (e.target === orderTrackerModal) orderTrackerModal.classList.remove("active"); });

initFirebaseListeners();