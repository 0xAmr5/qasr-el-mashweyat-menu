const menuData = [
  {
    id: 1,
    category: "مشويات على الفحم",
    name: "مشكل كباب وكفتة بلدي",
    price: "420 ج.م",
    description: "كباب ضاني متبل وكفتة مشوية على الفحم تقدم مع سلطات وطحينة وعيش طازج.",
    image: "./mixed-grill.jpg",
    tag: "الأكثر طلباً 🔥"
  },
  {
    id: 2,
    category: "مشويات على الفحم",
    name: "ريش ضاني مشوية",
    price: "490 ج.م",
    description: "ريش ضاني متبلة بتتبيلة القصر الخاصة ومشوية على الجمر مع الخضار المشوي.",
    image: "./lamb-chops.jpg",
    tag: "مميز 🥩"
  },
  {
    id: 3,
    category: "مشويات على الفحم",
    name: "ريش بتلو فاخرة",
    price: "460 ج.م",
    description: "ريش بتلو مشوية على الفحم بتتبيلة روزماري وبهارات شرقية.",
    image: "./veal-chops.jpg"
  },
  {
    id: 4,
    category: "مشويات على الفحم",
    name: "طرب بلدي مخصوص",
    price: "360 ج.م",
    description: "طرب كفتة ضاني ملفوف بمنديل الضاني ومتبل على الفحم يقدم مع طحينة بيضاء.",
    image: "./tarb-grill.jpg"
  },
  {
    id: 5,
    category: "مشويات على الفحم",
    name: "شيش طاووق متبل",
    price: "160 ج.م",
    description: "أوراك فراخ متبلة بالزبادي والخلطة اللبنانية مع فلفل وبصل مشوي.",
    image: "./shish-tawook.jpg"
  },
  {
    id: 6,
    category: "مشويات على الفحم",
    name: "فرخة مشوية على الفحم",
    price: "240 ج.م",
    description: "فرخة كاملة متبلة على الطريقة الشرقية مشوية على الفحم مع خلطة بهارات خاصة.",
    image: "./grilled-chicken.jpg"
  },
  {
    id: 7,
    category: "مشويات على الفحم",
    name: "سجق بلدي مشوي",
    price: "190 ج.م",
    description: "سجق بلدي مشوي على الجمر يقدم مع دبس الرمان والطحينة.",
    image: "./grilled-oriental-sausage.jpg"
  },
  {
    id: 8,
    category: "مشويات على الفحم",
    name: "نصف فرخة شواية مع أرز بسمتي",
    price: "155 ج.م",
    description: "نصف دجاجة محمرة تقدم مع أرز بسمتي مبهر بالمكسرات وصوص دقوس.",
    image: "./rotisserie-chicken-rice.jpg"
  },
  {
    id: 9,
    category: "شاورما وصاج",
    name: "عربي شاورما فراخ سوبر",
    price: "140 ج.م",
    description: "ساندوتش شاورما فراخ مقطع رول يقدم مع بطاطس مقلية وتومية وخيار مخلل.",
    image: "./chicken-shawarma-arabi.jpg",
    tag: "وجبة شائعة 🌯"
  },
  {
    id: 10,
    category: "شاورما وصاج",
    name: "شاورما لحمة رول صاج",
    price: "155 ج.م",
    description: "شاورما لحمة بلدي مع بقدونس وبصل وطماطم وصوص طحينة في خبز صاج مقرمش.",
    image: "./beef-shawarma-wrap.jpg"
  },
  {
    id: 11,
    category: "شاورما وصاج",
    name: "فتة شاورما فراخ بالتومية",
    price: "165 ج.م",
    description: "أرز بسمتي أصفر مع شاورما فراخ وعيش لبناني مقرمش وصوص تومية كريمي.",
    image: "./chicken-shawarma-fattah.jpg"
  },
  {
    id: 12,
    category: "شاورما وصاج",
    name: "فتة شاورما لحمة بلدي",
    price: "185 ج.م",
    description: "أرز بسمتي مع شاورما لحمة وعيش محمص وصوص طحينة متبل.",
    image: "./beef-shawarma-fattah.jpg"
  },
  {
    id: 13,
    category: "طواجن وصواني بلدي",
    name: "طاجن عكاوي بالبصل الأورما",
    price: "320 ج.م",
    description: "عكاوي بلدي مطهوة ببطء في طاجن فخار مع صوص البصل المكرمل وجوزة الطيب.",
    image: "./oxtail-tajine.jpg",
    tag: "طبق اليوم 👑"
  },
  {
    id: 14,
    category: "طواجن وصواني بلدي",
    name: "طاجن ملوخية خضراء بالطشة",
    price: "90 ج.م",
    description: "ملوخية طازجة مخروطة يومياً بطشة الثوم والكزبرة والسمن البلدي.",
    image: "./molokhia-pot.jpg"
  },
  {
    id: 15,
    category: "طواجن وصواني بلدي",
    name: "طاجن بامية باللحمة الضاني",
    price: "230 ج.م",
    description: "بامية بلدي صلصة حمراء مسبكة مع قطع لحم ضاني وفلفل حار بالفرن.",
    image: "./okra-lamb-tajine.jpg"
  },
  {
    id: 16,
    category: "طواجن وصواني بلدي",
    name: "طاجن ورق عنب بالكوارع",
    price: "250 ج.م",
    description: "أصابع ورق عنب دايبة مع قطع كوارع مخلية محمرة في الطاجن الفخاري.",
    image: "./grape-leaves-tajine.jpg"
  },
  {
    id: 17,
    category: "طواجن وصواني بلدي",
    name: "طاجن مكرونة فرن باللحمة المفرومة",
    price: "110 ج.م",
    description: "مكرونة قلم بصلصة الطماطم الغنية بالبهارات ولحم مفروم معصج محمر بالفرن.",
    image: "./pasta-tajine-minced-meat.jpg"
  },
  {
    id: 18,
    category: "طواجن وصواني بلدي",
    name: "طاجن لسان عصفور باللحمة",
    price: "195 ج.م",
    description: "لسان عصفور محمر مطهو في مرقة غنية مع قطع لحم بقري مكعبات.",
    image: "./orzo-meat-tajine.jpg"
  },
  {
    id: 19,
    category: "طواجن وصواني بلدي",
    name: "كفتة داوود باشا بالصلصة",
    price: "175 ج.م",
    description: "كرات لحم مفروم بالبقدونس في صلصة طماطم مسبكة بالفرن تقدم مع أرز.",
    image: "./dawood-basha.jpg"
  },
  {
    id: 20,
    category: "طواجن وصواني بلدي",
    name: "صينية بطاطس بالفراخ في الفرن",
    price: "185 ج.م",
    description: "شرائح بطاطس مع قطع دجاج متبلة بصلصة الطماطم والبصل في صينية فرن بلدي.",
    image: "./potato-chicken-tray.jpg"
  },
  {
    id: 21,
    category: "طواجن وصواني بلدي",
    name: "مشكل محاشي مشكل",
    price: "135 ج.م",
    description: "تشكيلة من محشي الكوسة، الباذنجان، والفلفل بخلطة الأرز المصرية بالخضار.",
    image: "./mixed-mahshi.jpg"
  },
  {
    id: 22,
    category: "طواجن وصواني بلدي",
    name: "كشري مصري مخصوص",
    price: "60 ج.م",
    description: "مكرونة وأرز وعدس وحمص وبصل مقرمش مع صلصة ودقة وشطة حارة.",
    image: "./egyptian-koshary.jpg"
  },
  {
    id: 23,
    category: "ساندوتشات وحواوشي",
    name: "حواوشي بلدي على الفحم",
    price: "85 ج.م",
    description: "رغيف حواوشي لحم بلدي متبل بالبصل والفلفل ومشوي على الفحم مقرمش.",
    image: "./hawawshi-baladi.jpg",
    tag: "الأعلى طلباً"
  },
  {
    id: 24,
    category: "ساندوتشات وحواوشي",
    name: "ساندوتش كبدة إسكندراني",
    price: "65 ج.م",
    description: "كبدة بلدي متبلة بالثوم والليمون والفلفل الحار في خبز فينو طازج مع طحينة.",
    image: "./alexandrian-liver-sandwich.jpg"
  },
  {
    id: 25,
    category: "ساندوتشات وحواوشي",
    name: "ساندوتش سجق شرقي إسكندراني",
    price: "70 ج.م",
    description: "سجق شرقي بصلصة الطماطم والفلفل الألوان والبصل في خبز فينو.",
    image: "./oriental-sausage-sandwich.jpg"
  },
  {
    id: 26,
    category: "فطير ومخبوزات",
    name: "فطير مشلتت بلدي بالسمن الفلاحي",
    price: "145 ج.م",
    description: "فطيرة مشلتتة مورقة ومخبوزة بالسمن البلدي الفلاحي تقدم مع عسل وجبنة قديمة.",
    image: "./feteer-meshaltet.jpg",
    tag: "فلاحي أصلي 🥞"
  },
  {
    id: 27,
    category: "فطير ومخبوزات",
    name: "فطيرة شرقي سجق وجبن",
    price: "190 ج.م",
    description: "فطيرة محشوة سجق شرقي، ميكس جبن، طماطم وفلفل وزيتون مخبوزة بالفرن.",
    image: "./feteer-sausage-cheese.jpg"
  },
  {
    id: 28,
    category: "فطير ومخبوزات",
    name: "فطيرة حلوة كاسترد وسكر",
    price: "110 ج.م",
    description: "فطيرة مورقة محشوة كاسترد ومرشوشة بسكر بودرة وحليب ساخن ومكسرات.",
    image: "./sweet-feteer-custard.jpg"
  },
  {
    id: 29,
    category: "فطير ومخبوزات",
    name: "سلة عيش بلدي طازج (5 أرغفة)",
    price: "15 ج.م",
    description: "عيش بلدي مخبوز بالردة في الفرن الحجري طازج وساخن.",
    image: "./fresh-baladi-bread.jpg"
  },
  {
    id: 30,
    category: "شوربة ومقبلات",
    name: "شوربة كوارع مخلية بالليمون",
    price: "115 ج.م",
    description: "شوربة كوارع دسمة وغنية بالبهارات مع قطع كوارع مسلوقة مخلية وليمون.",
    image: "./trotters-soup.jpg"
  },
  {
    id: 31,
    category: "شوربة ومقبلات",
    name: "شوربة لسان عصفور",
    price: "45 ج.م",
    description: "شوربة لسان عصفور محمر في مرقة دجاج غنية مع شرائح ليمون.",
    image: "./orzo-soup.jpg"
  },
  {
    id: 32,
    category: "شوربة ومقبلات",
    name: "كبيبة شامي مقلية (4 قطع)",
    price: "85 ج.م",
    description: "برغل محشو باللحمة المفرومة المعصجة والمكسرات مقلية ومقرمشة.",
    image: "./kibbeh-fried.jpg"
  },
  {
    id: 33,
    category: "شوربة ومقبلات",
    name: "سمبوسك ميكس جبن ولحم (6 قطع)",
    price: "70 ج.م",
    description: "رقائق سمبوسك مقرمشة محشوة بجبنة كيري ولحم مفروم معصج.",
    image: "./sambousek-mix.jpg"
  },
  {
    id: 34,
    category: "شوربة ومقبلات",
    name: "حمص بيروتي بزيت الزيتون",
    price: "50 ج.م",
    description: "حمص ناعم بالطحينة والليمون وزيت الزيتون البكر ورشة كمون.",
    image: "./hummus-olive-oil.jpg"
  },
  {
    id: 35,
    category: "شوربة ومقبلات",
    name: "بابا غنوج بالرمان",
    price: "45 ج.م",
    description: "باذنجان مشوي على الفحم مهروس بالطحينة والثوم ودبس الرمان.",
    image: "./baba-ghanoush.jpg"
  },
  {
    id: 36,
    category: "شوربة ومقبلات",
    name: "سلطات مشكلة ومخللات القصر",
    price: "40 ج.م",
    description: "طبق يجمع باذنجان مخلل بالدقة، طماطم متبلة، مخلل بلدي وسلطة خضراء.",
    image: "./oriental-pickles-salad.jpg"
  },
  {
    id: 37,
    category: "شوربة ومقبلات",
    name: "بطاطس محمرة مع صوص شيدر",
    price: "55 ج.م",
    description: "أصابع بطاطس مقلية مقرمشة مغطاة بصوص جبنة شيدر كريمي وساخن.",
    image: "./french-fries-cheddar.jpg"
  },
  {
    id: 38,
    category: "حلويات شرقية",
    name: "أم علي بالقشطة والمكسرات",
    price: "75 ج.م",
    description: "رقائق الملفيه بالحليب الساخن والمكسرات المحمصة مع طبقة قشطة بلدي محمرة.",
    image: "./om-ali-dessert.jpg",
    tag: "حلو مميز 🍮"
  },
  {
    id: 39,
    category: "حلويات شرقية",
    name: "طاجن أم علي بالنوتيلا",
    price: "90 ج.م",
    description: "أم علي غنية بشوكولاتة نوتيلا السايحة مع بندق ومكسرات بالفرن.",
    image: "./nutella-om-ali.jpg"
  },
  {
    id: 40,
    category: "حلويات شرقية",
    name: "كنافة مانجو بالكريمة",
    price: "85 ج.م",
    description: "كنافة مقرمشة بطبقات كريمة الخفق وقطع مانجو طبيعية فريش.",
    image: "./kunafa-mango.jpg"
  },
  {
    id: 41,
    category: "حلويات شرقية",
    name: "أرز بلبن بالفرن (أرز معمر حلو)",
    price: "50 ج.م",
    description: "طاجن أرز بالحليب والقشطة والسمن البلدي محمر الوجه بالمكسرات.",
    image: "./baked-rice-pudding.jpg"
  },
  {
    id: 42,
    category: "حلويات شرقية",
    name: "مشكل حلويات شرقية (بقلاوة وبسبوسة)",
    price: "95 ج.م",
    description: "طبق مشكل يضم بسبوسة بالسمن البلدي، بقلاوة بالفستق، وكنافة ملفوفة.",
    image: "./oriental-sweets-mix.jpg"
  },
  {
    id: 43,
    category: "مشروبات وعصائر فريش",
    name: "عصير ليمون بالنعناع فريش",
    price: "40 ج.م",
    description: "عصير ليمون طازج مثلج ومخفوق بأوراق النعناع الأخضر المنعش.",
    image: "./lemon-mint-juice.jpg",
    tag: "منعش ❄️"
  },
  {
    id: 44,
    category: "مشروبات وعصائر فريش",
    name: "عصير مانجو طبيعي مثلج",
    price: "50 ج.م",
    description: "عصير مانجو طبيعي 100% بدون أي إضافات صناعية مثلج ومنعش.",
    image: "./fresh-mango-juice.jpg"
  },
  {
    id: 45,
    category: "مشروبات وعصائر فريش",
    name: "عصير قصب مثلج",
    price: "25 ج.م",
    description: "عصير قصب سكر طبيعي طازج يقدم بارداً مع ثلج مجروش.",
    image: "./sugarcane-juice.jpg"
  },
  {
    id: 46,
    category: "مشروبات وعصائر فريش",
    name: "كركديه أسواني مثلج",
    price: "30 ج.م",
    description: "مشروب كركديه أسواني طبيعي مروي ومثلج غني بالانتعاش.",
    image: "./hibiscus-iced-tea.jpg"
  }
];

