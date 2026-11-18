// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForClientSideRTDB",
  authDomain: "restaurant-menu-template-59922.firebaseapp.com",
  databaseURL: "https://restaurant-menu-template-59922-default-rtdb.firebaseio.com",
  projectId: "restaurant-menu-template-59922",
  storageBucket: "restaurant-menu-template-59922.appspot.com",
  messagingSenderId: "100000000000",
  appId: "1:100000000000:web:restaurantmenu2026"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

const DEFAULT_RESTAURANT_INFO = {
  name: "قصر المشويات والمأكولات الشرقية",
  tagline: "أصل المشويات البلدي والطواجن المصرية على الفحم",
  logo: "./logo.svg",
  coverImg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=85",
  hotline: "19842",
  whatsapp: "201000000000",
  address: "القاهرة — التجمع الخامس، شارع التسعين الشمالي",
  mapUrl: "https://maps.google.com/?q=Cairo+Festival+City",
  workingHours: "يومياً من 12:00 ظهراً حتى 2:00 بعد منتصف الليل",
  about: "لحوم بلدية طازجة تُشوى يومياً على الفحم الطبيعي بتتبيلتنا الخاصة، مع تشكيلة من الطواجن المصرية والمقبلات المحضرة وقت الطلب.",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  adminPin: "1234",
  isOpen: true,
  totalTables: 16,
  vatEnabled: true,
  vatRate: 14,
  prepTimeMinutes: 20,
  deliveryFee: 25,
  promoCode: "WELCOME20",
  promoDiscount: 30,
  design: {
    layout: "luxury",
    primaryColor: "#D49638",
    themeMode: "dark",
    borderRadius: "20px",
    fontScale: "1",
    showIncludes: true,
    showFeatured: true
  }
};

