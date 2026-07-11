(function () {
  "use strict";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getStoredValue(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw === null ? clone(fallback) : JSON.parse(raw);
    } catch (error) {
      return clone(fallback);
    }
  }

  function setStoredValue(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function removeStoredValue(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function formatPrice(value) {
    var amount = Number(value);
    if (!Number.isFinite(amount)) {
      return "-";
    }

    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function formatDate(value) {
    var date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function createId(prefix) {
    var random = Math.random().toString(36).slice(2, 8);
    return prefix + "-" + Date.now().toString(36) + "-" + random;
  }

  function calculateCartTotal(items) {
    return items.reduce(function (total, item) {
      var unitPrice = Number(item.unitPrice) || 0;
      var optionPrice = Number(item.optionPrice) || 0;
      var quantity = Number(item.quantity) || 0;
      return total + (unitPrice + optionPrice) * quantity;
    }, 0);
  }

  window.CafeUtils = Object.freeze({
    storage: Object.freeze({
      get: getStoredValue,
      set: setStoredValue,
      remove: removeStoredValue
    }),
    formatPrice: formatPrice,
    formatDate: formatDate,
    createId: createId,
    calculateCartTotal: calculateCartTotal
  });
}());
