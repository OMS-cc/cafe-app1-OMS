(function () {
  "use strict";

  var categoryOrder = ["coffee", "non-coffee", "tea", "dessert"];
  var labels = { all: "전체", coffee: "커피", "non-coffee": "논커피", tea: "티", dessert: "디저트" };
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
    var tabs = [{ id: "all", name: "전체" }].concat(categoryOrder.map(function (id) {
      return { id: id, name: labels[id] };
    }));
    document.getElementById("category-tabs").innerHTML = tabs.map(function (tab) {
      return '<button class="category-button" type="button" role="tab" data-category="' + tab.id + '" aria-selected="' + (activeCategory === tab.id) + '">' + tab.name + '</button>';
    }).join("");
  }

  function renderSets(term) {
    var section = document.getElementById("set-menu-section");
    var grid = document.getElementById("set-menu-grid");
    var sets = (CafeData.setMenus || []).filter(function (set) {
      return !term || (set.name + " " + set.description + " " + set.items.join(" ")).toLowerCase().includes(term);
    });
    section.hidden = activeCategory !== "all" || (term && !sets.length);
    grid.innerHTML = sets.map(function (set) {
      return '<article class="set-card"><img src="' + escapeHtml(set.image) + '" alt="' + escapeHtml(set.name) + ' 사진"><div class="set-card-copy"><p class="set-label">ORBIT SET</p><h3>' + escapeHtml(set.name) + '</h3><p>' + escapeHtml(set.description) + '</p><span class="set-items">' + escapeHtml(set.items.join(" + ")) + '</span><div class="set-card-bottom"><strong>' + CafeUtils.formatPrice(set.price) + '</strong><button type="button" data-set-id="' + escapeHtml(set.id) + '">세트 담기 <i data-lucide="plus"></i></button></div></div></article>';
    }).join("");
  }

  function renderMenus() {
    var term = document.getElementById("search-input").value.trim().toLowerCase();
    var menus = getMenus().filter(function (menu) {
      return (activeCategory === "all" || menu.categoryId === activeCategory) && (!term || menu.name.toLowerCase().includes(term) || String(menu.description || "").toLowerCase().includes(term));
    });
    var grid = document.getElementById("menu-grid");
    grid.innerHTML = menus.map(function (menu) {
      var availability = menu.isAvailable ? "" : '<span class="sold-out">SOLD OUT</span>';
      var iceOnly = isIcedOnly(menu) ? '<span class="ice-only">ICE ONLY</span>' : "";
      return '<a class="menu-card" href="detail.html?id=' + encodeURIComponent(menu.id) + '"><div class="image-wrap"><img src="' + escapeHtml(menu.image || "") + '" alt="' + escapeHtml(menu.name) + ' 사진" loading="lazy">' + availability + '</div><div class="menu-information"><div class="menu-tag-row"><span class="menu-category">' + labels[menu.categoryId].toUpperCase() + '</span>' + iceOnly + '</div><div class="menu-title-row"><h3>' + escapeHtml(menu.name) + '</h3><span>' + CafeUtils.formatPrice(menu.price) + '</span></div><p class="menu-description">' + escapeHtml(descriptionForList(menu)) + '</p></div></a>';
    }).join("");
    document.getElementById("empty-state").hidden = menus.length !== 0 || !term;
    renderSets(term);
    if (window.lucide) { lucide.createIcons(); }
  }

  function addSetToCart(setId, button) {
    var set = (CafeData.setMenus || []).find(function (item) { return item.id === setId; });
    if (!set) { return; }
    var cart = CafeUtils.storage.get(CafeData.storageKeys.cart, []);
    var matchingItem = cart.find(function (item) { return item.menuId === set.id; });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({ id: CafeUtils.createId("cart"), menuId: set.id, name: set.name, unitPrice: set.price, optionPrice: 0, quantity: 1, image: set.image, options: {} });
    }
    CafeUtils.storage.set(CafeData.storageKeys.cart, cart);
    button.textContent = "담겼어요";
    window.setTimeout(function () { button.innerHTML = '세트 담기 <i data-lucide="plus"></i>'; if (window.lucide) { lucide.createIcons({ nodes: [button] }); } }, 1400);
  }

  document.getElementById("category-tabs").addEventListener("click", function (event) {
    var button = event.target.closest("button[data-category]");
    if (!button) { return; }
    activeCategory = button.dataset.category;
    renderTabs();
    renderMenus();
  });
  document.getElementById("set-menu-grid").addEventListener("click", function (event) {
    var button = event.target.closest("button[data-set-id]");
    if (button) { addSetToCart(button.dataset.setId, button); }
  });
  document.getElementById("search-input").addEventListener("input", renderMenus);
  renderTabs();
  renderMenus();
  if (window.lucide) { lucide.createIcons(); }
}());