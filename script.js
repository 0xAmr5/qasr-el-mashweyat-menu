// script.js (Fast Cached & Optimized)
let restaurantInfo = JSON.parse(localStorage.getItem("cached_rest_info") || "null") || { ...DEFAULT_RESTAURANT_INFO };
let menuItems = JSON.parse(localStorage.getItem("cached_menu_items") || "null") || [...DEFAULT_MENU_ITEMS];
let cart = JSON.parse(localStorage.getItem("rest_cart") || "[]");
let selectedCategory = "الكل";
let searchQuery = "";
let appliedDiscount = 0;
let countdownInterval = null;
let currentTrackedOrder = null;
let activeTableOrder = null;

const FALLBACK_IMG = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=70";
const DEFAULT_COVER_PHOTO = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=75";

// تحسين سرعة روابط الصور تلقائياً
function resolveSafeImg(img) {
  if (!img) return FALLBACK_IMG;
  if (img.includes("images.unsplash.com")) {
    return img.replace(/w=\d+/, "w=400").replace(/q=\d+/, "q=70");
  }
  if (img.startsWith("http") || img.startsWith("data:") || img.startsWith("./")) return img;
  return `./${img}`;
}

function resolveSafeCover(url) {
  if (!url || (!url.startsWith("http") && !url.startsWith("data:"))) {
    return DEFAULT_COVER_PHOTO;
  }
  if (url.includes("images.unsplash.com")) {
    return url.replace(/w=\d+/, "w=900").replace(/q=\d+/, "q=75");
  }
  return url;
}

// قراءة رقم الترابيزة من الرابط (?table=2)
const urlParams = new URLSearchParams(window.location.search);
const tableParam = urlParams.get("table");
const currentTableNumber = tableParam && Number(tableParam) > 0 ? Number(tableParam) : null;
const isTableMode = currentTableNumber !== null;

const tableBannerEl = document.getElementById("tableModeBanner");
const tableLabelEl = document.getElementById("tableBannerLabel");
if (isTableMode && tableBannerEl && tableLabelEl) {
  tableBannerEl.style.display = "flex";
  tableLabelEl.textContent = `ترابيزة رقم ${currentTableNumber}`;
}

// تقييد خانة رقم الموبايل بـ 11 رقم فقط
const custPhoneInput = document.getElementById("custPhone");
if (custPhoneInput) {
  custPhoneInput.setAttribute("maxlength", "11");
  custPhoneInput.setAttribute("inputmode", "numeric");
  custPhoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
  });
}

