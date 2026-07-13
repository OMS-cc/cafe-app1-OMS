(function () {
  "use strict";

  var labels = { coffee: "커피", "non-coffee": "논커피", tea: "티", dessert: "디저트", hot: "HOT", iced: "ICED", regular: "Regular", large: "Large" };
  var id = new URLSearchParams(location.search).get("id");
  var storedMenus = CafeUtils.storage.get(CafeData.storageKeys.menus, []);
  var menus = storedMenus.length ? storedMenus : CafeData.menus;
  var menu = menus.find(function (item) { return item.id === id; });
  var root = document.getElementById("menu-detail");

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function descriptionForDetail(item) {
    return String(item.description || "정성스럽게 준비한 ORBIT CAFE 메뉴입니다.").replace(/입니다\.?/g, "");
  }

  function isIcedOnly(temperatures) {
    return temperatures.length === 1 && temperatures[0] === "iced";
  }

  function optionLabel(value, temperatures) {
    if (value === "iced" && !isIcedOnly(temperatures)) { return "ICED +500"; }
    if (value === "large") { return "Large +1,000"; }
    return labels[value];
  }

  function optionGroup(title, type, values, selected, temperatures) {
    if (!values.length) { return ""; }
    return '<div class="option-group"><span class="option-label">' + title + '</span><div class="option-buttons">' + values.map(function (value) {
      return '<button class="option-button' + (value === selected ? ' is-selected' : '') + '" type="button" data-option="' + type + '" data-value="' + value + '" aria-pressed="' + (value === selected) + '">' + optionLabel(value, temperatures) + '</button>';
    }).join("") + '</div></div>';
  }

  if (!menu) {
    root.innerHTML = '<section class="not-found"><i data-lucide="circle-alert"></i><strong>요청하신 메뉴를 찾을 수 없어요.</strong><a class="button-link" href="list.html">메뉴 목록 보기</a></section>';
  } else {
    var temperatures = (menu.options && menu.options.temperatures) || [];
    var sizes = (menu.options && menu.options.sizes) || [];
    var selectedTemperature = temperatures.indexOf("hot") !== -1 ? "hot" : (temperatures[0] || "");
    var selectedSize = sizes.indexOf("regular") !== -1 ? "regular" : (sizes[0] || "");
    var availability = menu.isAvailable ? '<span class="availability">현재 주문 가능</span>' : '<span class="availability unavailable">현재 주문 준비 중</span>';
    var controls = optionGroup("Hot or Ice", "temperature", temperatures, selectedTemperature, temperatures) + optionGroup("Regular or Large", "size", sizes, selectedSize, temperatures);
    if (!controls) { controls = '<span class="option-chip">기본 제공</span>'; }

    root.innerHTML = '<article class="product-layout"><div class="product-visual"><img src="' + escapeHtml(menu.image || "") + '" alt="' + escapeHtml(menu.name) + ' 사진"></div><div class="product-info"><p class="product-category">' + labels[menu.categoryId].toUpperCase() + '</p><h1>' + escapeHtml(menu.name) + '</h1><p id="product-price" class="product-price"></p><p class="product-description">' + escapeHtml(descriptionForDetail(menu)) + '</p>' + availability + '<section class="product-options"><h2>선택 가능 옵션</h2><div class="option-list">' + controls + '</div></section><button id="add-to-cart" class="add-to-cart" type="button"' + (menu.isAvailable ? "" : " disabled") + '>' + (menu.isAvailable ? "장바구니에 담기" : "현재 주문 준비 중") + '</button><p class="product-note">매장 상황에 따라 재료 및 옵션이 달라질 수 있습니다.<br>알레르기 유발 성분은 주문 전 매장에 문의해 주세요.</p></div></article>';

    function optionPrice() {
      var temperaturePrice = selectedTemperature === "iced" && !isIcedOnly(temperatures) ? 500 : 0;
      var sizePrice = selectedSize === "large" ? 1000 : 0;
      return temperaturePrice + sizePrice;
    }

    function updatePrice() {
      var extra = optionPrice();
      var price = document.getElementById("product-price");
      price.innerHTML = CafeUtils.formatPrice(menu.price + extra) + (extra ? '<small>기본 가격 ' + CafeUtils.formatPrice(menu.price) + ' + 옵션 ' + CafeUtils.formatPrice(extra) + '</small>' : '');
    }

    root.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-option]");
      if (!button) { return; }
      if (button.dataset.option === "temperature") { selectedTemperature = button.dataset.value; }
      if (button.dataset.option === "size") { selectedSize = button.dataset.value; }
      root.querySelectorAll('[data-option="' + button.dataset.option + '"]').forEach(function (optionButton) {
        var isSelected = optionButton.dataset.value === button.dataset.value;
        optionButton.classList.toggle("is-selected", isSelected);
        optionButton.setAttribute("aria-pressed", String(isSelected));
      });
      updatePrice();
    });

    document.getElementById("add-to-cart").addEventListener("click", function (event) {
      var button = event.currentTarget;
      var options = { temperature: selectedTemperature, size: selectedSize };
      var cart = CafeUtils.storage.get(CafeData.storageKeys.cart, []);
      var matchingItem = cart.find(function (item) { return item.menuId === menu.id && JSON.stringify(item.options) === JSON.stringify(options); });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({ id: CafeUtils.createId("cart"), menuId: menu.id, name: menu.name, unitPrice: menu.price, optionPrice: optionPrice(), quantity: 1, image: menu.image || "", options: options });
      }
      CafeUtils.storage.set(CafeData.storageKeys.cart, cart);
      button.textContent = "장바구니에 담겼어요";
      window.setTimeout(function () { button.textContent = "장바구니에 담기"; }, 1700);
    });

    updatePrice();
  }

  if (window.lucide) { lucide.createIcons(); }
}());