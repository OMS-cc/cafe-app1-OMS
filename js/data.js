(function () {
  "use strict";

  var categories = [
    { id: "coffee", name: "Coffee" },
    { id: "non-coffee", name: "Non-coffee" },
    { id: "tea", name: "Tea" },
    { id: "dessert", name: "Dessert" }
  ];

  var menus = [
    {
      id: "menu-americano",
      name: "아메리카노",
      categoryId: "coffee",
      price: 4500,
      description: "고소한 에스프레소의 풍미를 깔끔하게 즐길 수 있는 커피입니다.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-cafe-latte",
      name: "카페 라떼",
      categoryId: "coffee",
      price: 5200,
      description: "진한 에스프레소에 부드럽고 따뜻한 우유를 더한 라떼입니다.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-matcha-latte",
      name: "말차 라떼",
      categoryId: "non-coffee",
      price: 5800,
      description: "깊고 진한 말차와 신선한 우유가 어우러진 달콤쌉싸름한 라떼입니다.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-earl-grey",
      name: "얼그레이 티",
      categoryId: "tea",
      price: 4800,
      description: "베르가못의 산뜻한 향이 은은하게 퍼지는 홍차입니다.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot"], sizes: ["regular"] }
    },
    {
      id: "menu-butter-scone",
      name: "버터 스콘",
      categoryId: "dessert",
      price: 3800,
      description: "겉은 바삭하고 속은 촉촉하게 구운 따뜻한 버터 스콘입니다.",
      image: "",
      isAvailable: true,
      options: { temperatures: [], sizes: [] }
    }
  ];

  window.CafeData = Object.freeze({
    categories: Object.freeze(categories),
    menus: Object.freeze(menus),
    storageKeys: Object.freeze({
      menus: "cafe-app:menus",
      cart: "cafe-app:cart",
      orders: "cafe-app:orders"
    })
  });

  // One-time migration for the seeded menus created before Korean copy was added.
  try {
    if (!window.localStorage.getItem("cafe-app:localized-defaults-v1")) {
      var storedMenus = JSON.parse(window.localStorage.getItem("cafe-app:menus") || "[]");
      var defaultMenusById = menus.reduce(function (result, menu) { result[menu.id] = menu; return result; }, {});
      var updatedMenus = storedMenus.map(function (menu) {
        var localizedMenu = defaultMenusById[menu.id];
        return localizedMenu ? Object.assign({}, menu, { name: localizedMenu.name, description: localizedMenu.description }) : menu;
      });
      if (updatedMenus.length) { window.localStorage.setItem("cafe-app:menus", JSON.stringify(updatedMenus)); }
      window.localStorage.setItem("cafe-app:localized-defaults-v1", "true");
    }
  } catch (error) {
    // The app still works when the browser blocks local storage.
  }}());