const categories = [
  "الكل",
  "مشويات على الفحم",
  "شاورما وصاج",
  "طواجن وصواني بلدي",
  "ساندوتشات وحواوشي",
  "فطير ومخبوزات",
  "شوربة ومقبلات",
  "حلويات شرقية",
  "مشروبات وعصائر فريش"
];

let activeCategory = "الكل";

const desktopCategories = document.getElementById("desktopCategories");
const drawerCategories = document.getElementById("drawerCategories");
const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const sidebarDrawer = document.getElementById("sidebarDrawer");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const openDrawerBtn = document.getElementById("openDrawerBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");

function toggleDrawer(isOpen) {
  if (isOpen) {
    sidebarDrawer.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    sidebarDrawer.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

openDrawerBtn.addEventListener("click", () => toggleDrawer(true));
closeDrawerBtn.addEventListener("click", () => toggleDrawer(false));
sidebarOverlay.addEventListener("click", () => toggleDrawer(false));

function renderNavigations() {
  desktopCategories.innerHTML = categories
    .map(
      (cat) => `
      <button class="cat-btn ${cat === activeCategory ? "active" : ""}" onclick="selectCategory('${cat}')">
        ${cat}
      </button>
    `
    )
    .join("");

  drawerCategories.innerHTML = categories
    .map(
      (cat) => `
      <button class="drawer-btn ${cat === activeCategory ? "active" : ""}" onclick="selectCategoryFromDrawer('${cat}')">
        ${cat}
      </button>
    `
    )
    .join("");
}

function renderContent() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = menuData.filter((item) => {
    const matchesCat = activeCategory === "الكل" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    menuContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px 0; font-size: 0.9rem;">مفيش أطباق مطابقة للبحث 🔍</p>`;
    return;
  }

  const grouped = {};
  filtered.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  menuContainer.innerHTML = Object.keys(grouped)
    .map(
      (cat) => `
      <section class="section-group">
        <h2 class="section-title">${cat}</h2>
        <div class="items-list">
          ${grouped[cat]
            .map(
              (dish) => `
            <div class="dish-card">
              <div class="dish-img-wrap">
                <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy" onerror="this.style.display='none'" />
              </div>
              <div class="dish-info">
                <div>
                  <div class="dish-header">
                    <h3 class="dish-name">${dish.name}</h3>
                    <span class="dish-price">${dish.price}</span>
                  </div>
                  <p class="dish-desc">${dish.description}</p>
                </div>
                ${dish.tag ? `<span class="dish-tag">${dish.tag}</span>` : ""}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </section>
    `
    )
    .join("");
}

window.selectCategory = function (cat) {
  activeCategory = cat;
  renderNavigations();
  renderContent();
};

window.selectCategoryFromDrawer = function (cat) {
  selectCategory(cat);
  toggleDrawer(false);
};

searchInput.addEventListener("input", renderContent);

renderNavigations();
renderContent();