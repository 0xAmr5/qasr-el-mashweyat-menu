const RESTAURANT_WHATSAPP = "201009694831";

const menuData = [
  // --- مشويات ---
  { id: 1, category: "مشويات", name: "مشكل كباب وكفتة", price: 420, desc: "كباب وكفتة متبلة على الفحم تقدم مع سلطة وعيش.", img: "./mixed-grill.jpg" },
  { id: 2, category: "مشويات", name: "ريش ضاني مشوية", price: 490, desc: "ريش ضاني متبلة ومشوية على الجمر مع الخضار.", img: "./lamb-chops.jpg" },
  { id: 3, category: "مشويات", name: "ريش بتلو مشوية", price: 460, desc: "ريش بتلو مشوية على الفحم بتتبيلة روزماري وبهارات شرقية.", img: "./veal-chops.jpg" },
  { id: 4, category: "مشويات", name: "طرب بلدي مخصوص", price: 360, desc: "كفتة بلدي ملفوفة بمنديل الضاني على الفحم.", img: "./tarb-grill.jpg" },
  { id: 5, category: "مشويات", name: "كفتة حاتي بلدي", price: 290, desc: "أصابع كفتة حاتي مشوية على الفحم مع طحينة.", img: "./mixed-grill.jpg" },
  { id: 6, category: "مشويات", name: "شيش طاووق", price: 160, desc: "صدور وأوراك متبلة بالزبادي والأعشاب.", img: "./shish-tawook.jpg" },
  { id: 7, category: "مشويات", name: "فرخة مشوية كاملة", price: 240, desc: "فرخة كاملة بتتبيلة خاصة مشوية ع الفحم.", img: "./grilled-chicken.jpg" },
  { id: 8, category: "مشويات", name: "نصف دجاجة شواية بالأرز", price: 155, desc: "نصف دجاجة محمرة تقدم مع أرز بسمتي مبهر.", img: "./rotisserie-chicken-rice.jpg" },
  { id: 9, category: "مشويات", name: "سجق بلدي مشوي", price: 190, desc: "سجق بلدي مشوي على الجمر مع دبس الرمان والطحينة.", img: "./grilled-oriental-sausage.jpg" },

  // --- طواجن ومحاشي ---
  { id: 10, category: "طواجن ومحاشي", name: "طاجن عكاوي بالبصل", price: 320, desc: "عكاوي بلدي مع بصل مكرمل في الفرن.", img: "./oxtail-tajine.jpg" },
  { id: 11, category: "طواجن ومحاشي", name: "طاجن ملوخية بالطشة", price: 90, desc: "ملوخية خضراء بطشة الثوم والكزبرة والسمن.", img: "./molokhia-pot.jpg" },
  { id: 12, category: "طواجن ومحاشي", name: "طاجن ورق عنب بالكوارع", price: 250, desc: "ورق عنب محشو مع قطع كوارع مخلية بالفرن.", img: "./grape-leaves-tajine.jpg" },
  { id: 13, category: "طواجن ومحاشي", name: "طاجن بامية باللحمة الضاني", price: 230, desc: "بامية مسبكة بقطع اللحم الضاني.", img: "./okra-lamb-tajine.jpg" },
  { id: 14, category: "طواجن ومحاشي", name: "طاجن لسان عصفور باللحمة", price: 195, desc: "لسان عصفور محمر مطهو مع قطع لحم مكعبات.", img: "./orzo-meat-tajine.jpg" },
  { id: 15, category: "طواجن ومحاشي", name: "طاجن مكرونة فرن باللحمة", price: 110, desc: "مكرونة قلم بصلصة الطماطم ولحم مفروم معصج محمر.", img: "./pasta-tajine-minced-meat.jpg" },
  { id: 16, category: "طواجن ومحاشي", name: "صينية بطاطس بالفراخ", price: 185, desc: "شرائح بطاطس مع قطع دجاج بصلصة الطماطم بالفرن.", img: "./potato-chicken-tray.jpg" },
  { id: 17, category: "طواجن ومحاشي", name: "كفتة داوود باشا", price: 175, desc: "كرات لحم مفروم بالصلصة المسبكة تقدم مع أرز.", img: "./dawood-basha.jpg" },
  { id: 18, category: "طواجن ومحاشي", name: "مشكل محاشي بلدي", price: 135, desc: "كوسة، باذنجان، وفلفل بخلطة الأرز المصرية.", img: "./mixed-mahshi.jpg" },
  { id: 19, category: "طواجن ومحاشي", name: "كشري مصري مخصوص", price: 60, desc: "مكرونة، أرز، عدس، بصل مقرمش، دقة وصلصة حارة.", img: "./egyptian-koshary.jpg" },

  // --- شاورما وساندوتشات ---
  { id: 20, category: "شاورما وساندوتشات", name: "عربي شاورما فراخ", price: 140, desc: "رول شاورما مقطع مع بطاطس وتومية ومخلل.", img: "./chicken-shawarma-arabi.jpg" },
  { id: 21, category: "شاورما وساندوتشات", name: "عربي شاورما لحمة بلدي", price: 165, desc: "رول شاورما لحم بلدي مع طحينة وبطاطس.", img: "./beef-shawarma-wrap.jpg" },
  { id: 22, category: "شاورما وساندوتشات", name: "شاورما لحمة رول صاج", price: 155, desc: "شاورما لحم بلدي مع بقدونس وبصل وطحينة.", img: "./beef-shawarma-wrap.jpg" },
  { id: 23, category: "شاورما وساندوتشات", name: "فتة شاورما فراخ", price: 165, desc: "أرز بسمتي مع شاورما دجاج وعيش مقرمش وتومية.", img: "./chicken-shawarma-fattah.jpg" },
  { id: 24, category: "شاورما وساندوتشات", name: "فتة شاورما لحمة", price: 185, desc: "أرز بسمتي مع شاورما لحم وعيش محمص وطحينة.", img: "./beef-shawarma-fattah.jpg" },
  { id: 25, category: "شاورما وساندوتشات", name: "حواوشي بلدي ع الفحم", price: 85, desc: "لحم مفروم متبل بالبصل في خبز بلدي مقرمش.", img: "./hawawshi-baladi.jpg" },
  { id: 26, category: "شاورما وساندوتشات", name: "ساندوتش كبدة إسكندراني", price: 65, desc: "كبدة بلدي بالثوم والليمون والفلفل الحار بطحينة.", img: "./alexandrian-liver-sandwich.jpg" },
  { id: 27, category: "شاورما وساندوتشات", name: "ساندوتش سجق إسكندراني", price: 70, desc: "سجق شرقي بصلصة الطماطم والفلفل الألوان.", img: "./oriental-sausage-sandwich.jpg" },

  // --- فطير ومخبوزات ---
  { id: 28, category: "فطير ومخبوزات", name: "فطير مشلتت بالسمن الفلاحي", price: 145, desc: "فطيرة مشلتتة مورقة تقدم مع عسل وجبنة قديمة.", img: "./feteer-meshaltet.jpg" },
  { id: 29, category: "فطير ومخبوزات", name: "فطيرة سجق وميكس جبن", price: 190, desc: "فطيرة شرقي محشوة سجق وجبن وزيتون وطماطم.", img: "./feteer-sausage-cheese.jpg" },
  { id: 30, category: "فطير ومخبوزات", name: "فطيرة كاسترد وسكر وحليب", price: 110, desc: "فطيرة حلوة مورقة بالكاسترد والسكر البودرة.", img: "./sweet-feteer-custard.jpg" },
  { id: 31, category: "فطير ومخبوزات", name: "سلة عيش بلدي ساخن (5 أرغفة)", price: 15, desc: "عيش بلدي طازج مخبوز بالردة في الفرن الحجري.", img: "./fresh-baladi-bread.jpg" },

  // --- مقبلات وسلطات ---
  { id: 32, category: "مقبلات وسلطات", name: "شوربة لسان عصفور بلدي", price: 45, desc: "شوربة لسان عصفور في مرقة لحم غنية مع ليمون.", img: "./orzo-soup.jpg" },
  { id: 33, category: "مقبلات وسلطات", name: "شوربة كوارع مخلية بالليمون", price: 115, desc: "شوربة كوارع دسمة مع قطع مخلية ومتبلة.", img: "./trotters-soup.jpg" },
  { id: 34, category: "مقبلات وسلطات", name: "كبيبة شامي مقلية (4 قطع)", price: 85, desc: "برغل محشو باللحمة المفرومة والمكسرات.", img: "./kibbeh-fried.jpg" },
  { id: 35, category: "مقبلات وسلطات", name: "سمبوسك ميكس جبن ولحم (6 قطع)", price: 70, desc: "رقائق مقرمشة محشوة جبنة ولحم معصج.", img: "./sambousek-mix.jpg" },
  { id: 36, category: "مقبلات وسلطات", name: "بطاطس محمرة مع صوص شيدر", price: 55, desc: "أصابع بطاطس مقلية مغطاة بصوص جبنة كريمي.", img: "./french-fries-cheddar.jpg" },
  { id: 37, category: "مقبلات وسلطات", name: "حمص بيروتي بزيت الزيتون", price: 50, desc: "حمص ناعم بالطحينة والليمون وزيت الزيتون البكر.", img: "./hummus-olive-oil.jpg" },
  { id: 38, category: "مقبلات وسلطات", name: "بابا غنوج مشوي ع الفحم", price: 45, desc: "باذنجان مشوي ع الفحم بالطحينة والثوم ودبس الرمان.", img: "./baba-ghanoush.jpg" },
  { id: 39, category: "مقبلات وسلطات", name: "سلطة بلدي ومخللات مشكلة", price: 40, desc: "طماطم متبلة، مخلل لفت وخيار، وسلطة خضراء.", img: "./oriental-pickles-salad.jpg" },

  // --- حلويات ---
  { id: 40, category: "حلويات", name: "أم علي بالقشطة والمكسرات", price: 75, desc: "رقائق ملفيه بالحليب الساخن والمكسرات والقشطة البلدي.", img: "./om-ali-dessert.jpg" },
  { id: 41, category: "حلويات", name: "طاجن أم علي بالنوتيلا والبندق", price: 90, desc: "أم علي غنية بشوكولاتة نوتيلا وبندق محمص.", img: "./nutella-om-ali.jpg" },
  { id: 42, category: "حلويات", name: "كنافة بالمانجو والكريمة", price: 85, desc: "كنافة مقرمشة بطبقات كريمة الخفق وقطع المانجو.", img: "./kunafa-mango.jpg" },
  { id: 43, category: "حلويات", name: "أرز بلبن بالفرن", price: 50, desc: "طاجن أرز بالحليب والقشطة محمر الوجه.", img: "./baked-rice-pudding.jpg" },
  { id: 44, category: "حلويات", name: "مشكل حلويات شرقية فاخر", price: 95, desc: "تشكيلة من البسبوسة، البقلاوة، والكنافة الملفوفة.", img: "./oriental-sweets-mix.jpg" },

  // --- مشروبات وعصائر ---
  { id: 45, category: "مشروبات وعصائر", name: "عصير مانجو فريش طبيعي", price: 50, desc: "مانجو طبيعي 100% مثلج وقوام كثيف.", img: "./fresh-mango-juice.jpg" },
  { id: 46, category: "مشروبات وعصائر", name: "عصير ليمون بالنعناع فريش", price: 40, desc: "ليمون مثلج مخفوق بأوراق النعناع الأخضر والثلج.", img: "./lemon-mint-juice.jpg" },
  { id: 47, category: "مشروبات وعصائر", name: "كركديه أسواني مثلج", price: 30, desc: "كركديه أسواني مروي وبارد ومنعش.", img: "./hibiscus-iced-tea.jpg" },
  { id: 48, category: "مشروبات وعصائر", name: "عصير قصب سكر مثلج", price: 25, desc: "عصير قصب طبيعي طازج يقدم بارداً فور العصر.", img: "./sugarcane-juice.jpg" }
];

