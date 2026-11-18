// admin/admin.js
let restaurantInfo = { ...DEFAULT_RESTAURANT_INFO };
let menuItems = [...DEFAULT_MENU_ITEMS];
let allOrders = [];
let currentOrderFilter = "active";
let currentReportPeriod = "today";

// ==========================================
// طبقة التحقق والجلسة الآمنة (Session Guard)
// ==========================================
let isAdminAuthenticated = false;
const DEFAULT_ADMIN_USER = "01018622861";
const DEFAULT_ADMIN_PASS_HASH = "c7e320b93b02d667e75b80a61957e5082e128a1d761a7e0a00a191a63621a6c2"; // 20268855

let storedAdminAuth = {
  username: DEFAULT_ADMIN_USER,
  passHash: DEFAULT_ADMIN_PASS_HASH
};

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;
let inactivityTimer = null;

async function sha256Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(String(text));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function lockDashboardNow() {
  isAdminAuthenticated = false;
  sessionStorage.removeItem("admin_session_sig");
  clearTimeout(inactivityTimer);
  window.location.replace("login.html");
}

function resetInactivityTimer() {
  if (!isAdminAuthenticated) return;
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    lockDashboardNow();
  }, INACTIVITY_TIMEOUT_MS);
}

["click", "mousemove", "keydown", "touchstart"].forEach((evt) => {
  document.addEventListener(evt, resetInactivityTimer, { passive: true });
});

const lockAdminNowBtn = document.getElementById("lockAdminNowBtn");
if (lockAdminNowBtn) {
  lockAdminNowBtn.addEventListener("click", lockDashboardNow);
}

db.ref("adminAuth").on("value", async (snap) => {
  if (snap.exists()) {
    const val = snap.val();
    storedAdminAuth = {
      username: val.username || DEFAULT_ADMIN_USER,
      passHash: val.passHash || DEFAULT_ADMIN_PASS_HASH
    };
  } else {
    storedAdminAuth = {
      username: DEFAULT_ADMIN_USER,
      passHash: DEFAULT_ADMIN_PASS_HASH
    };
    await db.ref("adminAuth").set(storedAdminAuth);
  }

  const expectedSig = await sha256Hex(`${storedAdminAuth.username}:${storedAdminAuth.passHash}`);
  const savedSig = sessionStorage.getItem("admin_session_sig");

  if (!savedSig || savedSig !== expectedSig) {
    lockDashboardNow();
    return;
  }

  if (!isAdminAuthenticated) {
    isAdminAuthenticated = true;
    resetInactivityTimer();
    populateSettingsAndDesign();
    renderOrders();
    renderTablesGrid();
    renderAdminMenuTable();
    renderReports();
  }
});

// ==========================================
// نظام الصوت
// ==========================================
let audioCtx = null;

function initAudioAuto() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch (e) {}
}

["click", "touchstart", "keydown"].forEach((evt) => {
  document.addEventListener(evt, initAudioAuto, { passive: true });
});

function playOrderBell() {
  if (!isAdminAuthenticated) return;
  try {
    initAudioAuto();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    [880, 1174.66, 1318.5].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0.32, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.55);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.56);
    });
  } catch (e) {}
}

