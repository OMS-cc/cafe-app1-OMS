(function () {
  "use strict";

  var categoryLabels = { coffee: "COFFEE", "non-coffee": "NON-COFFEE", tea: "TEA", dessert: "DESSERT" };
  var recommendationIds = ["menu-americano", "menu-strawberry-latte", "menu-basque-cheesecake"];
  var recommendationIndex = 0;
  var rotationTimer;

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function availableMenus() {
    var storedMenus = CafeUtils.storage.get(CafeData.storageKeys.menus, []);
    return (storedMenus.length ? storedMenus : CafeData.menus).filter(function (menu) {
      return menu.isAvailable && recommendationIds.indexOf(menu.id) !== -1;
    });
  }

  function updateCartCount() {
    var cart = CafeUtils.storage.get(CafeData.storageKeys.cart, []);
    document.getElementById("cart-count").textContent = cart.reduce(function (sum, item) { return sum + Number(item.quantity || 0); }, 0);
  }

  function setPrice(set) {
    return '<del>' + CafeUtils.formatPrice(set.originalPrice) + '</del><strong>' + CafeUtils.formatPrice(set.price) + '</strong>';
  }

  function renderRecommendation(menus) {
    var grid = document.getElementById("recommendation-grid");
    var dots = document.getElementById("recommendation-dots");
    if (!menus.length) {
      grid.innerHTML = '<p class="recommendation-empty">오늘의 메뉴를 준비하고 있어요.</p>';
      dots.innerHTML = "";
      return;
    }
    var menu = menus[recommendationIndex % menus.length];
    var image = escapeHtml(menu.image || "");
    grid.innerHTML = '<a class="recommendation-card is-visible" href="menus/detail.html?id=' + encodeURIComponent(menu.id) + '"><div class="recommendation-card-image" style="--recommendation-image:url(' + image + ')"><img src="' + image + '" alt="' + escapeHtml(menu.name) + ' 사진"></div><div class="recommendation-copy"><p>' + (categoryLabels[menu.categoryId] || menu.categoryId) + '</p><h3>' + escapeHtml(menu.name) + '<span>' + CafeUtils.formatPrice(menu.price) + '</span></h3></div></a>';
    dots.innerHTML = menus.map(function (item, index) {
      return '<button class="recommendation-dot' + (index === recommendationIndex % menus.length ? ' is-active' : '') + '" type="button" data-index="' + index + '" aria-label="' + escapeHtml(item.name) + ' 보기" aria-current="' + (index === recommendationIndex % menus.length) + '"></button>';
    }).join("");
  }

  function renderSets() {
    var root = document.getElementById("homepage-set-grid");
    root.innerHTML = (CafeData.setMenus || []).map(function (set) {
      return '<a class="homepage-set-card" href="menus/set-detail.html?id=' + encodeURIComponent(set.id) + '"><img src="' + escapeHtml(set.image) + '" alt="' + escapeHtml(set.name) + ' 사진"><div><p>ORBIT SET</p><h3>' + escapeHtml(set.name) + '</h3><span>' + escapeHtml(set.items.join(" + ")) + '</span><span class="homepage-set-price">' + setPrice(set) + '</span></div></a>';
    }).join("");
  }

  var menus = availableMenus();
  updateCartCount();
  renderRecommendation(menus);
  renderSets();

  if (menus.length > 1) {
    rotationTimer = window.setInterval(function () {
      recommendationIndex = (recommendationIndex + 1) % menus.length;
      renderRecommendation(menus);
    }, 5000);
  }

  document.getElementById("recommendation-dots").addEventListener("click", function (event) {
    var button = event.target.closest("button[data-index]");
    if (!button) { return; }
    recommendationIndex = Number(button.dataset.index);
    renderRecommendation(menus);
    if (rotationTimer) {
      window.clearInterval(rotationTimer);
      rotationTimer = window.setInterval(function () {
        recommendationIndex = (recommendationIndex + 1) % menus.length;
        renderRecommendation(menus);
      }, 5000);
    }
  });

  if (window.lucide) { lucide.createIcons(); }
}());