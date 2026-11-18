// HomePage/homepage.js
if (typeof db !== "undefined") {
  db.ref("restaurantInfo").on("value", (snap) => {
    if (!snap.exists()) return;
    const info = snap.val();

    if (info.name) {
      document.title = `${info.name} | المأكولات الشرقية والمشويات على الفحم`;
      const navName = document.getElementById("hpNavName");
      const footName = document.getElementById("hpFooterName");
      if (navName) navName.textContent = info.name;
      if (footName) footName.textContent = info.name;
    }

    if (info.tagline) {
      const tagEl = document.getElementById("hpTagline");
      if (tagEl) tagEl.textContent = info.tagline;
    }

    if (info.about) {
      const aboutEl = document.getElementById("hpAbout");
      if (aboutEl) aboutEl.textContent = info.about;
    }

    if (info.workingHours) {
      const hoursEl = document.getElementById("hpWorkingHours");
      if (hoursEl) hoursEl.textContent = info.workingHours;
    }

    if (info.hotline) {
      const hotBtn = document.getElementById("hpHotlineBtn");
      if (hotBtn) {
        hotBtn.textContent = `الخط الساخن: ${info.hotline}`;
        hotBtn.href = `tel:${info.hotline}`;
      }
    }

    const statusBadge = document.getElementById("hpStatusBadge");
    if (statusBadge) {
      if (info.isOpen === false) {
        statusBadge.textContent = "● مغلق حالياً";
        statusBadge.style.color = "#ef4444";
      } else {
        statusBadge.textContent = "● مفتوح الآن";
        statusBadge.style.color = "#22c55e";
      }
    }

    if (info.logo) {
      const logoEl = document.getElementById("hpNavLogo");
      if (logoEl) {
        logoEl.src = info.logo.startsWith("./") ? `../${info.logo.slice(2)}` : info.logo;
      }
    }

    if (info.coverImg && (info.coverImg.startsWith("http") || info.coverImg.startsWith("data:"))) {
      const hero = document.getElementById("hpHeroSection");
      if (hero) {
        hero.style.backgroundImage = `linear-gradient(to bottom, rgba(11, 14, 20, 0.72), rgba(11, 14, 20, 0.96)), url('${info.coverImg}')`;
      }
    }
  });

  db.ref("menuItems").on("value", (snap) => {
    const val = snap.val();
    if (!val) return;
    const items = (Array.isArray(val) ? val : Object.values(val)).filter(Boolean);
    const featured = items.filter((i) => i.available !== false && i.badge && i.badge.trim() !== "").slice(0, 3);
    const grid = document.getElementById("hpFeaturedGrid");
    if (grid && featured.length > 0) {
      grid.innerHTML = featured
        .map(
          (item) => `
          <article class="preview-card">
            <img src="${item.img || "https://images.unsplash.com/photo-1544025162-d76694265947?w=800"}" alt="${item.name}" />
            <div class="preview-card-body">
              <h3>${item.name}</h3>
              <p>${item.desc || ""}</p>
              <div class="preview-card-foot">
                <strong>${item.price} ج.م</strong>
                <a href="../menu.html">اطلب الآن</a>
              </div>
            </div>
          </article>
        `
        )
        .join("");
    }
  });
}