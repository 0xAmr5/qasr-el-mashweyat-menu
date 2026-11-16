// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyCZD1xL3BWSxOpKHa4GULk-0FmmUx8vFeg",
  authDomain: "restaurant-menu-template-59922.firebaseapp.com",
  databaseURL: "https://restaurant-menu-template-59922-default-rtdb.firebaseio.com",
  projectId: "restaurant-menu-template-59922",
  storageBucket: "restaurant-menu-template-59922.firebasestorage.app",
  messagingSenderId: "502545403405",
  appId: "1:502545403405:web:0c137ad6fe115f99500f44"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const DEFAULT_RESTAURANT_INFO = {
  name: "قصر المشويات",
  tagline: "أصل المشويات والطواجن المصرية على الفحم",
  logo: "./logo.svg",
  coverImg: "./mixed-grill.jpg",
  hotline: "19888",
  whatsapp: "201009694831",
  about: "نقدم لكم أجود أنواع المشويات على الفحم والطواجن المصرية الأصيلة المحضرة يومياً من أجود اللحوم البلدية الطازجة.",
  workingHours: "يومياً من 12:00 ظهراً حتى 2:00 صباحاً",
  address: "الفرع الرئيسي: شارع التحرير، بجوار ميدان المساحة",
  mapUrl: "https://maps.google.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  isOpen: true,
  deliveryFee: 25,
  vatEnabled: true,       // تفعيل ضريبة 14%
  vatRate: 14,            // النسبة 14%
  totalTables: 12,        // إجمالي عدد الترابيزات في الصالة
  prepTimeMinutes: 20,    // متوسط وقت تجهيز الطلب بالدقائق
  promoCode: "SAVE20",
  promoDiscount: 20,
  adminPin: "1234",
  design: {
    layout: "modern",
    themeMode: "light",
    primaryColor: "#D97706",
    borderRadius: "18px",
    fontScale: "1"
  }
};

const DEFAULT_MENU_ITEMS = [
  { id: 1, category: "مشويات", name: "مشكل كباب وكفتة", price: 420, desc: "كباب وكفتة متبلة على الفحم تقدم مع سلطة وعيش بلدي ساخن وطحينة.", img: "./mixed-grill.jpg", badge: "الأكثر طلباً", available: true },
  { id: 2, category: "مشويات", name: "ريش ضاني مشوية", price: 490, desc: "ريش ضاني بلدي متبلة ومشوية على الجمر مع الخضار المشوي.", img: "./lamb-chops.jpg", badge: "الأكثر طلباً", available: true },
  { id: 3, category: "مشويات", name: "ريش بتلو مشوية", price: 460, desc: "ريش بتلو مشوية على الفحم بتتبيلة روزماري وبهارات شرقية.", img: "./veal-chops.jpg", badge: "", available: true },
  { id: 4, category: "مشويات", name: "طرب بلدي مخصوص", price: 360, desc: "كفتة بلدي ملفوفة بمنديل الضاني على الفحم تقدم ساخنة.", img: "./tarb-grill.jpg", badge: "عرض خاص", available: true },
  { id: 5, category: "مشويات", name: "كفتة حاتي بلدي", price: 290, desc: "أصابع كفتة حاتي مشوية على الفحم مع سلطة طحينة.", img: "./mixed-grill.jpg", badge: "", available: true },
  { id: 6, category: "مشويات", name: "شيش طاووق", price: 160, desc: "صدور وأوراك متبلة بالزبادي والأعشاب مشوية على الفحم.", img: "./shish-tawook.jpg", badge: "", available: true },
  { id: 7, category: "مشويات", name: "فرخة مشوية كاملة", price: 240, desc: "فرخة كاملة بتتبيلة خاصة مشوية ع الفحم تقدم مع تومية وعيش.", img: "./grilled-chicken.jpg", badge: "عرض خاص", available: true },
  { id: 10, category: "طواجن ومحاشي", name: "طاجن عكاوي بالبصل", price: 320, desc: "عكاوي بلدي دايبة مع بصل مكرمل في الفرن الفخار.", img: "./oxtail-tajine.jpg", badge: "الأكثر طلباً", available: true },
  { id: 11, category: "طواجن ومحاشي", name: "طاجن ملوخية بالطشة", price: 90, desc: "ملوخية خضراء بطشة الثوم والكزبرة والسمن البلدي.", img: "./molokhia-pot.jpg", badge: "", available: true },
  { id: 12, category: "طواجن ومحاشي", name: "طاجن ورق عنب بالكوارع", price: 250, desc: "ورق عنب محشو مع قطع كوارع مخلية بالفرن.", img: "./grape-leaves-tajine.jpg", badge: "", available: true },
  { id: 20, category: "شاورما وساندوتشات", name: "عربي شاورما فراخ", price: 140, desc: "رول شاورما مقطع مع بطاطس وتومية ومخلل.", img: "./chicken-shawarma-arabi.jpg", badge: "", available: true },
  { id: 25, category: "شاورما وساندوتشات", name: "حواوشي بلدي ع الفحم", price: 85, desc: "لحم مفروم متبل بالبصل في خبز بلدي مقرمش.", img: "./hawawshi-baladi.jpg", badge: "", available: true },
  { id: 34, category: "مقبلات وسلطات", name: "سلطة بلدي وطحينة", price: 35, desc: "سلطة خضراء طازجة مع سلطة طحينة بالليمون والكمون.", img: "./baba-ghanoush.jpg", badge: "", available: true },
  { id: 38, category: "مقبلات وسلطات", name: "بابا غنوج مشوي ع الفحم", price: 45, desc: "باذنجان مشوي ع الفحم بالطحينة والثوم ودبس الرمان.", img: "./baba-ghanoush.jpg", badge: "", available: true },
  { id: 42, category: "حلويات", name: "كنافة بالمانجو والكريمة", price: 85, desc: "كنافة مقرمشة بطبقات كريمة الخفق وقطع المانجو.", img: "./kunafa-mango.jpg", badge: "الأكثر طلباً", available: true },
  { id: 45, category: "مشروبات وعصائر", name: "زجاجة مياه معدنية", price: 15, desc: "مياه معدنية طبيعية باردة.", img: "./lemon-mint-juice.jpg", badge: "", available: true },
  { id: 46, category: "مشروبات وعصائر", name: "عصير مانجو فريش طبيعي", price: 50, desc: "مانجو طبيعي 100% مثلج وقوام كثيف.", img: "./fresh-mango-juice.jpg", badge: "", available: true }
];

