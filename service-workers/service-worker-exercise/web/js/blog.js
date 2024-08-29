(function Blog() {
  "use strict";

  var offlineIcon;
  var isOnline = "onLine" in navigator ? navigator.onLine : true;
  var isLoggedIn = /isLoggedIn=1/.test(document.cookie.toString() || "");
  var usingSvc = "serviceWorker" in navigator;
  var swRegistration;
  var svcWorker;

  initServiceWorker().catch(console.error);

  document.addEventListener("DOMContentLoaded", ready, false);

  // **********************************

  function ready() {
    offlineIcon = document.getElementById("connectivity-status");

    if (!isOnline) {
      offlineIcon.classList.remove("hidden");
    }

    window.addEventListener("online", function online() {
      offlineIcon.classList.add("hidden");
      isOnline = true;
    });

    window.addEventListener("offline", function offline() {
      offlineIcon.classList.remove("hidden");
      isOnline = false;
    });
  }

  async function initServiceWorker() {
    swRegistration = await navigator.serviceWorker.register("/sw.js", {
      updateViaCache: "none",
    });

    svcWorker =
      swRegistration.installing ||
      swRegistration.waiting ||
      swRegistration.active;

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      function onController() {
        svcWorker = navigator.serviceWorker.controller;
      }
    );
  }
})();