// دالة طباعة الريسيت الحراري المنسق
window.printThermalReceipt = (ord, info) => {
  const rInfo = info || restaurantInfo;
  const win = window.open("", "_blank", "width=420,height=680");
  if (!win) {
    alert("اسمح بفتح النوافذ المنبثقة لطباعة الفاتورة");
    return;
  }
  const rowsHtml = (ord.items || [])
    .map(
      (i) => `
      <tr>
        <td style="text-align:right;">${i.name}</td>
        <td style="text-align:center;">${i.qty}</td>
        <td style="text-align:left;">${i.total} ج.م</td>
      </tr>
    `
    )
    .join("");

  win.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>فاتورة #${ord.orderNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;800;900&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; width: 310px; margin: 0 auto; padding: 14px; color: #000; background: #fff; }
        .center { text-align: center; }
        .divider { border-top: 1px dashed #333; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { border-bottom: 1px solid #000; padding-bottom: 5px; }
        td { padding: 5px 0; }
        .tot-row { display: flex; justify-content: space-between; font-size: 13px; margin: 4px 0; }
        .grand { font-size: 16px; font-weight: 900; border-top: 1px solid #000; padding-top: 6px; margin-top: 6px; }
      </style>
    </head>
    <body>
      <div class="center">
        <h2 style="margin:0; font-size:19px;">${rInfo.name || "قصر المشويات"}</h2>
        <div style="font-size:12px;">${rInfo.address || ""}</div>
        <div style="font-size:12px;">هاتف: ${rInfo.hotline || ""}</div>
      </div>
      <div class="divider"></div>
      <div style="font-size:12px; line-height:1.7;">
        <div><strong>رقم الفاتورة:</strong> #${ord.orderNumber}</div>
        <div><strong>النوع:</strong> ${ord.orderType === "dinein" ? `صالة — ترابيزة ${ord.tableNumber}` : "توصيل دليفري"}</div>
        <div><strong>العميل:</strong> ${ord.customerName} ${ord.customerPhone ? `(${ord.customerPhone})` : ""}</div>
        <div><strong>التاريخ:</strong> ${new Date(ord.createdAt || Date.now()).toLocaleString("ar-EG")}</div>
      </div>
      <div class="divider"></div>
      <table>
        <thead>
          <tr>
            <th style="text-align:right;">الصنف</th>
            <th style="text-align:center;">الكمية</th>
            <th style="text-align:left;">السعر</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div class="divider"></div>
      <div class="tot-row"><span>المجموع الفرعي:</span><span>${ord.subTotal} ج.م</span></div>
      ${ord.vatAmount > 0 ? `<div class="tot-row"><span>الضريبة (${ord.vatRate || 14}%):</span><span>${ord.vatAmount} ج.م</span></div>` : ""}
      ${ord.deliveryFee > 0 ? `<div class="tot-row"><span>رسوم التوصيل:</span><span>${ord.deliveryFee} ج.م</span></div>` : ""}
      ${ord.discount > 0 ? `<div class="tot-row"><span>الخصم:</span><span>-${ord.discount} ج.م</span></div>` : ""}
      <div class="tot-row grand"><span>الإجمالي النهائي:</span><span>${ord.grandTotal} ج.م</span></div>
      <div class="divider"></div>
      <div class="center" style="font-size:12px; font-weight:800;">شكراً لزيارتكم — نتمنى لكم وجبة شهية</div>
      <script>window.onload = () => setTimeout(() => window.print(), 350);<\/script>
    </body>
    </html>
  `);
  win.document.close();
};

// نظام الثيم التلقائي حسب الجهاز
const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  const resolved = theme === "auto" ? getSystemTheme() : theme;
  htmlEl.setAttribute("data-theme", resolved);
  if (themeIcon) themeIcon.textContent = resolved === "dark" ? "☀️" : "🌙";
}

setTheme(localStorage.getItem("rest_theme") || "auto");

if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (!localStorage.getItem("rest_theme")) setTheme("auto");
  });
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("rest_theme", next);
    setTheme(next);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toastMsg");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2300);
}

// نداء الويتر من الترابيزة
const callWaiterBtn = document.getElementById("callWaiterBtn");
if (callWaiterBtn) {
  callWaiterBtn.addEventListener("click", () => {
    if (!isTableMode) return;
    callWaiterBtn.disabled = true;
    callWaiterBtn.textContent = "جاري الإرسال...";
    const callId = `waiter_${currentTableNumber}_${Date.now()}`;
    db.ref(`orders/${callId}`)
      .set({
        orderId: callId,
        orderType: "waiter_call",
        tableNumber: currentTableNumber,
        status: "pending",
        createdAt: Date.now()
      })
      .then(() => {
        showToast(`تم إرسال نداء للكابتن — ترابيزة رقم ${currentTableNumber}`);
        callWaiterBtn.textContent = "تم استدعاء الويتر ✓";
        setTimeout(() => {
          callWaiterBtn.disabled = false;
          callWaiterBtn.textContent = "استدعاء الويتر";
        }, 8000);
      })
      .catch(() => {
        alert("تعذر إرسال النداء، تأكد من الاتصال بالإنترنت");
        callWaiterBtn.disabled = false;
        callWaiterBtn.textContent = "استدعاء الويتر";
      });
  });
}

function applyCustomDesign(design) {
  const d = { ...DEFAULT_RESTAURANT_INFO.design, ...(design || {}) };
  document.documentElement.style.setProperty("--brand-primary", d.primaryColor || "#D49638");
  document.documentElement.style.setProperty("--card-radius", d.borderRadius || "20px");
  document.documentElement.style.fontSize = `${Number(d.fontScale || 1) * 16}px`;

  if (!localStorage.getItem("rest_theme")) {
    setTheme(d.themeMode || "auto");
  }

  const menuContainer = document.getElementById("menuContainer");
  if (menuContainer) {
    menuContainer.className = `menu-sections-wrap layout-${d.layout || "luxury"} ${
      d.showIncludes === false ? "hide-includes" : ""
    }`;
  }
}

function renderRestaurantInfo() {
  document.title = isTableMode
    ? `${restaurantInfo.name} | ترابيزة ${currentTableNumber}`
    : `${restaurantInfo.name} | قائمة الطعام`;

  const restNameEl = document.getElementById("restName");
  if (restNameEl) restNameEl.textContent = restaurantInfo.name;

  const restTaglineEl = document.getElementById("restTagline");
  if (restTaglineEl) restTaglineEl.textContent = restaurantInfo.tagline || "";

  const restLogoEl = document.getElementById("restLogo");
  if (restLogoEl) restLogoEl.src = resolveSafeImg(restaurantInfo.logo || "./logo.svg");

  const restCoverEl = document.getElementById("restCoverImg");
  if (restCoverEl) restCoverEl.src = resolveSafeCover(restaurantInfo.coverImg);

  const hotlinePill = document.getElementById("hotlinePill");
  if (hotlinePill) {
    hotlinePill.textContent = `الخط الساخن: ${restaurantInfo.hotline}`;
    hotlinePill.href = `tel:${restaurantInfo.hotline}`;
  }

  const mapPill = document.getElementById("mapLinkPill");
  if (mapPill) {
    if (restaurantInfo.mapUrl) {
      mapPill.href = restaurantInfo.mapUrl;
      mapPill.style.display = "inline-flex";
    } else {
      mapPill.style.display = "none";
    }
  }

  const statusPill = document.getElementById("storeStatusPill");
  if (statusPill) {
    if (restaurantInfo.isOpen === false) {
      statusPill.textContent = "● مغلق حالياً";
      statusPill.classList.add("closed");
    } else {
      statusPill.textContent = "● مفتوح الآن";
      statusPill.classList.remove("closed");
    }
  }

  const infoTitle = document.getElementById("infoModalTitle");
  if (infoTitle) infoTitle.textContent = `عن ${restaurantInfo.name}`;
  const infoAbout = document.getElementById("infoModalAbout");
  if (infoAbout) infoAbout.textContent = restaurantInfo.about || "";
  const infoHours = document.getElementById("infoModalHours");
  if (infoHours) infoHours.textContent = restaurantInfo.workingHours || "";
  const infoAddress = document.getElementById("infoModalAddress");
  if (infoAddress) infoAddress.textContent = restaurantInfo.address || "";
  const phoneLink = document.getElementById("infoModalPhone");
  if (phoneLink) {
    phoneLink.textContent = restaurantInfo.hotline || "";
    phoneLink.href = `tel:${restaurantInfo.hotline}`;
  }
  const mapBtn = document.getElementById("infoModalMapBtn");
  if (mapBtn) mapBtn.href = restaurantInfo.mapUrl || "#";

  applyCustomDesign(restaurantInfo.design);
  updateCartUI();
}

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (clearSearchBtn) clearSearchBtn.style.display = searchQuery ? "block" : "none";
    renderMenu();
  });
}
if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    renderMenu();
  });
}

function renderCategories() {
  const bar = document.getElementById("categoriesBar");
  if (!bar) return;
  const categories = ["الكل", ...new Set(menuItems.map((i) => i.category))];
  bar.innerHTML = categories
    .map((cat) => `<button type="button" class="cat-chip ${selectedCategory === cat ? "active" : ""}" data-cat="${cat}">${cat}</button>`)
    .join("");

  bar.querySelectorAll(".cat-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.cat;
      renderCategories();
      renderMenu();
    });
  });
}

function renderFeatured() {
  const section = document.getElementById("featuredSection");
  const slider = document.getElementById("featuredSlider");
  if (!section || !slider) return;
  const d = { ...DEFAULT_RESTAURANT_INFO.design, ...(restaurantInfo.design || {}) };
  if (d.showFeatured === false) {
    section.style.display = "none";
    return;
  }
  const featured = menuItems.filter((i) => i.available !== false && i.badge && i.badge.trim() !== "");
  if (featured.length === 0 || searchQuery || selectedCategory !== "الكل") {
    section.style.display = "none";
    return;
  }
  section.style.display = "block";
  slider.innerHTML = featured
    .map(
      (item) => `
      <div class="featured-card-mini" onclick="openItemDetail(${item.id})">
        <img src="${resolveSafeImg(item.img)}" alt="${item.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${FALLBACK_IMG}';" />
        <div class="featured-mini-body">
          <h4>${item.name}</h4>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--brand-primary); font-size:0.95rem;">${item.price} ج.م</strong>
            <button type="button" class="btn-add-to-cart" style="padding:5px 12px; font-size:0.78rem;" onclick="event.stopPropagation(); changeQty(${item.id}, 1)">+ أضف</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function getItemQty(id) {
  const found = cart.find((c) => Number(c.id) === Number(id));
  return found ? found.qty : 0;
}

function renderMenu() {
  renderFeatured();
  const container = document.getElementById("menuContainer");
  if (!container) return;

  const filtered = menuItems.filter((item) => {
    const matchCat = selectedCategory === "الكل" || item.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      (item.desc && item.desc.toLowerCase().includes(searchQuery)) ||
      (item.includes && item.includes.toLowerCase().includes(searchQuery));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="loading-state">لا توجد أصناف مطابقة لبحثك</div>`;
    return;
  }

  const grouped = {};
  filtered.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let html = "";
  for (const [catName, items] of Object.entries(grouped)) {
    html += `
      <section class="category-block">
        <div class="category-heading">
          <span>${catName}</span>
          <span class="category-count-pill">${items.length} صنف</span>
        </div>
        <div class="items-responsive-grid">
    `;

    items.forEach((item) => {
      const qty = getItemQty(item.id);
      const isAvail = item.available !== false;
      const actionHTML = !isAvail
        ? `<span style="color:#ef4444; font-weight:800; font-size:0.8rem;">غير متاح</span>`
        : qty > 0
        ? `<div class="qty-stepper">
             <button type="button" onclick="changeQty(${item.id}, -1)">-</button>
             <span>${qty}</span>
             <button type="button" onclick="changeQty(${item.id}, 1)">+</button>
           </div>`
        : `<button type="button" class="btn-add-to-cart" onclick="changeQty(${item.id}, 1)">+ أضف للسلة</button>`;

      html += `
        <article class="menu-item-card ${!isAvail ? "unavailable" : ""}">
          <div class="card-media-box" onclick="openItemDetail(${item.id})">
            ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ""}
            ${!isAvail ? `<div class="sold-out-overlay">نفدت الكمية</div>` : ""}
            <img src="${resolveSafeImg(item.img)}" alt="${item.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${FALLBACK_IMG}';" />
          </div>
          <div class="card-content-box">
            <h4 class="card-title-text" onclick="openItemDetail(${item.id})">${item.name}</h4>
            <p class="card-desc-text">${item.desc || ""}</p>
            ${item.includes ? `<div class="card-includes-tag">${item.includes}</div>` : ""}
            <div class="card-bottom-bar">
              <span class="price-tag">${item.price} ج.م</span>
              ${actionHTML}
            </div>
          </div>
        </article>
      `;
    });

    html += `</div></section>`;
  }
  container.innerHTML = html;
}

const itemDetailModal = document.getElementById("itemDetailModal");
window.openItemDetail = (id) => {
  const item = menuItems.find((i) => Number(i.id) === Number(id));
  if (!item || !itemDetailModal) return;

  document.getElementById("detailImg").src = resolveSafeImg(item.img);
  document.getElementById("detailName").textContent = item.name;
  document.getElementById("detailPrice").textContent = `${item.price} ج.م`;
  document.getElementById("detailDesc").textContent = item.desc || "";

  const badgeEl = document.getElementById("detailBadge");
  if (item.badge) {
    badgeEl.textContent = item.badge;
    badgeEl.style.display = "inline-block";
  } else {
    badgeEl.style.display = "none";
  }

  const incBox = document.getElementById("detailIncludesBox");
  if (item.includes) {
    incBox.textContent = item.includes;
    incBox.style.display = "block";
  } else {
    incBox.style.display = "none";
  }

  const qty = getItemQty(item.id);
  const actionsBox = document.getElementById("detailActions");
  if (item.available === false) {
    actionsBox.innerHTML = `<button type="button" class="btn-submit-order" disabled style="opacity:0.5;">هذا الصنف غير متاح حالياً</button>`;
  } else if (qty > 0) {
    actionsBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong>الكمية في سلتك:</strong>
        <div class="qty-stepper">
          <button type="button" onclick="changeQty(${item.id}, -1); openItemDetail(${item.id});">-</button>
          <span>${qty}</span>
          <button type="button" onclick="changeQty(${item.id}, 1); openItemDetail(${item.id});">+</button>
        </div>
      </div>
    `;
  } else {
    actionsBox.innerHTML = `<button type="button" class="btn-submit-order" onclick="changeQty(${item.id}, 1); itemDetailModal.classList.remove('active');">+ أضف إلى السلة (${item.price} ج.م)</button>`;
  }

  itemDetailModal.classList.add("active");
};

const closeItemDetailBtn = document.getElementById("closeItemDetailBtn");
if (closeItemDetailBtn) closeItemDetailBtn.addEventListener("click", () => itemDetailModal.classList.remove("active"));

window.changeQty = (id, delta) => {
  if (restaurantInfo.isOpen === false) {
    showToast("نعتذر، المطعم مغلق حالياً");
    return;
  }
  const item = menuItems.find((i) => Number(i.id) === Number(id));
  if (!item || item.available === false) return;

  const idx = cart.findIndex((c) => Number(c.id) === Number(id));
  if (idx > -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    else if (delta > 0) showToast(`تمت إضافة "${item.name}"`);
  } else if (delta > 0) {
    cart.push({ id: item.id, name: item.name, price: Number(item.price), qty: 1 });
    showToast(`تمت إضافة "${item.name}" للسلة`);
  }
  localStorage.setItem("rest_cart", JSON.stringify(cart));
  updateCartUI();
  renderMenu();
};

function calculateTotals() {
  const subTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const vatEnabled = restaurantInfo.vatEnabled !== false;
  const vatRate = vatEnabled ? Number(restaurantInfo.vatRate || 14) : 0;
  const vatAmount = Math.round((subTotal * vatRate) / 100);
  const deliveryFee = isTableMode ? 0 : subTotal > 0 ? Number(restaurantInfo.deliveryFee || 0) : 0;
  const discount = subTotal > 0 ? appliedDiscount : 0;
  const grandTotal = Math.max(0, subTotal + vatAmount + deliveryFee - discount);
  return { subTotal, vatEnabled, vatRate, vatAmount, deliveryFee, discount, grandTotal };
}

function updateCartUI() {
  const totalCount = cart.reduce((s, c) => s + c.qty, 0);
  const { subTotal, vatEnabled, vatAmount, deliveryFee, discount, grandTotal } = calculateTotals();

  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = totalCount;
  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = `${grandTotal} ج.م`;
  const floatEl = document.getElementById("floatingCart");
  if (floatEl) floatEl.classList.toggle("visible", totalCount > 0);

  const subEl = document.getElementById("subTotalText");
  if (subEl) subEl.textContent = `${subTotal} ج.م`;
  const vatRow = document.getElementById("vatRow");
  if (vatRow) vatRow.style.display = vatEnabled ? "flex" : "none";
  const vatText = document.getElementById("vatText");
  if (vatText) vatText.textContent = `${vatAmount} ج.م`;
  const delRow = document.getElementById("deliveryFeeRow");
  if (delRow) delRow.style.display = isTableMode ? "none" : "flex";
  const delText = document.getElementById("deliveryFeeText");
  if (delText) delText.textContent = deliveryFee === 0 ? "مجاني" : `${deliveryFee} ج.م`;
  const discRow = document.getElementById("discountRow");
  if (discRow) discRow.style.display = discount > 0 ? "flex" : "none";
  const discText = document.getElementById("discountText");
  if (discText) discText.textContent = `-${discount} ج.م`;
  const finalEl = document.getElementById("finalTotal");
  if (finalEl) finalEl.textContent = `${grandTotal} ج.م`;
}

const applyPromoBtn = document.getElementById("applyPromoBtn");
if (applyPromoBtn) {
  applyPromoBtn.addEventListener("click", () => {
    const code = document.getElementById("promoInput").value.trim().toUpperCase();
    const validCode = (restaurantInfo.promoCode || "").trim().toUpperCase();
    const msgEl = document.getElementById("promoMsg");
    if (validCode && code === validCode) {
      appliedDiscount = Number(restaurantInfo.promoDiscount || 0);
      msgEl.style.display = "block";
      msgEl.style.color = "#22c55e";
      msgEl.textContent = `تم تفعيل الخصم بقيمة ${appliedDiscount} ج.م`;
    } else {
      appliedDiscount = 0;
      msgEl.style.display = "block";
      msgEl.style.color = "#ef4444";
      msgEl.textContent = "كود الخصم غير صحيح";
    }
    updateCartUI();
  });
}

const checkoutModal = document.getElementById("checkoutModal");
const openCartBtn = document.getElementById("openCartBtn");
if (openCartBtn) {
  openCartBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    const banner = document.getElementById("orderModeBanner");
    const addressFields = document.getElementById("deliveryAddressFields");
    if (isTableMode) {
      banner.textContent = activeTableOrder
        ? `إضافة أصناف لحساب ترابيزة رقم ${currentTableNumber} المفتوح`
        : `طلب داخل الصالة — ترابيزة رقم ${currentTableNumber}`;
      addressFields.style.display = "none";
      if (activeTableOrder) {
        if (!document.getElementById("custName").value) document.getElementById("custName").value = activeTableOrder.customerName || "";
        if (!document.getElementById("custPhone").value) document.getElementById("custPhone").value = activeTableOrder.customerPhone || "";
      }
    } else {
      banner.textContent = "توصيل دليفري لباب المنزل";
      addressFields.style.display = "block";
    }

    document.getElementById("selectedItemsList").innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item-row">
          <div>
            <strong style="display:block; font-size:0.88rem;">${item.name}</strong>
            <small style="color:var(--brand-primary); font-weight:800;">${item.price * item.qty} ج.م</small>
          </div>
          <div class="qty-stepper">
            <button type="button" onclick="changeQty(${item.id}, -1); document.getElementById('openCartBtn').click();">-</button>
            <span>${item.qty}</span>
            <button type="button" onclick="changeQty(${item.id}, 1); document.getElementById('openCartBtn').click();">+</button>
          </div>
        </div>
      `
      )
      .join("");

    updateCartUI();
    checkoutModal.classList.add("active");
  });
}

const closeCartBtn = document.getElementById("closeCartBtn");
if (closeCartBtn) closeCartBtn.addEventListener("click", () => checkoutModal.classList.remove("active"));

const sendOrderBtn = document.getElementById("sendOrderBtn");
if (sendOrderBtn) {
  sendOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.replace(/[^0-9]/g, "");
    const address = document.getElementById("custAddress").value.trim();
    const landmark = document.getElementById("custLandmark") ? document.getElementById("custLandmark").value.trim() : "";
    const notes = document.getElementById("custNotes").value.trim();

    if (!name) {
      alert("من فضلك أدخل الاسم");
      return;
    }
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      alert("من فضلك أدخل رقم موبايل مصري صحيح مكون من 11 رقم (يبدأ بـ 010 أو 011 أو 012 أو 015)");
      return;
    }
    if (!isTableMode && !address) {
      alert("من فضلك أدخل عنوان التوصيل");
      return;
    }

    sendOrderBtn.disabled = true;
    sendOrderBtn.textContent = "جاري إرسال الطلب...";

    const { subTotal, vatRate, vatAmount, deliveryFee, discount, grandTotal } = calculateTotals();
    const prepMinutes = Number(restaurantInfo.prepTimeMinutes || 20);
    const now = Date.now();
    const newCartItems = cart.map((c) => ({ ...c, total: c.price * c.qty }));

    if (isTableMode && activeTableOrder && activeTableOrder.status !== "completed") {
      const mergedItems = [...(activeTableOrder.items || [])];
      newCartItems.forEach((newIt) => {
        const foundIdx = mergedItems.findIndex((m) => Number(m.id) === Number(newIt.id) && m.name === newIt.name);
        if (foundIdx > -1) {
          mergedItems[foundIdx].qty += newIt.qty;
          mergedItems[foundIdx].total = mergedItems[foundIdx].qty * mergedItems[foundIdx].price;
        } else {
          mergedItems.push(newIt);
        }
      });

      const updatedSub = mergedItems.reduce((s, i) => s + Number(i.total), 0);
      const updatedVat = Math.round((updatedSub * vatRate) / 100);
      const updatedDisc = Number(activeTableOrder.discount || 0) + discount;
      const updatedGrand = Math.max(0, updatedSub + updatedVat - updatedDisc);
      const updatedNotes = notes
        ? activeTableOrder.notes
          ? `${activeTableOrder.notes} | ${notes}`
          : notes
        : activeTableOrder.notes || "";

      db.ref(`orders/${activeTableOrder.orderId}`)
        .update({
          items: mergedItems,
          subTotal: updatedSub,
          vatRate,
          vatAmount: updatedVat,
          discount: updatedDisc,
          grandTotal: updatedGrand,
          notes: updatedNotes,
          status: "pending",
          estimatedReadyAt: now + prepMinutes * 60 * 1000
        })
        .then(() => {
          cart = [];
          appliedDiscount = 0;
          localStorage.removeItem("rest_cart");
          updateCartUI();
          renderMenu();
          checkoutModal.classList.remove("active");
          sendOrderBtn.disabled = false;
          sendOrderBtn.textContent = "إرسال الطلب للمطبخ الآن";
          document.getElementById("orderTrackerModal").classList.add("active");
          showToast("تمت إضافة طلبك الجديد على نفس فاتورة الترابيزة");
        })
        .catch(() => {
          alert("حدث خطأ أثناء الإرسال");
          sendOrderBtn.disabled = false;
          sendOrderBtn.textContent = "إرسال الطلب للمطبخ الآن";
        });
      return;
    }

    const orderId = `ord_${now}`;
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const fullAddress = landmark ? `${address} (علامة مميزة: ${landmark})` : address;

    const orderData = {
      orderId,
      orderNumber,
      customerName: name,
      customerPhone: phone,
      orderType: isTableMode ? "dinein" : "delivery",
      tableNumber: isTableMode ? currentTableNumber : null,
      address: isTableMode ? `صالة - ترابيزة ${currentTableNumber}` : fullAddress,
      landmark: landmark || "",
      notes,
      items: newCartItems,
      subTotal,
      vatRate,
      vatAmount,
      deliveryFee,
      discount,
      grandTotal,
      status: "pending",
      createdAt: now,
      estimatedReadyAt: now + prepMinutes * 60 * 1000
    };

    db.ref(`orders/${orderId}`)
      .set(orderData)
      .then(() => {
        cart = [];
        appliedDiscount = 0;
        localStorage.removeItem("rest_cart");
        updateCartUI();
        renderMenu();
        checkoutModal.classList.remove("active");
        sendOrderBtn.disabled = false;
        sendOrderBtn.textContent = "إرسال الطلب للمطبخ الآن";

        if (isTableMode) {
          document.getElementById("orderTrackerModal").classList.add("active");
        } else {
          showToast(`تم إرسال طلبك بنجاح! رقم الطلب #${orderNumber}`);
        }
      })
      .catch(() => {
        alert("حدث خطأ أثناء الإرسال، تأكد من الاتصال بالإنترنت");
        sendOrderBtn.disabled = false;
        sendOrderBtn.textContent = "إرسال الطلب للمطبخ الآن";
      });
  });
}

