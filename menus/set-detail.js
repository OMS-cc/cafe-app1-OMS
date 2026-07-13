(function () {
  "use strict";

  var id = new URLSearchParams(location.search).get("id");
  var set = (CafeData.setMenus || []).find(function (item) { return item.id === id; });
  var root = document.getElementById("set-detail");

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  if (!set) {
    root.innerHTML = '<section class="not-found"><i data-lucide="circle-alert"></i><strong>요청하신 세트 메뉴를 찾을 수 없어요.</strong><a class="button-link" href="list.html">메뉴 목록 보기</a></section>';
  } else {
    var discount = Math.round((1 - set.price / set.originalPrice) * 100);
    root.innerHTML = '<article class="set-detail-layout"><div class="set-detail-image"><img src="' + escapeHtml(set.image) + '" alt="' + escapeHtml(set.name) + ' 사진"></div><div class="set-detail-copy"><p class="set-eyebrow">ORBIT SET</p><h1>' + escapeHtml(set.name) + '</h1><p class="set-description">' + escapeHtml(set.description) + '</p><section class="set-items-list"><h2>세트 구성</h2><ul>' + set.items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul></section><p class="set-price"><del>' + CafeUtils.formatPrice(set.originalPrice) + '</del><strong>' + CafeUtils.formatPrice(set.price) + '</strong><span class="set-discount">' + discount + '% OFF</span></p><button id="add-set-to-cart" class="add-to-cart" type="button">세트 장바구니에 담기</button></div></article>';
    document.getElementById("add-set-to-cart").addEventListener("click", function (event) {
      var button = event.currentTarget;
      var cart = CafeUtils.storage.get(CafeData.storageKeys.cart, []);
      var matchingItem = cart.find(function (item) { return item.menuId === set.id; });
      if (matchingItem) { matchingItem.quantity += 1; } else {
        cart.push({ id: CafeUtils.createId("cart"), menuId: set.id, name: set.name, unitPrice: set.price, optionPrice: 0, quantity: 1, image: set.image, options: {} });
      }
      CafeUtils.storage.set(CafeData.storageKeys.cart, cart);
      button.textContent = "장바구니에 담겼어요";
      window.setTimeout(function () { button.textContent = "세트 장바구니에 담기"; }, 1700);
    });
  }

  if (window.lucide) { lucide.createIcons(); }
}());