const categories = ["الكل", "مشويات", "طواجن ومحاشي", "شاورما وساندوتشات", "فطير ومخبوزات", "مقبلات وسلطات", "حلويات", "مشروبات وعصائر"];
let activeCategory = "الكل";
let cart = {};

// DOM Elements
const categoriesBar = document.getElementById("categoriesBar");
const menuContainer = document.getElementById("menuContainer");
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
const finalTotal = document.getElementById("finalTotal");
const sendOrderBtn = document.getElementById("sendOrderBtn");

const toastNotification = document.getElementById("toastNotification");
const toastText = document.getElementById("toastText");
let toastTimeout;

// 1. Toast Notification Trigger
function showToast(msg) {
  if (!toastNotification) return;
  toastText.textContent = msg;
  toastNotification.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 1800);
}

// 2. Theme Management (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem("menu_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("menu_theme", nextTheme);
  themeIcon.textContent = nextTheme === "dark" ? "☀️" : "🌙";
});

// 3. Render Categories with Auto-center Scroll
function renderCategories() {
  categoriesBar.innerHTML = categories.map(cat => `
    <button class="cat-tab ${cat === activeCategory ? 'active' : ''}" onclick="selectCategory('${cat}', this)">
      ${cat}
    </button>
  `).join("");
}

