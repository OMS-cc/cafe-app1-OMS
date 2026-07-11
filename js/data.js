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
      name: "Americano",
      categoryId: "coffee",
      price: 4500,
      description: "Clean and balanced espresso coffee.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-cafe-latte",
      name: "Cafe Latte",
      categoryId: "coffee",
      price: 5200,
      description: "Espresso with steamed milk and a soft finish.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-matcha-latte",
      name: "Matcha Latte",
      categoryId: "non-coffee",
      price: 5800,
      description: "Rich matcha blended with fresh milk.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot", "iced"], sizes: ["regular", "large"] }
    },
    {
      id: "menu-earl-grey",
      name: "Earl Grey Tea",
      categoryId: "tea",
      price: 4800,
      description: "Fragrant black tea with bergamot notes.",
      image: "",
      isAvailable: true,
      options: { temperatures: ["hot"], sizes: ["regular"] }
    },
    {
      id: "menu-butter-scone",
      name: "Butter Scone",
      categoryId: "dessert",
      price: 3800,
      description: "Freshly baked scone with a crisp edge.",
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
}());