function compressImageFromDevice(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject("لم يتم اختيار صورة");
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 550;
        let width = img.width;
        let height = img.height;
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.onerror = () => reject("ملف الصورة غير صالح");
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// دالة طباعة إيصال احترافي (تشتغل للعميل وللكاشير كـ PDF أو طابعة حرارية)
function printThermalReceipt(order, restInfo) {
  const win = window.open("", "_blank", "width=420,height=650");
  const dateStr = new Date(order.createdAt).toLocaleString("ar-EG");
  const itemsRows = (order.items || []).map(i => `
    <tr>
      <td style="text-align:right; padding:4px 0;">${i.name}</td>
      <td style="text-align:center;">${i.qty}</td>
      <td style="text-align:left;">${i.total}</td>
    </tr>
  `).join("");

  win.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>فاتورة #${order.orderNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;900&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; width: 300px; margin: 0 auto; padding: 14px; color: #111; font-size: 12px; }
        .center { text-align: center; }
        .divider { border-top: 1px dashed #444; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        th { border-bottom: 1px solid #222; padding-bottom: 4px; font-size: 11px; }
        .row { display: flex; justify-content: space-between; margin: 3px 0; }
        .grand { font-size: 15px; font-weight: 900; border-top: 1.5px solid #000; padding-top: 6px; margin-top: 6px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="center">
        <h2 style="margin:0; font-size:18px;">${restInfo.name}</h2>
        <p style="margin:2px 0; font-size:11px;">${restInfo.address || ""}</p>
        <p style="margin:2px 0; font-size:11px;">الخط الساخن: ${restInfo.hotline || ""}</p>
      </div>
      <div class="divider"></div>
      <div class="row"><span>رقم الطلب:</span><strong>#${order.orderNumber}</strong></div>
      <div class="row"><span>النوع:</span><strong>${order.orderType === "dinein" ? `صالة - ترابيزة ${order.tableNumber}` : "توصيل دليفري"}</strong></div>
      <div class="row"><span>العميل:</span><span>${order.customerName} (${order.customerPhone})</span></div>
      ${order.orderType === "delivery" ? `<div class="row"><span>العنوان:</span><span>${order.address}</span></div>` : ""}
      <div class="row"><span>التاريخ:</span><span>${dateStr}</span></div>
      <div class="divider"></div>
      <table>
        <thead>
          <tr><th style="text-align:right;">الصنف</th><th>الكمية</th><th style="text-align:left;">السعر</th></tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>
      <div class="divider"></div>
      <div class="row"><span>المجموع الفرعي:</span><span>${order.subTotal} ج.م</span></div>
      ${order.vatAmount > 0 ? `<div class="row"><span>ضريبة القيمة المضافة (${order.vatRate || 14}%):</span><span>${order.vatAmount} ج.م</span></div>` : ""}
      ${order.deliveryFee > 0 ? `<div class="row"><span>رسوم التوصيل:</span><span>${order.deliveryFee} ج.م</span></div>` : ""}
      ${order.discount > 0 ? `<div class="row"><span>الخصم:</span><span>-${order.discount} ج.م</span></div>` : ""}
      <div class="row grand"><span>الإجمالي النهائي:</span><span>${order.grandTotal} ج.م</span></div>
      <div class="divider"></div>
      <p class="center" style="margin-top:10px; font-weight:700;">شكراً لزيارتكم • نتمنى لكم وجبة شهية!</p>
      <button class="no-print" onclick="window.print()" style="width:100%; padding:10px; margin-top:12px; background:#111; color:#fff; border:none; border-radius:8px; font-family:'Cairo'; font-weight:700; cursor:pointer;">🖨️ طباعة / حفظ PDF</button>
    </body>
    </html>
  `);
  win.document.close();
}