// متابعة الفاتورة المفتوحة للترابيزة
const trackerModal = document.getElementById("orderTrackerModal");
const trackMyOrderBtn = document.getElementById("trackMyOrderBtn");

if (trackMyOrderBtn) {
  trackMyOrderBtn.style.display = "none";
  trackMyOrderBtn.addEventListener("click", () => {
    if (isTableMode && activeTableOrder && trackerModal) {
      trackerModal.classList.add("active");
    }
  });
}

const closeTrackerBtn = document.getElementById("closeTrackerBtn");
if (closeTrackerBtn) closeTrackerBtn.addEventListener("click", () => trackerModal.classList.remove("active"));

const customerPrintPdfBtn = document.getElementById("customerPrintPdfBtn");
if (customerPrintPdfBtn) {
  customerPrintPdfBtn.addEventListener("click", () => {
    if (currentTrackedOrder) printThermalReceipt(currentTrackedOrder, restaurantInfo);
  });
}

function startCountdown(targetTs) {
  clearInterval(countdownInterval);
  const digitsEl = document.getElementById("countdownDigits");
  if (!digitsEl) return;
  function tick() {
    const diff = targetTs - Date.now();
    if (diff <= 0) {
      digitsEl.textContent = "00:00";
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

function updateTrackerModalUI(ord) {
  currentTrackedOrder = ord;
  document.getElementById("trackerOrderNum").textContent = `فاتورة ترابيزة ${ord.tableNumber} (#${ord.orderNumber})`;
  document.getElementById("dineinLiveSection").style.display = "block";
  document.getElementById("deliveryStepsSection").style.display = "none";

  const tabBadge = document.getElementById("openTabStatusBadge");
  tabBadge.textContent = `حساب ترابيزة ${ord.tableNumber} مفتوح الآن`;
  document.getElementById("trackerStatusTitle").textContent =
    ord.status === "preparing" ? "طلبك قيد التحضير في المطبخ" : "تم استلام طلبك بنجاح";
  document.getElementById("trackerStatusDesc").textContent =
    "الفاتورة تظل مفتوحة على هذه الترابيزة ويمكنك طلب أي أصناف إضافية في أي وقت.";

  if (ord.estimatedReadyAt) startCountdown(ord.estimatedReadyAt);

  document.getElementById("trackerOrderDetails").innerHTML = `
    ${(ord.items || [])
      .map(
        (i) =>
          `<div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>${i.name} × ${i.qty}</span><strong>${i.total} ج.م</strong></div>`
      )
      .join("")}
    <div style="border-top:1px dashed var(--border-color); margin-top:8px; padding-top:6px;">
      <div style="display:flex; justify-content:space-between;"><span>الصافي:</span><span>${ord.subTotal} ج.م</span></div>
      ${ord.vatAmount > 0 ? `<div style="display:flex; justify-content:space-between;"><span>الضريبة (${ord.vatRate || 14}%):</span><span>${ord.vatAmount} ج.م</span></div>` : ""}
      ${ord.discount > 0 ? `<div style="display:flex; justify-content:space-between; color:#22c55e;"><span>الخصم:</span><span>-${ord.discount} ج.م</span></div>` : ""}
      <div style="display:flex; justify-content:space-between; font-weight:900; color:var(--brand-primary); font-size:1.05rem; margin-top:4px;">
        <span>الإجمالي الحالي:</span><span>${ord.grandTotal} ج.م</span>
      </div>
    </div>
  `;
}

if (isTableMode) {
  db.ref("orders").on("value", (snap) => {
    const all = snap.val() ? Object.values(snap.val()) : [];
    const openForThisTable = all
      .filter((o) => o.orderType === "dinein" && Number(o.tableNumber) === currentTableNumber && o.status !== "completed")
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    if (openForThisTable.length > 0) {
      activeTableOrder = openForThisTable[0];
      if (trackMyOrderBtn) trackMyOrderBtn.style.display = "inline-flex";
      updateTrackerModalUI(activeTableOrder);
    } else {
      if (activeTableOrder && trackerModal && trackerModal.classList.contains("active")) {
        trackerModal.classList.remove("active");
        showToast("تم سداد وتحصيل حساب الترابيزة — شكراً لزيارتكم");
      }
      activeTableOrder = null;
      currentTrackedOrder = null;
      if (trackMyOrderBtn) trackMyOrderBtn.style.display = "none";
    }
  });
}

const infoModal = document.getElementById("infoModal");
const openInfoBtn = document.getElementById("openInfoBtn");
const closeInfoBtn = document.getElementById("closeInfoBtn");
if (openInfoBtn) openInfoBtn.addEventListener("click", () => infoModal.classList.add("active"));
if (closeInfoBtn) closeInfoBtn.addEventListener("click", () => infoModal.classList.remove("active"));

// العرض الفوري من الكاش المحلي قبل انتظار الشبكة
renderRestaurantInfo();
renderCategories();
renderMenu();

// تحديث البيانات في الخلفية وحفظها في الكاش
db.ref("restaurantInfo").on("value", (snap) => {
  if (snap.exists()) {
    restaurantInfo = { ...DEFAULT_RESTAURANT_INFO, ...snap.val() };
    try { localStorage.setItem("cached_rest_info", JSON.stringify(restaurantInfo)); } catch (e) {}
    renderRestaurantInfo();
  }
});

db.ref("menuItems").on("value", (snap) => {
  const data = snap.val();
  if (data) {
    menuItems = (Array.isArray(data) ? data : Object.values(data)).filter(Boolean);
    try { localStorage.setItem("cached_menu_items", JSON.stringify(menuItems)); } catch (e) {}
    renderCategories();
    renderMenu();
  }
});