const DEFAULT_MENU_ITEMS = [
  // ================= 1. المشويات =================
  {
    id: 101,
    name: "صينية ميكس جريل ملكي (1 كيلو)",
    category: "المشويات",
    price: 560,
    badge: "الأكثر طلباً",
    desc: "تشكيلة كباب ضاني، كفتة حاتي، شيش طاووق، وريش بتلو مشوية على الفحم.",
    includes: "المرفقات: أرز بسمتي بالخلطة + طحينة + بابا غنوج + سلطة بلدي + 4 عيش بلدي.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 102,
    name: "فرخة مشوية كاملة على الفحم",
    category: "المشويات",
    price: 295,
    badge: "عرض خاص",
    desc: "دجاجة كاملة طازجة (1200 جم) متبلة بالأعشاب والليمون ومشوية على الفحم.",
    includes: "المرفقات: أرز بسمتي مبهر + بطاطس محمرة + ثومية + سلطة خضراء + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 103,
    name: "نصف فرخة مشوية على الفحم",
    category: "المشويات",
    price: 165,
    badge: "",
    desc: "نصف دجاجة بلدي متبلة بخلطة الحاتي ومشوية على الفحم.",
    includes: "المرفقات: أرز بسمتي أصفر + سلطة طحينة + سلطة خضراء + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 104,
    name: "ريش ضاني مشوية على الفحم (نصف كيلو)",
    category: "المشويات",
    price: 495,
    badge: "الأكثر طلباً",
    desc: "ريش ضاني بلدي طرية متبلة بالبصل والبهارات الشرقية ومشوية على نار هادئة.",
    includes: "المرفقات: أرز بسمتي + طحينة + سلطة خضراء + بصل بالسماق + عيش محمص.",
    img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 105,
    name: "كفتة الحاتي المشوية على السيخ (نصف كيلو)",
    category: "المشويات",
    price: 310,
    badge: "الأكثر طلباً",
    desc: "كفتة لحم بلدي مفرومة مع البقدونس والدهن الضاني ومشوية على الفحم.",
    includes: "المرفقات: سلطة طحينة + طماطم وبصل مشوي + سلطة بلدي + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 106,
    name: "كباب بتلو مشوي على الفحم (نصف كيلو)",
    category: "المشويات",
    price: 460,
    badge: "",
    desc: "مكعبات لحم بتلو طرية متبلة بماء البصل والتوابل ومشوية على الفحم.",
    includes: "المرفقات: أرز بسمتي + طحينة + بابا غنوج + سلطة خضراء + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 107,
    name: "شيش طاووق مشوي بالزبادي",
    category: "المشويات",
    price: 235,
    badge: "",
    desc: "أسياخ مكعبات دجاج متبلة بالزبادي والبابريكا المدخنة مع الفلفل الألوان والبصل.",
    includes: "المرفقات: أرز بسمتي أصفر + ثومية + بطاطس محمرة + عيش تورتيلا.",
    img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 108,
    name: "طرب بلدي مشوي على الفحم (نصف كيلو)",
    category: "المشويات",
    price: 360,
    badge: "",
    desc: "أصابع كفتة بلدي ملفوفة في المنديل الضاني ومشوية على الفحم.",
    includes: "المرفقات: طحينة + مخلل مشكل + سلطة خضراء + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 109,
    name: "ستيك ريب آي مشوي على اللهب",
    category: "المشويات",
    price: 420,
    badge: "جديد",
    desc: "شريحة لحم ريب آي 350 جم مشوية على اللهب مع الزبدة والأعشاب والروزماري.",
    includes: "المرفقات: بطاطس بيوريه + خضار سوتيه + صوص المشروم أو الفلفل الأسود.",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 110,
    name: "سجق بلدي مشوي على الفحم (نصف كيلو)",
    category: "المشويات",
    price: 250,
    badge: "",
    desc: "سجق بلدي متبل بالخلطة المصرية الأصيلة ومشوي على الفحم.",
    includes: "المرفقات: سلطة طحينة + مخلل بلدي + عيش بلدي ساخن.",
    img: "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 2. الطواجن والمصري =================
  {
    id: 201,
    name: "طاجن ورق عنب ملفوف بالليمون",
    category: "الطواجن والمصري",
    price: 145,
    badge: "الأكثر طلباً",
    desc: "أصابع ورق عنب طازجة ملفوفة يدوياً بخلطة الأرز والخضرة ومطهوة في الفخار.",
    includes: "المرفقات: شرائح ليمون طازج + صوص دبس الرمان + سلطة زبادي بالخيار.",
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 202,
    name: "طاجن عكاوي بالبصل المكرمل",
    category: "الطواجن والمصري",
    price: 340,
    badge: "الأكثر طلباً",
    desc: "قطع عكاوي بلدي مطهوة ببطء في طاجن فخار داخل الفرن مع البصل المكرمل.",
    includes: "المرفقات: أرز بالشعرية ساخن + ملوخية خضراء + سلطة بلدي + عيش محمص.",
    img: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 203,
    name: "كشري مصري أصلي بالصلصة والدقة",
    category: "الطواجن والمصري",
    price: 75,
    badge: "عرض خاص",
    desc: "طبق الكشري المصري بالأرز والمكرونة والعدس الأسمر والحمص والبصل المقرمش.",
    includes: "المرفقات: صلصة طماطم مسبكة + دقة ثوم وخل + شطة زيت + توست مقرمش.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 204,
    name: "طاجن ملوخية خضراء بالتقلية",
    category: "الطواجن والمصري",
    price: 80,
    badge: "",
    desc: "ملوخية خضراء مخرطة طازجة مطهوة بالمرق البلدي مع طشة الثوم والكزبرة.",
    includes: "المرفقات: أرز أبيض مصري أو عيش بلدي محمص + باذنجان مخلل.",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 205,
    name: "طاجن بامية باللحمة الضاني",
    category: "الطواجن والمصري",
    price: 265,
    badge: "",
    desc: "بامية بلدي مطهوة في صلصة الطماطم الطازجة والثوم مع قطع اللحم الضاني في الفرن.",
    includes: "المرفقات: أرز بالشعرية + ليمون + فلفل أخضر حار + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 206,
    name: "طاجن أرز معمر بالسمنة البلدي والقشطة",
    category: "الطواجن والمصري",
    price: 115,
    badge: "",
    desc: "أرز مصري مطهو في الفخار مع الحليب الطازج والسمنة البلدي والقشطة الفلاحي.",
    includes: "المرفقات: سلطة خضراء + مخلل مشكل.",
    img: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 207,
    name: "طاجن موزة ضاني بالخضار في الفرن",
    category: "الطواجن والمصري",
    price: 385,
    badge: "جديد",
    desc: "موزة ضاني كاملة مطهوة على نار هادئة في الفخار مع البطاطس والجزر والبصل.",
    includes: "المرفقات: أرز بسمتي بالمكسرات + سلطة طحينة + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 208,
    name: "محشي مشكل مصري (كوسة وباذنجان وفلفل)",
    category: "الطواجن والمصري",
    price: 135,
    badge: "",
    desc: "تشكيلة محاشي مصرية طازجة محشوة بالأرز المتبل والشبت والكزبرة.",
    includes: "المرفقات: ملوخية خضراء + سلطة بلدي.",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 209,
    name: "فتة كوارع بلدي بالخل والثوم",
    category: "الطواجن والمصري",
    price: 290,
    badge: "",
    desc: "طبقات العيش المحمص والأرز المصري مع صلصة الطماطم بالخل والثوم والكوارع المخلية.",
    includes: "المرفقات: شوربة كوارع ساخنة بالليمون.",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 3. الشاورما والفتة =================
  {
    id: 301,
    name: "بوكس شاورما عربي دبل (12 قطعة)",
    category: "الشاورما والفتة",
    price: 165,
    badge: "الأكثر طلباً",
    desc: "12 قطعة شاورما عربي محمصة على الجريل ومحشوة بالثومية والخيار المخلل ومغطاة بالجبنة.",
    includes: "المرفقات: بطاطس فرينش فرايز + 2 ثومية + صوص شيدر ساخن + مخلل مشكل.",
    img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 302,
    name: "فتة شاورما لحم مصري بالطحينة",
    category: "الشاورما والفتة",
    price: 185,
    badge: "",
    desc: "طبقات من العيش الشامي المحمص والأرز البسمتي تعلوها شرائح شاورما اللحم المتبلة.",
    includes: "المرفقات: صوص الطحينة + دقة الثوم والخل + لوز محمص + مخلل.",
    img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 303,
    name: "فتة شاورما فراخ سوري بالثومية",
    category: "الشاورما والفتة",
    price: 170,
    badge: "الأكثر طلباً",
    desc: "أرز بسمتي أصفر وعيش محمص تعلوه شرائح شاورما الدجاج المشوية مع صوص الثومية.",
    includes: "المرفقات: مخلل خيار + ثومية إضافي + بطاطس محمرة.",
    img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 304,
    name: "ساندوتش شاورما لحم سوري صاج كبير",
    category: "الشاورما والفتة",
    price: 95,
    badge: "",
    desc: "خبز صاج محمص محشو بشرائح اللحم المشوي على السيخ مع البقدونس والبصل بالسماق.",
    includes: "المرفقات: صوص طحينة + خيار مخلل + بطاطس محمرة.",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 305,
    name: "ساندوتش شاورما فراخ سوري صاج كبير",
    category: "الشاورما والفتة",
    price: 85,
    badge: "",
    desc: "خبز صاج محمص محشو بشاورما الدجاج المتبلة مع الثومية والبطاطس والخيار المخلل.",
    includes: "المرفقات: علبة ثومية + بطاطس محمرة.",
    img: "https://images.unsplash.com/photo-1642783944285-b33b18ef6c3b?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 306,
    name: "شاورما لحم فرط (نصف كيلو)",
    category: "الشاورما والفتة",
    price: 280,
    badge: "",
    desc: "نصف كيلو شاورما لحم بلدي صافي مشوية على السيخ مع الطماطم والبقدونس.",
    includes: "المرفقات: علبة طحينة كبيرة + مخلل مشكل + 4 أرغفة عيش شامي.",
    img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 307,
    name: "شاورما فراخ فرط (نصف كيلو)",
    category: "الشاورما والفتة",
    price: 240,
    badge: "",
    desc: "نصف كيلو شاورما دجاج متبلة ومشوية على السيخ.",
    includes: "المرفقات: علبة ثومية كبيرة + مخلل خيار + بطاطس + 4 عيش صاج.",
    img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 308,
    name: "كيزر شاورما لحم مصري بالطحينة",
    category: "الشاورما والفتة",
    price: 65,
    badge: "",
    desc: "عيش كيزر طازج محشو بشاورما اللحم المصري مع البقدونس وصوص الطحينة.",
    includes: "المرفقات: مخلل مشكل.",
    img: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 4. الحواوشي والفطير =================
  {
    id: 401,
    name: "حواوشي بلدي مشوي على الفحم",
    category: "الحواوشي والفطير",
    price: 95,
    badge: "الأكثر طلباً",
    desc: "رغيف عيش بلدي محشو بلحم مفروم متبل بالبصل والفلفل الحار ومشوي على الفحم.",
    includes: "المرفقات: سلطة طحينة + مخلل لفت وخيار + بطاطس محمرة.",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 402,
    name: "حواوشي إسكندراني بالجبنة الموتزاريلا والسجق",
    category: "الحواوشي والفطير",
    price: 120,
    badge: "جديد",
    desc: "عجينة حواوشي إسكندراني مخبوزة في الفرن ومحشوة بالسجق الشرقي والموتزاريلا.",
    includes: "المرفقات: طحينة + مخلل مشكل.",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 403,
    name: "فطير مشلتت فلاحي بالسمنة البلدي",
    category: "الحواوشي والفطير",
    price: 140,
    badge: "الأكثر طلباً",
    desc: "فطير مشلتت مورق مخبوز بالسمنة البلدي الفلاحي الصافي.",
    includes: "المرفقات: عسل أسود بالطحينة + عسل أبيض + جبنة قديمة بالطماطم.",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 404,
    name: "فطير شرقي سجق ومشكل جبن",
    category: "الحواوشي والفطير",
    price: 175,
    badge: "",
    desc: "فطير شرقي محشو بالسجق البلدي والفلفل الألوان والزيتون والشيدر والموتزاريلا.",
    includes: "المرفقات: مخلل مشكل + صوص رانش.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 405,
    name: "فطير شرقي لحم مفروم وبسطرمة",
    category: "الحواوشي والفطير",
    price: 185,
    badge: "",
    desc: "فطير شرقي غني باللحم المفروم المتبل وشرائح البسطرمة البلدي والموتزاريلا.",
    includes: "المرفقات: مخلل مشكل.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 406,
    name: "فطير حلو بالكاسترد والسكر البودرة",
    category: "الحواوشي والفطير",
    price: 110,
    badge: "",
    desc: "فطير حلو محشو بكريمة الكاسترد الغنية ومغطى باللبن والسكر البودرة والمكسرات.",
    includes: "يُقدم ساخناً فور خروجه من الفرن.",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 407,
    name: "ساندوتش كبدة إسكندراني بالليمون",
    category: "الحواوشي والفطير",
    price: 65,
    badge: "",
    desc: "كبدة بلدي طازجة مشوحة بالثوم والفلفل الأخضر الحار وعصير الليمون.",
    includes: "المرفقات: سلطة طحينة + مخلل.",
    img: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 5. الأسماك والبحريات =================
  {
    id: 501,
    name: "سمك بوري مشوي ردة أو زيت وليمون",
    category: "الأسماك والبحريات",
    price: 210,
    badge: "الأكثر طلباً",
    desc: "سمكة بوري بحر طازجة مشوية على الجريل بتتبيلة الثوم والكمون والليمون.",
    includes: "المرفقات: أرز صيادية بني + سلطة طحينة + سلطة خضراء + عيش بلدي.",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 502,
    name: "جمبري جامبو مشوي بترفلاي بالزبدة والثوم",
    category: "الأسماك والبحريات",
    price: 390,
    badge: "الأكثر طلباً",
    desc: "جمبري جامبو طازج مفتوح بترفلاي ومشوي بالزبدة والثوم والأعشاب والليمون.",
    includes: "المرفقات: أرز صيادية + صوص تارتار + طحينة + بطاطس محمرة.",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 503,
    name: "فيليه قشر بياض مقلي مقرمش",
    category: "الأسماك والبحريات",
    price: 245,
    badge: "",
    desc: "شرائح فيليه قشر بياض متبلة ومقلية بالخلطة الذهبية المقرمشة.",
    includes: "المرفقات: أرز صيادية + صوص تارتار + سلطة طحينة.",
    img: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 504,
    name: "طاجن سي فود بالكريمة والموتزاريلا",
    category: "الأسماك والبحريات",
    price: 320,
    badge: "جديد",
    desc: "جمبري، سبيط، فيليه سمك، وكابوريا مطهوة في صوص الكريمة ومغطاة بالموتزاريلا.",
    includes: "المرفقات: أرز أبيض بالزبدة + سلطة خضراء.",
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 505,
    name: "سبيط (كاليماري) مقلي مقرمش",
    category: "الأسماك والبحريات",
    price: 260,
    badge: "",
    desc: "حلقات كاليماري طازجة مقلية بتتبيلة الأعشاب والليمون.",
    includes: "المرفقات: صوص تارتار + بطاطس محمرة + أرز صيادية.",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 506,
    name: "سمك بلطي مقلي مقرمش (سمكتين)",
    category: "الأسماك والبحريات",
    price: 165,
    badge: "",
    desc: "سمكتين بلطي طازج متبل بالثوم والكمون والكسبرة ومقلي مقرمش.",
    includes: "المرفقات: أرز صيادية + سلطة طحينة + سلطة خضراء.",
    img: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 507,
    name: "شوربة سي فود بالكريمة",
    category: "الأسماك والبحريات",
    price: 135,
    badge: "",
    desc: "شوربة مأكولات بحرية غنية بالجمبري والسبيط والفيليه مع الكريمة والشبت.",
    includes: "المرفقات: شرائح ليمون + خبز محمص.",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 6. البرجر والبيتزا =================
  {
    id: 601,
    name: "برجر لحم مشوي دبل تشيز (300 جم)",
    category: "البرجر والبيتزا",
    price: 175,
    badge: "الأكثر طلباً",
    desc: "قطعتين برجر لحم صافي مشوي على اللهب مع جبنة شيدر ذائبة وبصل مكرمل.",
    includes: "المرفقات: بطاطس محمرة مقرمشة + صوص باربيكيو + سلطة كول سلو.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 602,
    name: "مشروم آند سويس برجر",
    category: "البرجر والبيتزا",
    price: 165,
    badge: "",
    desc: "برجر لحم بقري مشوي مغطى بصوص المشروم الطازج والجبنة السويسرية.",
    includes: "المرفقات: بطاطس فرينش فرايز + كول سلو.",
    img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 603,
    name: "تشيكن كرانشي زنجر برجر",
    category: "البرجر والبيتزا",
    price: 145,
    badge: "",
    desc: "صدر دجاج مقرمش متبل بالتوابل الحارة مع خس آيسبرج وجبنة شيدر.",
    includes: "المرفقات: بطاطس محمرة + كول سلو.",
    img: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 604,
    name: "بيتزا مارجريتا والريحان الإيطالي",
    category: "البرجر والبيتزا",
    price: 155,
    badge: "",
    desc: "عجينة إيطالية هشة مخبوزة في الفرن مع صوص الطماطم الطازج والموتزاريلا.",
    includes: "المرفقات: صوص رانش + زيت زيتون بالأعشاب.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 605,
    name: "بيتزا سوبر سوبريم مشكل لحوم",
    category: "البرجر والبيتزا",
    price: 195,
    badge: "الأكثر طلباً",
    desc: "بيتزا غنية بالبيبروني والسجق الشرقي واللحم المفروم والفلفل الألوان والزيتون.",
    includes: "المرفقات: صوص رانش + صوص حار + هالبينو.",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 606,
    name: "بيتزا تشيكن رانش وباربيكيو",
    category: "البرجر والبيتزا",
    price: 190,
    badge: "جديد",
    desc: "قطع دجاج مشوي مع صوص الرانش الكريمي والباربيكيو المدخن والموتزاريلا.",
    includes: "المرفقات: صوص رانش إضافي.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 607,
    name: "بيتزا بيبروني كلاسيك",
    category: "البرجر والبيتزا",
    price: 180,
    badge: "",
    desc: "شرائح بيبروني بقري مدخن مع صلصة البيتزا وجبنة موتزاريلا.",
    includes: "المرفقات: صوص رانش.",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 608,
    name: "بيتزا فور تشيز (أربع أجبان)",
    category: "البرجر والبيتزا",
    price: 185,
    badge: "",
    desc: "مزيج الموتزاريلا والشيدر الأحمر والريكفورد والبارميزان.",
    includes: "تُقدم ساخنة.",
    img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 7. المكرونات =================
  {
    id: 701,
    name: "مكرونة نجرسكو فراخ بالبشاميل والموتزاريلا",
    category: "المكرونات",
    price: 155,
    badge: "الأكثر طلباً",
    desc: "مكرونة شرائط مع قطع الدجاج والمشروم والزيتون في صوص البشاميل والموتزاريلا.",
    includes: "تُقدم ساخنة في طاجن فخار.",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 702,
    name: "مكرونة بيني ألفريدو بالدجاج والمشروم",
    category: "المكرونات",
    price: 150,
    badge: "",
    desc: "مكرونة بيني مطهوة في صوص الكريمة البيضاء والبارميزان مع الدجاج المشوي.",
    includes: "المرفقات: خبز بالثوم محمص.",
    img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 703,
    name: "اسباجتي بولونيز باللحم المفروم",
    category: "المكرونات",
    price: 140,
    badge: "",
    desc: "مكرونة اسباجتي مع صلصة الطماطم الغنية باللحم المفروم والأعشاب.",
    includes: "مغطاة بجبنة بارميزان مبشورة.",
    img: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 704,
    name: "طاجن مكرونة فرن باللحمة المفرومة",
    category: "المكرونات",
    price: 95,
    badge: "",
    desc: "طاجن مكرونة قلم بالصلصة الحمراء واللحم المفروم المتبل على الطريقة المصرية.",
    includes: "المرفقات: دقة ثوم وخل + شطة + مخلل.",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 705,
    name: "مكرونة سي فود بالصوص الأحمر أو الأبيض",
    category: "المكرونات",
    price: 195,
    badge: "جديد",
    desc: "مكرونة فيتوتشيني مع الجمبري والسبيط وبلح البحر.",
    includes: "المرفقات: خبز بالثوم.",
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 8. المقبلات والسلطات =================
  {
    id: 801,
    name: "حمص بالطحينة وزيت الزيتون",
    category: "المقبلات والسلطات",
    price: 55,
    badge: "",
    desc: "حمص ناعم مخفوق بالطحينة والليمون والثوم ومزين بزيت الزيتون البكر.",
    includes: "المرفقات: خبز لبناني محمص.",
    img: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 802,
    name: "بابا غنوج مشوي بالطحينة",
    category: "المقبلات والسلطات",
    price: 50,
    badge: "",
    desc: "باذنجان مشوي على اللهب مهروس مع الطحينة والثوم والليمون وزيت الزيتون.",
    includes: "المرفقات: عيش بلدي محمص.",
    img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 803,
    name: "سمبوسك لحم وجبنة مقرمشة (6 قطع)",
    category: "المقبلات والسلطات",
    price: 75,
    badge: "الأكثر طلباً",
    desc: "رقائق مقرمشة محشوة باللحم المفروم المتبل مع خلطة الجبن السايحة.",
    includes: "المرفقات: صوص سويت تشيلي + طحينة.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 804,
    name: "كبيبة شامي مقلية محشوة باللحم والصنوبر (4 قطع)",
    category: "المقبلات والسلطات",
    price: 85,
    badge: "",
    desc: "أقراص برغل مقرمشة محشوة باللحم المفروم والبصل والمكسرات.",
    includes: "المرفقات: سلطة زبادي بالنعناع.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 805,
    name: "بطاطس فرينش فرايز بالجبنة الشيدر والهالبينو",
    category: "المقبلات والسلطات",
    price: 65,
    badge: "",
    desc: "بطاطس مقلية ذهبية مقرمشة مغطاة بصوص الجبنة الشيدر الساخن والهالبينو.",
    includes: "المرفقات: كاتشب ومايونيز.",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 806,
    name: "سلطة تبولة لبنانية طازجة",
    category: "المقبلات والسلطات",
    price: 60,
    badge: "",
    desc: "بقدونس مفروم ناعم مع البرغل والطماطم والنعناع وزيت الزيتون وعصير الليمون.",
    includes: "تُقدم باردة وطازجة.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 807,
    name: "سلطة سيزر بالدجاج المشوي",
    category: "المقبلات والسلطات",
    price: 110,
    badge: "",
    desc: "خس آيسبرج مقرمش مع شرائح الدجاج المشوي والخبز المحمص والبارميزان.",
    includes: "مع صوص السيزر الأصلي.",
    img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 808,
    name: "شوربة لسان عصفور بالمرق البلدي",
    category: "المقبلات والسلطات",
    price: 45,
    badge: "",
    desc: "شوربة لسان عصفور محمرة ومطهوة في مرق اللحم البلدي الصافي.",
    includes: "تُقدم ساخنة مع الليمون.",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 809,
    name: "شوربة كريمة بالدجاج والمشروم",
    category: "المقبلات والسلطات",
    price: 75,
    badge: "",
    desc: "شوربة كريمية غنية بقطع الدجاج والمشروم الطازج.",
    includes: "المرفقات: خبز توست محمص.",
    img: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    available: true
  },

  // ================= 9. الحلويات والمشروبات =================
  {
    id: 901,
    name: "بقلاوة تركي بالفستق الحلبي",
    category: "الحلويات والمشروبات",
    price: 110,
    badge: "الأكثر طلباً",
    desc: "رقائق جلاش مقرمشة بالسمن البلدي محشوة بالفستق الحلبي ومسقية بالشربات الخفيف.",
    includes: "تُقدم طازجة ومقرمشة.",
    img: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 902,
    name: "كنافة نابلسية بالجبنة والقطر",
    category: "الحلويات والمشروبات",
    price: 95,
    badge: "جديد",
    desc: "كنافة ذهبية ساخنة محشوة بالجبنة العكاوي ومزينة بالفستق المجروش.",
    includes: "تُقدم ساخنة مع القطر الدافئ.",
    img: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 903,
    name: "طاجن أم علي بالمكسرات والقشطة البلدي",
    category: "الحلويات والمشروبات",
    price: 85,
    badge: "الأكثر طلباً",
    desc: "طاجن أم علي ساخن مخبوز في الفرن مع الحليب والقشطة الفلاحي والمكسرات.",
    includes: "يُقدم ساخناً فور خروجه من الفرن.",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 904,
    name: "تشيز كيك لوتس أو نوتيلا",
    category: "الحلويات والمشروبات",
    price: 90,
    badge: "",
    desc: "طبقة بسكويت مقرمشة تعلوها كريمة الجبن الغنية وصوص اللوتس أو النوتيلا.",
    includes: "تُقدم باردة.",
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 905,
    name: "مولتن كيك شوكولاتة مع آيس كريم فانيليا",
    category: "الحلويات والمشروبات",
    price: 105,
    badge: "",
    desc: "كيك شوكولاتة ساخن محشو بالشوكولاتة السائلة مع بولة آيس كريم فانيليا.",
    includes: "يُقدم ساخناً.",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 906,
    name: "عصير مانجو عويس طبيعي فريش",
    category: "الحلويات والمشروبات",
    price: 55,
    badge: "الأكثر طلباً",
    desc: "عصير مانجو طبيعي ثقيل 100% بدون أي ألوان صناعية.",
    includes: "يُقدم مثلجاً.",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 907,
    name: "ليمون بالنعناع الأخضر المثلج",
    category: "الحلويات والمشروبات",
    price: 45,
    badge: "",
    desc: "عصير ليمون طازج مخفوق مع أوراق النعناع الفريش والثلج المجروش.",
    includes: "يُقدم مثلجاً.",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 908,
    name: "كركديه أسواني مثلج",
    category: "الحلويات والمشروبات",
    price: 35,
    badge: "",
    desc: "منقوع زهور الكركديه الأسواني المثلج.",
    includes: "يُقدم بارداً.",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    available: true
  },
  {
    id: 909,
    name: "قهوة تركي دبل على السبرتاية",
    category: "الحلويات والمشروبات",
    price: 40,
    badge: "",
    desc: "قهوة تركي محوجة مطهوة ببطء على السبرتاية.",
    includes: "المرفقات: قطعة راحة أو تمر.",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    available: true
  }
];

function compressImageFromDevice(file, maxWidth = 800, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

function printThermalReceipt(order, info) {
  const receiptWin = window.open("", "_blank", "width=420,height=680");
  const dateStr = new Date(order.createdAt).toLocaleString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  const itemsRows = (order.items || [])
    .map(
      (i) => `
      <tr>
        <td style="text-align:right; padding:4px 0;">${i.name}</td>
        <td style="text-align:center;">${i.qty}</td>
        <td style="text-align:left;">${i.total}</td>
      </tr>
    `
    )
    .join("");

  receiptWin.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>إيصال طلب #${order.orderNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;900&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; font-family: 'Cairo', sans-serif; }
        body { width: 80mm; max-width: 100%; margin: 0 auto; padding: 10px; color: #000; font-size: 12px; }
        .center { text-align: center; }
        .divider { border-top: 1px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        th { border-bottom: 1px solid #000; padding-bottom: 4px; font-size: 11px; }
        .total-row { font-size: 15px; font-weight: 900; }
        .badge { display: inline-block; border: 1.5px solid #000; padding: 2px 10px; font-weight: 900; border-radius: 6px; margin: 4px 0; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body onload="window.print()">
      <div class="center">
        <h2 style="margin:0; font-size:17px;">${info.name}</h2>
        <p style="margin:2px 0; font-size:11px;">${info.address}</p>
        <p style="margin:2px 0; font-size:11px;">هاتف: ${info.hotline}</p>
        <div class="badge">${order.orderType === "dinein" ? `صالة - ترابيزة ${order.tableNumber}` : "طلب دليفري"}</div>
      </div>
      <div class="divider"></div>
      <div>
        <div><strong>رقم الفاتورة:</strong> #${order.orderNumber}</div>
        <div><strong>التاريخ:</strong> ${dateStr}</div>
        <div><strong>العميل:</strong> ${order.customerName} (${order.customerPhone})</div>
        ${order.orderType === "delivery" ? `<div><strong>العنوان:</strong> ${order.address}</div>` : ""}
        ${order.notes ? `<div><strong>ملاحظات:</strong> ${order.notes}</div>` : ""}
      </div>
      <div class="divider"></div>
      <table>
        <thead>
          <tr>
            <th style="text-align:right;">الصنف</th>
            <th style="text-align:center;">الكمية</th>
            <th style="text-align:left;">الإجمالي</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>
      <div class="divider"></div>
      <table>
        <tr><td>المجموع الفرعي:</td><td style="text-align:left;">${order.subTotal} ج.م</td></tr>
        ${order.vatAmount > 0 ? `<tr><td>ضريبة القيمة المضافة (${ord.vatRate || 14}%):</td><td style="text-align:left;">${order.vatAmount} ج.م</td></tr>` : ""}
        ${order.deliveryFee > 0 ? `<tr><td>رسوم التوصيل:</td><td style="text-align:left;">${order.deliveryFee} ج.م</td></tr>` : ""}
        ${order.discount > 0 ? `<tr><td>الخصم:</td><td style="text-align:left;">-${order.discount} ج.م</td></tr>` : ""}
        <tr class="total-row"><td>الإجمالي المطلوب:</td><td style="text-align:left;">${order.grandTotal} ج.م</td></tr>
      </table>
      <div class="divider"></div>
      <div class="center" style="font-size:11px;">
        شكراً لزيارتكم — نتمنى لكم وجبة شهية!
      </div>
      <button class="no-print" onclick="window.print()" style="width:100%; margin-top:12px; padding:8px; background:#000; color:#fff; border:none; border-radius:6px; cursor:pointer;">طباعة / حفظ PDF</button>
    </body>
    </html>
  `);
  receiptWin.document.close();
}