function selectCategory(cat, el) {
  activeCategory = cat;
  renderCategories();
  renderMenu();

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

// 4. Cart Operations
function addToCart(id, name) {
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
  
  // Bump Animation on Badge
  cartBadge.classList.add("bump");
  setTimeout(() => cartBadge.classList.remove("bump"), 200);

  if (name) showToast(`تمت إضافة ${name}`);
}

function decreaseCart(id) {
  if (cart[id]) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    updateCart();
  }
}

function updateCart() {
  let count = 0;
  let total = 0;

  Object.keys(cart).forEach(id => {
    const item = menuData.find(d => d.id === parseInt(id));
    if (item) {
      count += cart[id];
      total += cart[id] * item.price;
    }
  });

  cartBadge.textContent = count;
  cartTotal.textContent = `${total} ج.م`;
  finalTotal.textContent = `${total} ج.م`;

  if (count > 0) {
    floatingCart.classList.add("active");
  } else {
    floatingCart.classList.remove("active");
    checkoutModal.classList.remove("active");
  }

  renderMenu();
  renderCartSheet();
}

function renderCartSheet() {
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    selectedItemsList.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:0.85rem; padding: 12px 0;">لا توجد وجبات مضافة</p>`;
    return;
  }

  selectedItemsList.innerHTML = ids.map(id => {
    const item = menuData.find(d => d.id === parseInt(id));
    const qty = cart[id];
    return `
      <div class="cart-item-row">
        <div>
          <div>${item.name}</div>
          <small style="color:var(--text-muted);">${item.price * qty} ج.م (${item.price} × ${qty})</small>
        </div>
        <div class="qty-counter">
          <button class="qty-btn" onclick="decreaseCart(${item.id})">-</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>
    `;
  }).join("");
}

