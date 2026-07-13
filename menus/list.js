(function () {
  "use strict";

  var categoryOrder = ["coffee", "non-coffee", "tea", "dessert"];
  var recommendedIds = ["menu-americano", "menu-strawberry-latte", "menu-basque-cheesecake"];
  var labels = { all: "전체", recommended: "오늘의 추천", coffee: "커피", "non-coffee": "논커피", tea: "티", dessert: "디저트" };
  var activeCategory = "all";

  function getMenus() {
    var stored = CafeUtils.storage.get(CafeData.storageKeys.menus, []);
    var menus = stored.length ? stored : CafeData.menus;
    return menus.slice().sort(function (left, right) {
      return categoryOrder.indexOf(left.categoryId) - categoryOrder.indexOf(right.categoryId);
    });
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function isIcedOnly(menu) {
    var temperatures = (menu.options && menu.options.temperatures) || [];
    return temperatures.length === 1 && temperatures[0] === "iced";
  }

  function descriptionForList(menu) {
    return String(menu.description || "정성스럽게 준비한 ORBIT CAFE 메뉴입니다.").replace(/입니다\.?/g, "");
  }

  function renderTabs() {
    var tabs = [{ id: "all", name: "전체" }, { id: "recommended", name: "오늘의 추천" }].concat(categoryOrder.map(function (id) {
      return { id: id, name: labels[id] };
    }));
    document.getElementById("category-tabs").innerHTML = tabs.map(function (tab) {
      return '<button class="category-button" type="button" role="tab" data-category="' + tab.id + '" aria-selected="' + (activeCategory === tab.id) + '">' + tab.name + '</button>';
    }).join("");
  }

  function setPrice(set) {
    return '<del>' + CafeUtils.formatPrice(set.originalPrice) + '</del><strong>' + CafeUtils.formatPrice(set.price) + '</strong>';
  }

  function renderSets(term) {
    var section = document.getElementById("set-menu-section");
    var grid = document.getElementById("set-menu-grid");
    var sets = (CafeData.setMenus || []).filter(function (set) {
      return !term || (set.name + " " + set.description + " " + set.items.join(" ")).toLowerCase().includes(term);
    });
    section.hidden = activeCategory !== "all" || (term && !sets.length);
    grid.innerHTML = sets.map(function (set) {
      return '<a class="set-card" href="set-detail.html?id=' + encodeURIComponent(set.id) + '"><img src="' + escapeHtml(set.image) + '" alt="' + escapeHtml(set.name) + ' 사진"><div class="set-card-copy"><p class="set-label">ORBIT SET</p><h3>' + escapeHtml(set.name) + '</h3><p>' + escapeHtml(set.description) + '</p><span class="set-items">' + escapeHtml(set.items.join(" + ")) + '</span><div class="set-card-bottom"><span class="set-price">' + setPrice(set) + '</span><span class="set-detail-link">세트 보기 <i data-lucide="arrow-up-right"></i></span></div></div></a>';
    }).join("");
    return sets.length;
  }

  function renderMenus() {
    var term = document.getElementById("search-input").value.trim().toLowerCase();
    var menus = getMenus().filter(function (menu) {
      var categoryMatches = activeCategory === "all" || (activeCategory === "recommended" ? recommendedIds.indexOf(menu.id) !== -1 : menu.categoryId === activeCategory);
      return categoryMatches && (!term || menu.name.toLowerCase().includes(term) || String(menu.description || "").toLowerCase().includes(term));
    });
    document.getElementById("menu-grid").innerHTML = menus.map(function (menu) {
      var availability = menu.isAvailable ? "" : '<span class="sold-out">SOLD OUT</span>';
      var iceOnly = isIcedOnly(menu) ? '<span class="ice-only">ICE ONLY</span>' : "";
      return '<a class="menu-card" href="detail.html?id=' + encodeURIComponent(menu.id) + '"><div class="image-wrap"><img src="' + escapeHtml(menu.image || "") + '" alt="' + escapeHtml(menu.name) + ' 사진" loading="lazy">' + availability + '</div><div class="menu-information"><div class="menu-tag-row"><span class="menu-category">' + (activeCategory === "recommended" ? "TODAY'S PICK" : labels[menu.categoryId].toUpperCase()) + '</span>' + iceOnly + '</div><div class="menu-title-row"><h3>' + escapeHtml(menu.name) + '</h3><span>' + CafeUtils.formatPrice(menu.price) + '</span></div><p class="menu-description">' + escapeHtml(descriptionForList(menu)) + '</p></div></a>';
    }).join("");
    var matchingSets = renderSets(term);
    document.getElementById("empty-state").hidden = !term || menus.length !== 0 || matchingSets !== 0;
    if (window.lucide) { lucide.createIcons(); }
  }

  document.getElementById("category-tabs").addEventListener("click", function (event) {
    var button = event.target.closest("button[data-category]");
    if (!button) { return; }
    activeCategory = button.dataset.category;
    renderTabs();
    renderMenus();
  });
  document.getElementById("search-input").addEventListener("input", renderMenus);
  renderTabs();
  renderMenus();
  if (window.lucide) { lucide.createIcons(); }
}());