function showAdminToast(msg) {
  const toast = document.getElementById("adminToast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

// ==========================================
// طباعة الريسيت الحراري
// ==========================================
function printThermalReceiptAdmin(ord) {
  if (!isAdminAuthenticated) return;
  const win = window.open("", "_blank", "width=420,height=680");
  if (!win) {
    alert("اسمح بفتح النوافذ المنبثقة لطباعة الريسيت");
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
        <h2 style="margin:0; font-size:19px;">${restaurantInfo.name || "قصر المشويات"}</h2>
        <div style="font-size:12px;">${restaurantInfo.address || ""}</div>
        <div style="font-size:12px;">هاتف: ${restaurantInfo.hotline || ""}</div>
      </div>
      <div class="divider"></div>
      <div style="font-size:12px; line-height:1.7;">
        <div><strong>رقم الفاتورة:</strong> #${ord.orderNumber}</div>
        <div><strong>النوع:</strong> ${ord.orderType === "dinein" ? `صالة — ترابيزة ${ord.tableNumber}` : "توصيل دليفري"}</div>
        <div><strong>العميل:</strong> ${ord.customerName || "عميل صالة"} ${ord.customerPhone ? `(${ord.customerPhone})` : ""}</div>
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
      <div class="tot-row grand"><span>الإجمالي المدفوع:</span><span>${ord.grandTotal} ج.م</span></div>
      <div class="divider"></div>
      <div class="center" style="font-size:12px; font-weight:800;">شكراً لزيارتكم — نتمنى لكم وجبة شهية</div>
      <script>window.onload = () => setTimeout(() => window.print(), 350);<\/script>
    </body>
    </html>
  `);
  win.document.close();
}

// ==========================================
// القائمة الجانبية والتبويبات
// ==========================================
const adminSidebar = document.getElementById("adminSidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
const mobilePageTitle = document.getElementById("mobilePageTitle");

if (toggleSidebarBtn && adminSidebar) {
  toggleSidebarBtn.addEventListener("click", () => {
    adminSidebar.classList.toggle("open");
  });
}

document.querySelectorAll(".side-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isAdminAuthenticated) return;
    document.querySelectorAll(".side-link").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    const target = document.getElementById(`tab-${btn.dataset.tab}`);
    if (target) target.classList.add("active");
    if (mobilePageTitle) mobilePageTitle.textContent = btn.querySelector("span").textContent;
    if (adminSidebar) adminSidebar.classList.remove("open");
  });
});

const enableSoundBtn = document.getElementById("enableSoundBtn");
if (enableSoundBtn) {
  enableSoundBtn.addEventListener("click", () => {
    playOrderBell();
    enableSoundBtn.textContent = "صوت التنبيهات مفعل ✓";
    showAdminToast("تم اختبار صوت الجرس بنجاح");
  });
}

const storeOpenToggle = document.getElementById("storeOpenToggle");
const storeOpenLabel = document.getElementById("storeOpenLabel");
if (storeOpenToggle) {
  storeOpenToggle.addEventListener("change", () => {
    if (!isAdminAuthenticated) return;
    const isOpen = storeOpenToggle.checked;
    storeOpenLabel.textContent = isOpen ? "المطعم مفتوح الآن" : "المطعم مغلق حالياً";
    db.ref("restaurantInfo/isOpen").set(isOpen);
    showAdminToast(isOpen ? "تم فتح استقبال الطلبات" : "تم إغلاق استقبال الطلبات");
  });
}

// ==========================================
// تحديث المعاينة الحية للـ 10 أشكال في تبويب التصميم
// ==========================================
function updateLiveDesignPreview() {
  const layoutEl = document.querySelector('input[name="designLayout"]:checked');
  const layout = layoutEl ? layoutEl.value : "luxury";
  const primary = document.getElementById("designPrimaryColor").value || "#D49638";
  const theme = document.getElementById("designThemeMode").value || "dark";
  const font = document.getElementById("designFontFamily").value || "Cairo";
  const radius = document.getElementById("designBorderRadius").value || "20px";
  const scale = Number(document.getElementById("designFontScale").value || 1);
  const showIncludes = document.getElementById("designShowIncludes").checked;
  const showBadges = document.getElementById("designShowBadges").checked;

  const stage = document.getElementById("liveDesignPreviewBox");
  const card = document.getElementById("previewSampleCard");
  const badge = document.getElementById("previewBadge");
  const inc = document.getElementById("previewIncludes");
  const price = document.getElementById("previewPrice");
  const addBtn = document.getElementById("previewAddBtn");

  if (!stage || !card) return;

  stage.classList.toggle("light-mode", theme === "light");
  card.className = `preview-sample-card layout-${layout}`;
  card.style.setProperty("--preview-accent", primary);
  card.style.borderRadius = layout === "pill" ? "34px" : radius;
  card.style.fontFamily = `'${font}', sans-serif`;
  card.style.fontSize = `${scale * 16}px`;

  if (badge) {
    badge.style.display = showBadges ? "inline-block" : "none";
    badge.style.background = primary;
  }
  if (inc) {
    inc.style.display = showIncludes ? "block" : "none";
    inc.style.color = primary;
  }
  if (price) price.style.color = primary;
  if (addBtn) addBtn.style.background = primary;
}

["designPrimaryColor", "designThemeMode", "designFontFamily", "designBorderRadius", "designFontScale", "designShowIncludes", "designShowBadges", "designShowFeatured", "designShowSearch"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", updateLiveDesignPreview);
    el.addEventListener("change", updateLiveDesignPreview);
  }
});

document.querySelectorAll('input[name="designLayout"]').forEach((r) => {
  r.addEventListener("change", updateLiveDesignPreview);
});

window.setDesignColor = (hex) => {
  document.getElementById("designPrimaryColor").value = hex;
  updateLiveDesignPreview();
};

function populateSettingsAndDesign() {
  if (!isAdminAuthenticated) return;
  document.getElementById("adminRestTitle").textContent = restaurantInfo.name || "قصر المشويات";
  if (restaurantInfo.logo) {
    document.getElementById("adminHeaderLogo").src = restaurantInfo.logo.startsWith("./")
      ? `../${restaurantInfo.logo.slice(2)}`
      : restaurantInfo.logo;
  }

  const isOpen = restaurantInfo.isOpen !== false;
  if (storeOpenToggle) storeOpenToggle.checked = isOpen;
  if (storeOpenLabel) storeOpenLabel.textContent = isOpen ? "المطعم مفتوح الآن" : "المطعم مغلق حالياً";

  document.getElementById("setRestName").value = restaurantInfo.name || "";
  document.getElementById("setTagline").value = restaurantInfo.tagline || "";
  document.getElementById("setHotline").value = restaurantInfo.hotline || "";
  document.getElementById("setWhatsapp").value = restaurantInfo.whatsapp || "";
  document.getElementById("setHours").value = restaurantInfo.workingHours || "";
  document.getElementById("setAddress").value = restaurantInfo.address || "";
  document.getElementById("setMapUrl").value = restaurantInfo.mapUrl || "";
  document.getElementById("setAbout").value = restaurantInfo.about || "";
  document.getElementById("setLogoUrl").value = restaurantInfo.logo || "./logo.svg";
  document.getElementById("setCoverUrl").value = restaurantInfo.coverImg || "";

  document.getElementById("setVatEnabled").checked = restaurantInfo.vatEnabled !== false;
  document.getElementById("setVatRate").value = restaurantInfo.vatRate ?? 14;
  document.getElementById("setDeliveryFee").value = restaurantInfo.deliveryFee ?? 25;
  document.getElementById("setPrepTime").value = restaurantInfo.prepTimeMinutes ?? 20;
  document.getElementById("setPromoCode").value = restaurantInfo.promoCode || "";
  document.getElementById("setPromoDiscount").value = restaurantInfo.promoDiscount ?? 30;

  const userField = document.getElementById("setAdminUsername");
  if (userField) userField.value = storedAdminAuth.username || DEFAULT_ADMIN_USER;
  const pinField = document.getElementById("setAdminPin");
  if (pinField) pinField.value = "";

  document.getElementById("totalTablesInput").value = restaurantInfo.totalTables || 16;

  const d = { ...DEFAULT_RESTAURANT_INFO.design, ...(restaurantInfo.design || {}) };
  const layoutRadio = document.querySelector(`input[name="designLayout"][value="${d.layout || "luxury"}"]`);
  if (layoutRadio) layoutRadio.checked = true;
  document.getElementById("designPrimaryColor").value = d.primaryColor || "#D49638";
  document.getElementById("designThemeMode").value = d.themeMode || "auto";
  document.getElementById("designFontFamily").value = d.fontFamily || "Cairo";
  document.getElementById("designBorderRadius").value = d.borderRadius || "20px";
  document.getElementById("designFontScale").value = String(d.fontScale || "1");
  document.getElementById("designShowIncludes").checked = d.showIncludes !== false;
  document.getElementById("designShowFeatured").checked = d.showFeatured !== false;
  document.getElementById("designShowBadges").checked = d.showBadges !== false;
  document.getElementById("designShowSearch").checked = d.showSearch !== false;
  updateLiveDesignPreview();
}

document.getElementById("resetDesignDefaultBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  const def = {
    layout: "luxury",
    primaryColor: "#D49638",
    themeMode: "auto",
    fontFamily: "Cairo",
    borderRadius: "20px",
    fontScale: 1,
    showIncludes: true,
    showFeatured: true,
    showBadges: true,
    showSearch: true
  };
  db.ref("restaurantInfo/design")
    .set(def)
    .then(() => showAdminToast("تمت استعادة التصميم الافتراضي"));
});

document.getElementById("saveDesignBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  const selectedLayout = document.querySelector('input[name="designLayout"]:checked');
  const designPayload = {
    layout: selectedLayout ? selectedLayout.value : "luxury",
    primaryColor: document.getElementById("designPrimaryColor").value,
    themeMode: document.getElementById("designThemeMode").value,
    fontFamily: document.getElementById("designFontFamily").value,
    borderRadius: document.getElementById("designBorderRadius").value,
    fontScale: Number(document.getElementById("designFontScale").value || 1),
    showIncludes: document.getElementById("designShowIncludes").checked,
    showFeatured: document.getElementById("designShowFeatured").checked,
    showBadges: document.getElementById("designShowBadges").checked,
    showSearch: document.getElementById("designShowSearch").checked
  };
  db.ref("restaurantInfo/design")
    .set(designPayload)
    .then(() => showAdminToast("تم حفظ ونشر تصميم المنيو بنجاح"));
});

function handleImageFileUpload(fileInputId, targetUrlInputId, previewImgId) {
  const input = document.getElementById(fileInputId);
  if (!input) return;
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 450;
        const scale = img.width > maxW ? maxW / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.68);
        document.getElementById(targetUrlInputId).value = compressed;
        if (previewImgId) {
          const prev = document.getElementById(previewImgId);
          prev.src = compressed;
          prev.style.display = "block";
        }
        showAdminToast("تم ضغط وتجهيز الصورة بنجاح");
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

handleImageFileUpload("uploadLogoFile", "setLogoUrl");
handleImageFileUpload("uploadCoverFile", "setCoverUrl");
handleImageFileUpload("uploadItemImgFile", "itemImgInput", "itemImgPreview");

document.getElementById("settingsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isAdminAuthenticated) return;

  const userField = document.getElementById("setAdminUsername");
  const updatedUser = userField ? userField.value.replace(/[^0-9]/g, "").trim() : storedAdminAuth.username;
  if (!/^01[0125][0-9]{8}$/.test(updatedUser)) {
    alert("يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقم");
    return;
  }

  const newPin = document.getElementById("setAdminPin").value.trim();
  let updatedPassHash = storedAdminAuth.passHash;

  if (newPin) {
    if (newPin.length < 6) {
      alert("يجب أن تتكون كلمة المرور الجديدة من 6 خانات على الأقل");
      return;
    }
    updatedPassHash = await sha256Hex(newPin);
  }

  await db.ref("adminAuth").set({
    username: updatedUser,
    passHash: updatedPassHash
  });
  const newSig = await sha256Hex(`${updatedUser}:${updatedPassHash}`);
  sessionStorage.setItem("admin_session_sig", newSig);

  const updated = {
    ...restaurantInfo,
    name: document.getElementById("setRestName").value.trim(),
    tagline: document.getElementById("setTagline").value.trim(),
    hotline: document.getElementById("setHotline").value.trim(),
    whatsapp: document.getElementById("setWhatsapp").value.trim(),
    workingHours: document.getElementById("setHours").value.trim(),
    address: document.getElementById("setAddress").value.trim(),
    mapUrl: document.getElementById("setMapUrl").value.trim(),
    about: document.getElementById("setAbout").value.trim(),
    logo: document.getElementById("setLogoUrl").value.trim() || "./logo.svg",
    coverImg: document.getElementById("setCoverUrl").value.trim(),
    vatEnabled: document.getElementById("setVatEnabled").checked,
    vatRate: Number(document.getElementById("setVatRate").value || 0),
    deliveryFee: Number(document.getElementById("setDeliveryFee").value || 0),
    prepTimeMinutes: Number(document.getElementById("setPrepTime").value || 20),
    promoCode: document.getElementById("setPromoCode").value.trim(),
    promoDiscount: Number(document.getElementById("setPromoDiscount").value || 0)
  };
  delete updated.adminPin;

  db.ref("restaurantInfo")
    .set(updated)
    .then(() => showAdminToast("تم حفظ الإعدادات وبيانات الدخول بنجاح"));
});

// ==========================================
// 1. إدارة الطلبات المباشرة
// ==========================================
document.querySelectorAll(".orders-subfilters .filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".orders-subfilters .filter-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentOrderFilter = chip.dataset.filter;
    renderOrders();
  });
});

function getStatusLabel(status) {
  const map = {
    pending: "طلب جديد",
    preparing: "قيد التجهيز",
    delivering: "مع الطيار",
    completed: "تم التحصيل"
  };
  return map[status] || status;
}

function renderOrders() {
  if (!isAdminAuthenticated) return;
  const grid = document.getElementById("ordersGrid");
  const activeCount = allOrders.filter((o) => o.status !== "completed").length;
  document.getElementById("activeOrdersCount").textContent = activeCount;

  const filtered = allOrders
    .filter((o) => {
      if (currentOrderFilter === "active") return o.status !== "completed";
      if (currentOrderFilter === "dinein") return o.orderType === "dinein" && o.status !== "completed";
      if (currentOrderFilter === "delivery") return o.orderType === "delivery" && o.status !== "completed";
      if (currentOrderFilter === "completed") return o.status === "completed";
      return true;
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-box">لا توجد طلبات في هذا القسم حالياً</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((ord) => {
      const timeStr = new Date(ord.createdAt || Date.now()).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit"
      });
      const typeTag =
        ord.orderType === "dinein"
          ? `<span class="tag-pill dinein">صالة — ترابيزة ${ord.tableNumber}</span>`
          : `<span class="tag-pill delivery">توصيل دليفري</span>`;

      const itemsHtml = (ord.items || [])
        .map((i) => `<li><span>${i.name} × ${i.qty}</span><strong>${i.total} ج.م</strong></li>`)
        .join("");

      return `
        <div class="order-card status-${ord.status}">
          <div class="order-card-head">
            <div>
              <strong>#${ord.orderNumber}</strong>
              ${typeTag}
            </div>
            <span class="status-pill st-${ord.status}">${getStatusLabel(ord.status)}</span>
          </div>

          <div class="order-cust-info">
            <p><strong>العميل:</strong> ${ord.customerName} (${ord.customerPhone || "—"})</p>
            <p><strong>العنوان / المكان:</strong> ${ord.address}</p>
            ${ord.notes ? `<p style="color:#d97706;"><strong>ملاحظات:</strong> ${ord.notes}</p>` : ""}
            <small style="color:#64748b;">وقت الطلب: ${timeStr}</small>
          </div>

          <ul class="order-items-ul">${itemsHtml}</ul>

          <div class="order-total-bar">
            <span>الإجمالي النهائي:</span>
            <strong>${ord.grandTotal} ج.م</strong>
          </div>

          <div class="order-actions-row">
            ${
              ord.status === "pending"
                ? `<button type="button" class="btn-act blue" onclick="updateOrderStatus('${ord.orderId}', 'preparing')">بدء التجهيز</button>`
                : ""
            }
            ${
              ord.status === "preparing" && ord.orderType === "delivery"
                ? `<button type="button" class="btn-act purple" onclick="updateOrderStatus('${ord.orderId}', 'delivering')">خرج مع الطيار</button>`
                : ""
            }
            ${
              ord.orderType === "dinein" && ord.status !== "completed"
                ? `<button type="button" class="btn-act purple" onclick="openTableTabModal(${ord.tableNumber})">+ إضافة أصناف</button>`
                : ""
            }
            ${
              ord.status !== "completed"
                ? `<button type="button" class="btn-act green" onclick="collectAndPrintOrder('${ord.orderId}')">تم التحصيل وطباعة الريسيت</button>`
                : ""
            }
            <button type="button" class="btn-act gray" onclick="printOrderById('${ord.orderId}')">طباعة فاتورة</button>
          </div>
        </div>
      `;
    })
    .join("");
}

window.updateOrderStatus = (orderId, newStatus) => {
  if (!isAdminAuthenticated) return;
  db.ref(`orders/${orderId}/status`)
    .set(newStatus)
    .then(() => showAdminToast("تم تحديث حالة الطلب"));
};

window.collectAndPrintOrder = (orderId) => {
  if (!isAdminAuthenticated) return;
  const ord = allOrders.find((o) => o.orderId === orderId);
  if (!ord) return;
  db.ref(`orders/${orderId}/status`).set("completed");
  showAdminToast("تم التحصيل وإغلاق الفاتورة");
  printThermalReceiptAdmin({ ...ord, status: "completed" });
};

window.printOrderById = (orderId) => {
  if (!isAdminAuthenticated) return;
  const ord = allOrders.find((o) => o.orderId === orderId);
  if (ord) printThermalReceiptAdmin(ord);
};

window.dismissWaiterCall = (callId) => {
  if (!isAdminAuthenticated) return;
  db.ref(`orders/${callId}`).remove();
};

function renderWaiterCallsBar(calls) {
  if (!isAdminAuthenticated) return;
  const container = document.getElementById("waiterCallsContainer");
  if (!container) return;
  if (calls.length === 0) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = calls
    .map(
      (c) => `
      <div class="waiter-alert-item">
        <span>🔔 نداء كابتن من <strong>ترابيزة رقم ${c.tableNumber}</strong></span>
        <button type="button" onclick="dismissWaiterCall('${c.orderId}')">تم الاستجابة ✓</button>
      </div>
    `
    )
    .join("");
}

// ==========================================
// 2. الترابيزات + البحث الفوري للإضافة + تعديل الكميات
// ==========================================
document.getElementById("saveTablesCountBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  const count = Math.max(1, Math.min(100, Number(document.getElementById("totalTablesInput").value || 16)));
  db.ref("restaurantInfo/totalTables")
    .set(count)
    .then(() => showAdminToast(`تم تحديث عدد الترابيزات إلى ${count}`));
});

function getBaseMenuUrl() {
  const url = new URL("../menu.html", window.location.href);
  return url.href;
}

function renderTablesGrid() {
  if (!isAdminAuthenticated) return;
  const grid = document.getElementById("tablesGrid");
  const total = Number(restaurantInfo.totalTables || 16);
  const openDineInOrders = allOrders.filter((o) => o.orderType === "dinein" && o.status !== "completed");

  let html = "";
  for (let t = 1; t <= total; t++) {
    const activeTabOrders = openDineInOrders.filter((o) => Number(o.tableNumber) === t);
    const isBusy = activeTabOrders.length > 0;
    const totalTabAmount = activeTabOrders.reduce((s, o) => s + Number(o.grandTotal || 0), 0);

    html += `
      <div class="table-box ${isBusy ? "busy" : "free"}">
        <div class="table-box-top">
          <strong>ترابيزة ${t}</strong>
          <span class="table-state-dot">${isBusy ? `مفتوح (${totalTabAmount} ج.م)` : "متاحة"}</span>
        </div>
        <div class="qr-mini-holder" id="qr-holder-${t}"></div>
        <div class="table-box-btns">
          <button type="button" class="btn-act ${isBusy ? "green" : "blue"}" onclick="openTableTabModal(${t})">
            ${isBusy ? "الحساب / إضافة" : "+ فتح حساب"}
          </button>
          <button type="button" class="btn-act gray" onclick="printTablesQr([${t}])">QR</button>
        </div>
      </div>
    `;
  }
  grid.innerHTML = html;

  const baseUrl = getBaseMenuUrl();
  for (let t = 1; t <= total; t++) {
    const holder = document.getElementById(`qr-holder-${t}`);
    if (holder && typeof QRCode !== "undefined") {
      new QRCode(holder, {
        text: `${baseUrl}?table=${t}`,
        width: 96,
        height: 96,
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }
}

let activeModalTableNum = null;

window.renderCashierSearchResults = (tableNum) => {
  const box = document.getElementById("cashierQuickResults");
  const searchEl = document.getElementById("cashierQuickSearch");
  if (!box || !searchEl) return;
  const q = searchEl.value.trim().toLowerCase();
  const matches = menuItems
    .filter((m) => m.available !== false && (!q || m.name.toLowerCase().includes(q) || (m.category && m.category.toLowerCase().includes(q))))
    .slice(0, 12);

  if (matches.length === 0) {
    box.innerHTML = `<div style="padding:10px; text-align:center; font-size:0.82rem; color:#64748b;">لا توجد أصناف مطابقة</div>`;
    return;
  }

  box.innerHTML = matches
    .map(
      (m) => `
      <div class="cashier-result-row">
        <div>
          <strong>${m.name}</strong>
          <span style="color:#b45309; font-weight:800; margin-right:6px;">(${m.price} ج.م)</span>
        </div>
        <button type="button" onclick="quickAddMenuItemToTable(${tableNum}, ${m.id})">+ إضافة</button>
      </div>
    `
    )
    .join("");
};

window.openTableTabModal = (tableNum) => {
  if (!isAdminAuthenticated) return;
  activeModalTableNum = Number(tableNum);
  const orders = allOrders.filter(
    (o) => o.orderType === "dinein" && o.status !== "completed" && Number(o.tableNumber) === activeModalTableNum
  );
  document.getElementById("tableTabTitle").textContent = `حساب ترابيزة رقم ${activeModalTableNum}`;

  const allItems = [];
  orders.forEach((o) => {
    (o.items || []).forEach((it, idx) => {
      allItems.push({ ...it, orderId: o.orderId, itemIndex: idx });
    });
  });

  const subTotal = allItems.reduce((s, i) => s + Number(i.total || i.price * i.qty), 0);
  const vatEnabled = restaurantInfo.vatEnabled !== false;
  const vatRate = vatEnabled ? Number(restaurantInfo.vatRate || 14) : 0;
  const vatAmount = Math.round((subTotal * vatRate) / 100);
  const grand = orders.length > 0 ? orders.reduce((s, o) => s + Number(o.grandTotal || 0), 0) : 0;

  document.getElementById("tableTabContent").innerHTML = `
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:14px; padding:12px; margin-bottom:14px;">
      <strong style="display:block; font-size:0.86rem; margin-bottom:8px; color:#0f172a;">+ إضافة سريع لحساب الترابيزة (بحث فوري في المنيو):</strong>
      
      <input
        type="text"
        id="cashierQuickSearch"
        placeholder="اكتب اسم الصنف للبحث السريع (مثال: كفتة، فرخة، طاجن...)"
        oninput="renderCashierSearchResults(${activeModalTableNum})"
        style="width:100%; padding:9px 12px; border-radius:9px; border:1px solid #cbd5e1; font-size:0.84rem; background:#fff;"
      />
      <div id="cashierQuickResults" class="cashier-quick-results"></div>

      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px; padding-top:10px; border-top:1px dashed #cbd5e1;">
        <input type="text" id="cashierCustomName" placeholder="إضافة خارجية (عيش، سلطة، مشروب...)" style="flex:1; min-width:150px; padding:8px 10px; border-radius:9px; border:1px solid #cbd5e1; font-size:0.82rem; background:#fff;" />
        <input type="number" id="cashierCustomPrice" placeholder="السعر" min="1" style="width:74px; padding:8px; border-radius:9px; border:1px solid #cbd5e1; text-align:center; background:#fff;" />
        <button type="button" class="btn-act purple" style="white-space:nowrap;" onclick="addCustomExtraToTable(${activeModalTableNum})">+ إضافة</button>
      </div>
    </div>

    <div style="max-height:200px; overflow-y:auto; margin-bottom:10px;">
      ${
        allItems.length === 0
          ? `<p style="text-align:center; color:#64748b; padding:14px;">لا توجد أصناف مسجلة على هذه الترابيزة بعد</p>`
          : allItems
              .map(
                (it) => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:7px 4px; border-bottom:1px dashed #e2e8f0; font-size:0.86rem;">
              <div style="flex:1;">
                <strong>${it.name}</strong>
                <div style="font-size:0.75rem; color:#64748b;">${it.price} ج.م × ${it.qty} = <strong>${it.total} ج.م</strong></div>
              </div>
              <div class="tab-item-controls">
                <button type="button" class="qty-mini-btn" onclick="changeTableItemQty('${it.orderId}', ${it.itemIndex}, 1, ${activeModalTableNum})">+</button>
                <span style="min-width:18px; text-align:center; font-weight:800;">${it.qty}</span>
                <button type="button" class="qty-mini-btn" onclick="changeTableItemQty('${it.orderId}', ${it.itemIndex}, -1, ${activeModalTableNum})">-</button>
                <button type="button" class="qty-mini-btn del" onclick="changeTableItemQty('${it.orderId}', ${it.itemIndex}, -999, ${activeModalTableNum})">✕</button>
              </div>
            </div>
          `
              )
              .join("")
      }
    </div>

    ${
      orders.length > 0
        ? `
      <div style="background:#fffbeb; border:1px solid #fde68a; padding:12px; border-radius:12px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-size:0.86rem;"><span>الصافي:</span><span>${subTotal} ج.م</span></div>
        ${vatAmount > 0 ? `<div style="display:flex; justify-content:space-between; font-size:0.86rem;"><span>الضريبة (${vatRate}%):</span><span>${vatAmount} ج.م</span></div>` : ""}
        <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:900; color:#b45309; margin-top:4px;">
          <span>الإجمالي المطلوب تحصيله:</span>
          <span>${grand} ج.م</span>
        </div>
      </div>
      <button type="button" class="btn-primary-full" onclick="closeTableAndPrintReceipt(${activeModalTableNum})">
        تم التحصيل والدفع وطباعة الريسيت فوراً
      </button>
    `
        : ""
    }
  `;

  renderCashierSearchResults(activeModalTableNum);
  document.getElementById("tableTabModal").classList.add("active");
};

window.changeTableItemQty = (orderId, itemIndex, delta, tableNum) => {
  if (!isAdminAuthenticated) return;
  const order = allOrders.find((o) => o.orderId === orderId);
  if (!order || !order.items) return;

  const updatedItems = [...order.items];
  const target = updatedItems[itemIndex];
  if (!target) return;

  const nextQty = target.qty + delta;
  if (nextQty <= 0) {
    updatedItems.splice(itemIndex, 1);
  } else {
    updatedItems[itemIndex] = {
      ...target,
      qty: nextQty,
      total: nextQty * Number(target.price)
    };
  }

  if (updatedItems.length === 0) {
    db.ref(`orders/${orderId}`)
      .remove()
      .then(() => setTimeout(() => openTableTabModal(tableNum), 180));
    return;
  }

  const vatEnabled = restaurantInfo.vatEnabled !== false;
  const vatRate = vatEnabled ? Number(restaurantInfo.vatRate || 14) : 0;
  const subTotal = updatedItems.reduce((s, i) => s + Number(i.total), 0);
  const vatAmount = Math.round((subTotal * vatRate) / 100);
  const discount = Number(order.discount || 0);
  const grandTotal = Math.max(0, subTotal + vatAmount - discount);

  db.ref(`orders/${orderId}`)
    .update({
      items: updatedItems,
      subTotal,
      vatRate,
      vatAmount,
      grandTotal
    })
    .then(() => setTimeout(() => openTableTabModal(tableNum), 180));
};

function appendItemToTableOrder(tableNum, newItemObj) {
  if (!isAdminAuthenticated) return;
  const openOrders = allOrders.filter(
    (o) => o.orderType === "dinein" && o.status !== "completed" && Number(o.tableNumber) === Number(tableNum)
  );
  const vatEnabled = restaurantInfo.vatEnabled !== false;
  const vatRate = vatEnabled ? Number(restaurantInfo.vatRate || 14) : 0;

  if (openOrders.length > 0) {
    const targetOrder = openOrders[0];
    const updatedItems = [...(targetOrder.items || [])];
    const existingIdx = updatedItems.findIndex((i) => i.name === newItemObj.name && Number(i.price) === Number(newItemObj.price));
    if (existingIdx > -1) {
      updatedItems[existingIdx].qty += newItemObj.qty;
      updatedItems[existingIdx].total = updatedItems[existingIdx].qty * updatedItems[existingIdx].price;
    } else {
      updatedItems.push(newItemObj);
    }

    const subTotal = updatedItems.reduce((s, i) => s + Number(i.total), 0);
    const vatAmount = Math.round((subTotal * vatRate) / 100);
    const discount = Number(targetOrder.discount || 0);
    const grandTotal = Math.max(0, subTotal + vatAmount - discount);

    db.ref(`orders/${targetOrder.orderId}`)
      .update({
        items: updatedItems,
        subTotal,
        vatRate,
        vatAmount,
        grandTotal
      })
      .then(() => {
        showAdminToast(`تمت إضافة "${newItemObj.name}" لحساب ترابيزة ${tableNum}`);
        setTimeout(() => openTableTabModal(tableNum), 180);
      });
  } else {
    const orderId = `ord_${Date.now()}`;
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const subTotal = newItemObj.total;
    const vatAmount = Math.round((subTotal * vatRate) / 100);
    const grandTotal = subTotal + vatAmount;
    const now = Date.now();

    const newOrder = {
      orderId,
      orderNumber,
      customerName: `صالة - ترابيزة ${tableNum}`,
      customerPhone: "",
      orderType: "dinein",
      tableNumber: Number(tableNum),
      address: `صالة - ترابيزة ${tableNum}`,
      notes: "إضافة من الكاشير",
      items: [newItemObj],
      subTotal,
      vatRate,
      vatAmount,
      deliveryFee: 0,
      discount: 0,
      grandTotal,
      status: "preparing",
      createdAt: now,
      estimatedReadyAt: now + Number(restaurantInfo.prepTimeMinutes || 20) * 60000
    };

    db.ref(`orders/${orderId}`)
      .set(newOrder)
      .then(() => {
        showAdminToast(`تم فتح حساب وإضافة "${newItemObj.name}" لترابيزة ${tableNum}`);
        setTimeout(() => openTableTabModal(tableNum), 180);
      });
  }
}

window.quickAddMenuItemToTable = (tableNum, itemId) => {
  const item = menuItems.find((m) => String(m.id) === String(itemId));
  if (!item) return;
  appendItemToTableOrder(tableNum, {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    qty: 1,
    total: Number(item.price)
  });
};

window.addCustomExtraToTable = (tableNum) => {
  const name = document.getElementById("cashierCustomName").value.trim();
  const price = Number(document.getElementById("cashierCustomPrice").value || 0);
  if (!name || price <= 0) {
    alert("اكتب اسم الإضافة وسعرها بشكل صحيح");
    return;
  }
  appendItemToTableOrder(tableNum, {
    id: Date.now(),
    name,
    price,
    qty: 1,
    total: price
  });
};

window.closeTableAndPrintReceipt = (tableNum) => {
  if (!isAdminAuthenticated) return;
  const orders = allOrders.filter(
    (o) => o.orderType === "dinein" && o.status !== "completed" && Number(o.tableNumber) === Number(tableNum)
  );
  if (orders.length === 0) return;

  const mergedItems = [];
  orders.forEach((o) => {
    (o.items || []).forEach((it) => mergedItems.push(it));
  });
  const mergedReceipt = {
    orderNumber: orders[0].orderNumber,
    orderType: "dinein",
    tableNumber: tableNum,
    customerName: orders[0].customerName || `ترابيزة ${tableNum}`,
    customerPhone: orders[0].customerPhone || "",
    createdAt: orders[0].createdAt,
    items: mergedItems,
    subTotal: orders.reduce((s, o) => s + Number(o.subTotal || 0), 0),
    vatRate: orders[0].vatRate || 14,
    vatAmount: orders.reduce((s, o) => s + Number(o.vatAmount || 0), 0),
    deliveryFee: 0,
    discount: orders.reduce((s, o) => s + Number(o.discount || 0), 0),
    grandTotal: orders.reduce((s, o) => s + Number(o.grandTotal || 0), 0)
  };

  orders.forEach((o) => db.ref(`orders/${o.orderId}/status`).set("completed"));
  document.getElementById("tableTabModal").classList.remove("active");
  showAdminToast(`تم تحصيل وإغلاق حساب ترابيزة ${tableNum}`);
  printThermalReceiptAdmin(mergedReceipt);
};

document.getElementById("closeTableTabBtn").addEventListener("click", () => {
  document.getElementById("tableTabModal").classList.remove("active");
});

function parseTableNumbers(raw) {
  const nums = new Set();
  raw.split(",").forEach((part) => {
    const clean = part.trim();
    if (clean.includes("-")) {
      const [start, end] = clean.split("-").map(Number);
      if (start > 0 && end >= start) {
        for (let i = start; i <= Math.min(end, 100); i++) nums.add(i);
      }
    } else {
      const n = Number(clean);
      if (n > 0 && n <= 100) nums.add(n);
    }
  });
  return Array.from(nums).sort((a, b) => a - b);
}

document.getElementById("printCustomQrBtn").addEventListener("click", () => {
  const raw = document.getElementById("qrNumbersInput").value.trim();
  const list = raw ? parseTableNumbers(raw) : Array.from({ length: Number(restaurantInfo.totalTables || 16) }, (_, i) => i + 1);
  if (list.length === 0) {
    alert("أدخل أرقام ترابيزات صحيحة مثل: 1,4,7 أو 1-8");
    return;
  }
  printTablesQr(list);
});

window.printTablesQr = (tableNumbers) => {
  if (!isAdminAuthenticated) return;
  const baseUrl = getBaseMenuUrl();
  const win = window.open("", "_blank", "width=850,height=700");
  if (!win) {
    alert("اسمح بفتح النوافذ المنبثقة لطباعة أكواد QR");
    return;
  }
  const cardsHtml = tableNumbers
    .map(
      (num) => `
      <div class="qr-card">
        <h3>${restaurantInfo.name || "قصر المشويات"}</h3>
        <div class="table-badge">ترابيزة رقم ${num}</div>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`${baseUrl}?table=${num}`)}" alt="QR ${num}" />
        <p>امسح الكود بكاميرا الموبايل لتصفح المنيو والطلب مباشرة</p>
      </div>
    `
    )
    .join("");

  win.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>طباعة أكواد QR الترابيزات</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; padding: 20px; background: #fff; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .qr-card { border: 2px solid #1e293b; border-radius: 18px; padding: 18px; text-align: center; page-break-inside: avoid; }
        .qr-card h3 { margin: 0 0 8px; font-size: 1.1rem; }
        .table-badge { background: #D49638; color: #111; font-weight: 900; padding: 5px 14px; border-radius: 99px; display: inline-block; margin-bottom: 12px; }
        .qr-card img { width: 170px; height: 170px; display: block; margin: 0 auto 10px; }
        .qr-card p { font-size: 0.78rem; color: #475569; margin: 0; }
      </style>
    </head>
    <body>
      <div class="grid">${cardsHtml}</div>
      <script>window.onload = () => setTimeout(() => window.print(), 500);<\/script>
    </body>
    </html>
  `);
  win.document.close();
};

// ==========================================
// 3. إدارة قائمة الطعام (Menu CRUD)
// ==========================================
document.getElementById("adminMenuSearch").addEventListener("input", renderAdminMenuTable);

function renderAdminMenuTable() {
  if (!isAdminAuthenticated) return;
  const q = document.getElementById("adminMenuSearch").value.trim().toLowerCase();
  document.getElementById("menuItemsCountBadge").textContent = menuItems.length;
  const tbody = document.getElementById("adminMenuTbody");

  const filtered = menuItems.filter(
    (i) => !q || i.name.toLowerCase().includes(q) || (i.category && i.category.toLowerCase().includes(q))
  );

  tbody.innerHTML = filtered
    .map(
      (item) => `
      <tr>
        <td><img src="${item.img || "https://images.unsplash.com/photo-1544025162-d76694265947?w=200"}" style="width:54px; height:54px; border-radius:10px; object-fit:cover;" /></td>
        <td>
          <strong>${item.name}</strong>
          <div style="font-size:0.78rem; color:#64748b;">${item.desc || ""}</div>
        </td>
        <td><span class="cat-pill-sm">${item.category}</span></td>
        <td><strong>${item.price} ج.م</strong></td>
        <td>
          <button type="button" class="avail-toggle ${item.available !== false ? "on" : "off"}" onclick="toggleItemAvailability(${item.id})">
            ${item.available !== false ? "متاح" : "نفد"}
          </button>
        </td>
        <td>
          <button type="button" class="btn-act blue" onclick="openEditItemModal(${item.id})">تعديل</button>
          <button type="button" class="btn-act red" onclick="deleteMenuItem(${item.id})">حذف</button>
        </td>
      </tr>
    `
    )
    .join("");
}

window.toggleItemAvailability = (id) => {
  if (!isAdminAuthenticated) return;
  const updated = menuItems.map((i) => (Number(i.id) === Number(id) ? { ...i, available: i.available === false } : i));
  db.ref("menuItems").set(updated);
};

window.deleteMenuItem = (id) => {
  if (!isAdminAuthenticated) return;
  if (!confirm("هل أنت متأكد من حذف هذا الصنف؟")) return;
  const updated = menuItems.filter((i) => Number(i.id) !== Number(id));
  db.ref("menuItems")
    .set(updated)
    .then(() => showAdminToast("تم حذف الصنف"));
};

const itemFormModal = document.getElementById("itemFormModal");
document.getElementById("openAddItemModalBtn").addEventListener("click", () => {
  document.getElementById("itemModalTitle").textContent = "إضافة صنف جديد";
  document.getElementById("menuItemForm").reset();
  document.getElementById("editItemId").value = "";
  document.getElementById("itemImgPreview").style.display = "none";
  itemFormModal.classList.add("active");
});

document.getElementById("closeItemModalBtn").addEventListener("click", () => itemFormModal.classList.remove("active"));

window.openEditItemModal = (id) => {
  if (!isAdminAuthenticated) return;
  const item = menuItems.find((i) => Number(i.id) === Number(id));
  if (!item) return;
  document.getElementById("itemModalTitle").textContent = "تعديل الصنف";
  document.getElementById("editItemId").value = item.id;
  document.getElementById("itemNameInput").value = item.name;
  document.getElementById("itemCatInput").value = item.category;
  document.getElementById("itemPriceInput").value = item.price;
  document.getElementById("itemBadgeInput").value = item.badge || "";
  document.getElementById("itemDescInput").value = item.desc || "";
  document.getElementById("itemIncludesInput").value = item.includes || "";
  document.getElementById("itemImgInput").value = item.img || "";
  document.getElementById("itemAvailInput").checked = item.available !== false;
  const prev = document.getElementById("itemImgPreview");
  if (item.img) {
    prev.src = item.img;
    prev.style.display = "block";
  } else {
    prev.style.display = "none";
  }
  itemFormModal.classList.add("active");
};

document.getElementById("menuItemForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isAdminAuthenticated) return;
  const editId = document.getElementById("editItemId").value;
  const payload = {
    id: editId ? Number(editId) : Date.now(),
    name: document.getElementById("itemNameInput").value.trim(),
    category: document.getElementById("itemCatInput").value.trim(),
    price: Number(document.getElementById("itemPriceInput").value),
    badge: document.getElementById("itemBadgeInput").value.trim(),
    desc: document.getElementById("itemDescInput").value.trim(),
    includes: document.getElementById("itemIncludesInput").value.trim(),
    img: document.getElementById("itemImgInput").value.trim() || "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    available: document.getElementById("itemAvailInput").checked
  };

  let updated;
  if (editId) {
    updated = menuItems.map((i) => (Number(i.id) === Number(editId) ? payload : i));
  } else {
    updated = [payload, ...menuItems];
  }

  db.ref("menuItems")
    .set(updated)
    .then(() => {
      itemFormModal.classList.remove("active");
      showAdminToast("تم حفظ الصنف بنجاح");
    });
});

document.getElementById("seedDefaultMenuBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  if (!confirm("هل تريد استعادة قائمة الطعام الافتراضية الكاملة (72 صنف)؟")) return;
  db.ref("menuItems")
    .set(DEFAULT_MENU_ITEMS)
    .then(() => showAdminToast("تمت استعادة الـ 72 صنف بنجاح"));
});

document.getElementById("printMenuPdfBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  const win = window.open("", "_blank", "width=900,height=750");
  if (!win) return;

  const grouped = {};
  menuItems.filter((i) => i.available !== false).forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let sectionsHtml = "";
  for (const [cat, items] of Object.entries(grouped)) {
    sectionsHtml += `
      <h2 class="cat-title">${cat}</h2>
      <div class="items-grid">
        ${items
          .map(
            (i) => `
          <div class="m-card">
            <img src="${i.img || "https://images.unsplash.com/photo-1544025162-d76694265947?w=300"}" alt="${i.name}" />
            <div class="m-info">
              <div class="m-name">${i.name}</div>
              <div class="m-price">${i.price} ج.م</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>قائمة طعام ${restaurantInfo.name || "قصر المشويات"}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; padding: 20px; color: #0f172a; background: #fff; }
        .header { text-align: center; border-bottom: 3px solid #D49638; padding-bottom: 12px; margin-bottom: 18px; }
        .header h1 { margin: 0; font-size: 24px; }
        .cat-title { background: #0f172a; color: #D49638; padding: 6px 14px; border-radius: 8px; font-size: 15px; margin: 20px 0 10px; page-break-after: avoid; }
        .items-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .m-card { display: flex; gap: 10px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 7px; align-items: center; page-break-inside: avoid; }
        .m-card img { width: 58px; height: 58px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .m-name { font-weight: 900; font-size: 13px; }
        .m-price { font-weight: 900; color: #b45309; font-size: 13px; margin-top: 2px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${restaurantInfo.name || "قصر المشويات"}</h1>
        <div>الخط الساخن: ${restaurantInfo.hotline || ""}</div>
      </div>
      ${sectionsHtml}
      <script>window.onload = () => setTimeout(() => window.print(), 600);<\/script>
    </body>
    </html>
  `);
  win.document.close();
});

// ==========================================
// 4. التقارير المالية وتصدير Excel / PDF
// ==========================================
document.querySelectorAll("#tab-reports .filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#tab-reports .filter-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentReportPeriod = chip.dataset.period;
    renderReports();
  });
});

function getFilteredReportOrders() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return allOrders.filter((o) => {
    const ts = o.createdAt || 0;
    if (currentReportPeriod === "today") return ts >= startOfDay;
    if (currentReportPeriod === "week") return ts >= now.getTime() - 7 * 86400000;
    if (currentReportPeriod === "month") return ts >= new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return true;
  });
}

function renderReports() {
  if (!isAdminAuthenticated) return;
  const list = getFilteredReportOrders();
  const totalRev = list.reduce((s, o) => s + Number(o.grandTotal || 0), 0);
  const count = list.length;
  const avg = count > 0 ? Math.round(totalRev / count) : 0;

  const itemCounts = {};
  list.forEach((o) =>
    (o.items || []).forEach((i) => {
      itemCounts[i.name] = (itemCounts[i.name] || 0) + Number(i.qty || 1);
    })
  );
  const topItem = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0];

  document.getElementById("kpiRevenue").textContent = `${totalRev} ج.م`;
  document.getElementById("kpiOrdersCount").textContent = count;
  document.getElementById("kpiAvgOrder").textContent = `${avg} ج.م`;
  document.getElementById("kpiTopItem").textContent = topItem ? `${topItem[0]} (${topItem[1]})` : "—";

  document.getElementById("reportsTbody").innerHTML = list
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map(
      (o) => `
      <tr>
        <td><strong>#${o.orderNumber}</strong></td>
        <td>${o.orderType === "dinein" ? `صالة (${o.tableNumber})` : "دليفري"}</td>
        <td>${o.customerName}</td>
        <td style="font-size:0.8rem;">${(o.items || []).map((i) => `${i.name}×${i.qty}`).join("، ")}</td>
        <td><strong>${o.grandTotal} ج.م</strong></td>
        <td>${getStatusLabel(o.status)}</td>
        <td>${new Date(o.createdAt || Date.now()).toLocaleString("ar-EG")}</td>
      </tr>
    `
    )
    .join("");
}

document.getElementById("exportExcelBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  const list = getFilteredReportOrders();
  if (typeof XLSX === "undefined") {
    alert("مكتبة Excel قيد التحميل");
    return;
  }
  const rows = list.map((o) => ({
    "رقم الفاتورة": o.orderNumber,
    "النوع": o.orderType === "dinein" ? `صالة - ترابيزة ${o.tableNumber}` : "دليفري",
    "العميل": o.customerName,
    "الموبايل": o.customerPhone,
    "الأصناف": (o.items || []).map((i) => `${i.name} × ${i.qty}`).join(" | "),
    "الصافي": o.subTotal,
    "الضريبة": o.vatAmount || 0,
    "التوصيل": o.deliveryFee || 0,
    "الإجمالي النهائي": o.grandTotal,
    "الحالة": getStatusLabel(o.status),
    "التوقيت": new Date(o.createdAt || Date.now()).toLocaleString("ar-EG")
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "تقرير المبيعات");
  XLSX.writeFile(wb, `Sales_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
});

document.getElementById("exportReportPdfBtn").addEventListener("click", () => {
  if (!isAdminAuthenticated) return;
  const list = getFilteredReportOrders();
  const totalRev = list.reduce((s, o) => s + Number(o.grandTotal || 0), 0);
  const win = window.open("", "_blank", "width=900,height=750");
  if (!win) return;

  const rows = list
    .map(
      (o) => `
      <tr>
        <td>#${o.orderNumber}</td>
        <td>${o.orderType === "dinein" ? `صالة (${o.tableNumber})` : "دليفري"}</td>
        <td>${o.customerName}</td>
        <td>${(o.items || []).map((i) => `${i.name} × ${i.qty}`).join("، ")}</td>
        <td><strong>${o.grandTotal} ج.م</strong></td>
        <td>${new Date(o.createdAt || Date.now()).toLocaleDateString("ar-EG")}</td>
      </tr>
    `
    )
    .join("");

  win.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>التقرير المالي - ${restaurantInfo.name || "قصر المشويات"}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;800;900&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; padding: 24px; color: #0f172a; }
        .head { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
        .summary { display: flex; gap: 24px; background: #f8fafc; padding: 14px; border-radius: 12px; margin-bottom: 18px; font-weight: 900; border: 1px solid #cbd5e1; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: right; }
        th { background: #0f172a; color: #fff; }
      </style>
    </head>
    <body>
      <div class="head">
        <h2>التقرير المالي والمبيعات — ${restaurantInfo.name || "قصر المشويات"}</h2>
        <span>تاريخ التقرير: ${new Date().toLocaleDateString("ar-EG")}</span>
      </div>
      <div class="summary">
        <div>عدد الفواتير: ${list.length}</div>
        <div>إجمالي الإيرادات: ${totalRev} ج.م</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>النوع</th>
            <th>العميل</th>
            <th>الأصناف</th>
            <th>الإجمالي</th>
            <th>التاريخ</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <script>window.onload = () => setTimeout(() => window.print(), 500);<\/script>
    </body>
    </html>
  `);
  win.document.close();
});

// ==========================================
// 5. الربط المباشر مع Firebase Realtime Database
// ==========================================
db.ref("restaurantInfo").on("value", (snap) => {
  if (snap.exists()) {
    restaurantInfo = { ...DEFAULT_RESTAURANT_INFO, ...snap.val() };
  }
  if (isAdminAuthenticated) {
    populateSettingsAndDesign();
    renderTablesGrid();
  }
});

db.ref("menuItems").on("value", (snap) => {
  const val = snap.val();
  if (val) {
    menuItems = (Array.isArray(val) ? val : Object.values(val)).filter(Boolean);
  } else {
    menuItems = [...DEFAULT_MENU_ITEMS];
    db.ref("menuItems").set(menuItems);
  }
  if (isAdminAuthenticated) {
    renderAdminMenuTable();
  }
});

let initialOrdersLoaded = false;
let lastWaiterCount = 0;

db.ref("orders").on("value", (snap) => {
  const val = snap.val();
  const rawList = val ? Object.values(val) : [];

  const waiterCalls = rawList.filter((o) => o.orderType === "waiter_call" && o.status === "pending");
  const realOrders = rawList.filter((o) => o.orderType !== "waiter_call");

  if (initialOrdersLoaded && isAdminAuthenticated && (realOrders.length > allOrders.length || waiterCalls.length > lastWaiterCount)) {
    playOrderBell();
    showAdminToast(waiterCalls.length > lastWaiterCount ? "نداء كابتن جديد من ترابيزة!" : "وصل طلب جديد الآن!");
  }

  lastWaiterCount = waiterCalls.length;
  allOrders = realOrders;
  initialOrdersLoaded = true;

  if (isAdminAuthenticated) {
    renderWaiterCallsBar(waiterCalls);
    renderOrders();
    renderTablesGrid();
    renderReports();
  }
});