// 5. Render Menu Items Grouped by Category
function renderMenu() {
  const q = searchInput.value.trim().toLowerCase();

  const filtered = menuData.filter(item => {
    const matchCat = activeCategory === "الكل" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    menuContainer.innerHTML = `
      <div style="text-align:center; padding: 40px 0; color:var(--text-muted); font-size:0.9rem;">
        لا توجد وجبات مطابقة للبحث.
      </div>
    `;
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
          return `
            <div class="item-card">
              <div class="item-thumb">
                <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='./mixed-grill.jpg';" />
              </div>
              <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="item-footer">
                  <span class="item-price">${item.price} ج.م</span>
                  ${qty > 0 ? `
                    <div class="qty-counter">
                      <button class="qty-btn" onclick="decreaseCart(${item.id})">-</button>
                      <span class="qty-num">${qty}</span>
                      <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
                    </div>
                  ` : `
                    <button class="add-btn" onclick="addToCart(${item.id}, '${item.name}')">إضافة +</button>
                  `}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
}

// 6. Search and Events
searchInput.addEventListener("input", () => {
  clearSearchBtn.style.display = searchInput.value.trim().length > 0 ? "block" : "none";
  renderMenu();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  renderMenu();
});

openCartBtn.addEventListener("click", () => checkoutModal.classList.add("active"));
closeCartBtn.addEventListener("click", () => checkoutModal.classList.remove("active"));
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) checkoutModal.classList.remove("active");
});

sendOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("custNotes").value.trim();

  if (!name || !phone || !address) {
    alert("يرجى إدخال الاسم ورقم الموبايل والعنوان بالتفصيل");
    return;
  }

  let text = `*طلب جديد من منيو قصر المشويات*\n\n`;
  text += `👤 *الاسم:* ${name}\n`;
  text += `📞 *الموبايل:* ${phone}\n`;
  text += `📍 *العنوان:* ${address}\n`;
  if (notes) text += `📝 *ملاحظات:* ${notes}\n`;
  text += `\n*الطلب:*\n`;

  let total = 0;
  Object.keys(cart).forEach(id => {
    const item = menuData.find(d => d.id === parseInt(id));
    const qty = cart[id];
    text += `- ${item.name} (${qty}) = ${item.price * qty} ج.م\n`;
    total += item.price * qty;
  });

  text += `\n💰 *الإجمالي النهائي:* ${total} ج.م`;

  window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
});

// Initialization
initTheme();
renderCategories();
renderMenu();