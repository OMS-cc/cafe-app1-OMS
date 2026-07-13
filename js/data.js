(function () {
  "use strict";

  var assetBase = new URL("../assets/images/", document.currentScript.src).href;

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
      image: assetBase + "americano.jpg",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-cafe-latte",
      name: "카페 라떼",
      categoryId: "coffee",
      price: 5200,
      description: "진한 에스프레소에 부드럽고 따뜻한 우유를 더한 라떼입니다.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&h=900&q=88",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-matcha-latte",
      name: "말차 라떼",
      categoryId: "non-coffee",
      price: 5800,
      description: "깊고 진한 말차와 신선한 우유가 어우러진 달콤쌉싸름한 라떼입니다.",
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&h=900&q=88",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-earl-grey",
      name: "얼그레이 티",
      categoryId: "tea",
      price: 4800,
      description: "베르가못의 산뜻한 향이 은은하게 퍼지는 홍차입니다.",
      image: assetBase + "earl-grey-tea.jpg",
      isAvailable: true,
      options: { temperatures: ["hot"], sizes: ["regular"] }
    },
    {
      id: "menu-butter-scone",
      name: "버터 스콘",
      categoryId: "dessert",
      price: 3800,
      description: "겉은 바삭하고 속은 촉촉하게 구운 따뜻한 버터 스콘입니다.",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&h=900&q=88",
      isAvailable: true,
      options: { temperatures: [], sizes: [] }
    }    ,{
      id: "menu-vanilla-latte", name: "바닐라 라떼", categoryId: "coffee", price: 5800,
      description: "은은한 바닐라 향과 부드러운 우유가 어우러진 라떼입니다.", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-caramel-macchiato", name: "카라멜 마키아토", categoryId: "coffee", price: 6200,
      description: "달콤한 카라멜과 진한 에스프레소를 층층이 즐기는 커피입니다.", image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-cold-brew", name: "콜드브루", categoryId: "coffee", price: 5200,
      description: "천천히 추출해 깔끔하고 깊은 풍미가 살아 있는 콜드브루입니다.", image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: ["iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-strawberry-latte", name: "딸기 라떼", categoryId: "non-coffee", price: 5900,
      description: "달콤한 딸기와 고소한 우유를 듬뿍 담은 핑크빛 라떼입니다.", image: assetBase + "strawberry-latte.jpg", isAvailable: true,
      options: { temperatures: ["iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-chocolate-latte", name: "초콜릿 라떼", categoryId: "non-coffee", price: 5600,
      description: "진한 초콜릿의 달콤함을 부드럽게 즐기는 따뜻한 라떼입니다.", image: assetBase + "chocolate-latte.jpg", isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-lemon-ade", name: "레몬 에이드", categoryId: "non-coffee", price: 5500,
      description: "상큼한 레몬과 탄산이 기분 좋게 어우러진 에이드입니다.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: ["iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-peach-iced-tea", name: "피치 아이스티", categoryId: "tea", price: 5000,
      description: "복숭아의 달콤한 향이 산뜻하게 퍼지는 시원한 홍차입니다.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: ["iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-chamomile-tea", name: "캐모마일 티", categoryId: "tea", price: 4800,
      description: "은은한 꽃향으로 편안한 휴식을 더해주는 허브티입니다.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: ["hot"], sizes: ["regular"] }
    },
    {
      id: "menu-basque-cheesecake", name: "바스크 치즈케이크", categoryId: "dessert", price: 6500,
      description: "겉은 진하게 구워내고 속은 촉촉하게 만든 치즈케이크입니다.", image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: [], sizes: [] }
    },
    {
      id: "menu-financier", name: "아몬드 피낭시에", categoryId: "dessert", price: 3200,
      description: "고소한 아몬드 버터 향이 가득한 작은 구움과자입니다.", image: assetBase + "almond-financier.jpg", isAvailable: true,
      options: { temperatures: [], sizes: [] }
    },
    {
      id: "menu-tiramisu", name: "티라미수", categoryId: "dessert", price: 6800,
      description: "부드러운 마스카포네와 커피 향이 어우러진 클래식 디저트입니다.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&h=900&q=88", isAvailable: true,
      options: { temperatures: [], sizes: [] }
    }  ];

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
  }
  // Add newly introduced defaults without changing existing manager edits.
  try {
    if (!window.localStorage.getItem("cafe-app:menu-catalog-v2")) {
      var savedMenus = JSON.parse(window.localStorage.getItem("cafe-app:menus") || "[]");
      if (savedMenus.length) {
        var savedIds = savedMenus.map(function (menu) { return menu.id; });
        var missingMenus = menus.filter(function (menu) { return savedIds.indexOf(menu.id) === -1; });
        if (missingMenus.length) { window.localStorage.setItem("cafe-app:menus", JSON.stringify(savedMenus.concat(missingMenus))); }
      }
      window.localStorage.setItem("cafe-app:menu-catalog-v2", "true");
    }
  } catch (error) {
    // The app still works when the browser blocks local storage.
  }
  // Refresh the curated photo set for every built-in menu while leaving manager-created menus untouched.
  try {
    if (!window.localStorage.getItem("cafe-app:menu-images-v4")) {
      var persistedMenus = JSON.parse(window.localStorage.getItem("cafe-app:menus") || "[]");
      var defaultsById = menus.reduce(function (result, menu) { result[menu.id] = menu; return result; }, {});
      var refreshedMenus = persistedMenus.map(function (menu) {
        var defaultMenu = defaultsById[menu.id];
        return defaultMenu ? Object.assign({}, menu, { image: defaultMenu.image }) : menu;
      });
      if (refreshedMenus.length) { window.localStorage.setItem("cafe-app:menus", JSON.stringify(refreshedMenus)); }
      window.localStorage.setItem("cafe-app:menu-images-v4", "true");
    }
  } catch (error) {
    // The app still works when the browser blocks local storage.
  }
  // Refresh the nine menu photos selected for the current catalog revision.
  try {
    if (!window.localStorage.getItem("cafe-app:menu-images-v5")) {
      var photoRefreshIds = ["menu-americano", "menu-cold-brew", "menu-strawberry-latte", "menu-chocolate-latte", "menu-lemon-ade", "menu-peach-iced-tea", "menu-chamomile-tea", "menu-basque-cheesecake", "menu-financier"];
      var savedCatalog = JSON.parse(window.localStorage.getItem("cafe-app:menus") || "[]");
      var defaultsForPhotos = menus.reduce(function (result, menu) { result[menu.id] = menu; return result; }, {});
      var refreshedCatalog = savedCatalog.map(function (menu) {
        var defaultMenu = defaultsForPhotos[menu.id];
        return photoRefreshIds.indexOf(menu.id) !== -1 && defaultMenu ? Object.assign({}, menu, { image: defaultMenu.image }) : menu;
      });
      if (refreshedCatalog.length) { window.localStorage.setItem("cafe-app:menus", JSON.stringify(refreshedCatalog)); }
      window.localStorage.setItem("cafe-app:menu-images-v5", "true");
    }
  } catch (error) {
    // The app still works when the browser blocks local storage.
  }
  // Replace five curated menu photos with local assets supplied for this catalog revision.
  try {
    if (!window.localStorage.getItem("cafe-app:menu-images-v6")) {
      var localPhotoIds = ["menu-americano", "menu-strawberry-latte", "menu-chocolate-latte", "menu-earl-grey", "menu-financier"];
      var savedMenuCatalog = JSON.parse(window.localStorage.getItem("cafe-app:menus") || "[]");
      var imageDefaults = menus.reduce(function (result, menu) { result[menu.id] = menu; return result; }, {});
      var catalogWithLocalPhotos = savedMenuCatalog.map(function (menu) {
        var defaultMenu = imageDefaults[menu.id];
        return localPhotoIds.indexOf(menu.id) !== -1 && defaultMenu ? Object.assign({}, menu, { image: defaultMenu.image }) : menu;
      });
      if (catalogWithLocalPhotos.length) { window.localStorage.setItem("cafe-app:menus", JSON.stringify(catalogWithLocalPhotos)); }
      window.localStorage.setItem("cafe-app:menu-images-v6", "true");
    }
  } catch (error) {
    // The app still works when the browser blocks local storage.
  }}());
