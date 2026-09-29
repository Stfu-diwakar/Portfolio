// ==========================================================================
// AURA FEAST - MAIN APPLICATION JAVASCRIPT (Clay Dark/Light Theme Engine)
// ==========================================================================

// Global Application State
let cartState = [];
let appliedCoupon = null;

let filterState = {
  searchQuery: "",
  category: "all",
  diet: "all",      // "all" | "veg" | "nonveg"
  cuisine: "all",
  sortBy: "popular"
};

// Initialize Application on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initApp();
  setupEventListeners();
});

// --------------------------------------------------------------------------
// CLAY DARK / LIGHT THEME TOGGLE ENGINE
// --------------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem("aura_feast_theme") || "dark";
  setTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("aura_feast_theme", theme);

  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.className = "bi bi-moon-stars-fill text-warning";
    } else {
      themeIcon.className = "bi bi-sun-fill text-danger";
    }
  }
}

function initApp() {
  renderCategories();
  renderOffers();
  renderRestaurants();
  renderMenu();
  updateCartUI();
}

// --------------------------------------------------------------------------
// EVENT LISTENERS & SEARCH BINDINGS
// --------------------------------------------------------------------------
function setupEventListeners() {
  const navSearch = document.getElementById("navSearchInput");
  const menuSearch = document.getElementById("menuSearchInput");

  if (navSearch) {
    navSearch.addEventListener("input", (e) => {
      filterState.searchQuery = e.target.value.trim().toLowerCase();
      if (menuSearch) menuSearch.value = e.target.value;
      renderMenu();
      scrollToMenuIfSearching();
    });
  }

  if (menuSearch) {
    menuSearch.addEventListener("input", (e) => {
      filterState.searchQuery = e.target.value.trim().toLowerCase();
      if (navSearch) navSearch.value = e.target.value;
      renderMenu();
    });
  }
}

function scrollToMenuIfSearching() {
  const menuSection = document.getElementById("menu");
  if (menuSection && filterState.searchQuery.length > 1) {
    const navHeight = 80;
    const elementPosition = menuSection.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: "smooth"
    });
  }
}

// --------------------------------------------------------------------------
// RENDER OFFERS & COUPONS SECTION
// --------------------------------------------------------------------------
function renderOffers() {
  const container = document.getElementById("offersContainer");
  if (!container) return;

  container.innerHTML = PROMO_OFFERS.map(offer => `
    <div class="col-12 col-md-4">
      <div class="glass-panel p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="glass-badge badge-veg"><i class="bi bi-tag-fill me-1"></i> ${offer.badgeText}</span>
            <span class="fw-bold text-warning font-monospace fs-6">${offer.code}</span>
          </div>
          <h4 class="fs-5 mb-2">${offer.title}</h4>
          <p class="text-muted small mb-3">${offer.description}</p>
        </div>
        <button class="btn btn-liquid-secondary btn-sm w-100" onclick="applyPromoCodeDirect('${offer.code}')">
          <i class="bi bi-check-circle me-1"></i> Apply Offer Code
        </button>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------------
// RENDER TOP RESTAURANTS SECTION
// --------------------------------------------------------------------------
function renderRestaurants() {
  const container = document.getElementById("restaurantsContainer");
  if (!container) return;

  container.innerHTML = RESTAURANTS_DATA.map(rest => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="glass-panel h-100 d-flex flex-column">
        <div class="food-card-img-container">
          <img src="${rest.image}" alt="${rest.name}" class="food-card-img" />
          <div class="card-top-badges">
            <span class="glass-badge" style="background: rgba(0,0,0,0.6); color: #fff;"><i class="bi bi-fire text-danger me-1"></i> ${rest.tag}</span>
            <span class="rating-pill"><i class="bi bi-star-fill"></i> ${rest.rating} (${rest.reviews})</span>
          </div>
        </div>
        <div class="p-3 d-flex flex-column flex-grow-1">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h5 class="mb-0">${rest.name}</h5>
            <span class="glass-badge small">${rest.cuisine}</span>
          </div>
          <p class="text-muted small mb-3 flex-grow-1">${rest.description}</p>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25">
            <span class="text-muted small"><i class="bi bi-clock me-1 text-warning"></i> ${rest.deliveryTime}</span>
            <button class="btn btn-liquid-primary btn-sm" onclick="filterByCuisine('${rest.cuisine}')">
              Explore Kitchen <i class="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------------
// CATEGORIES BAR & FILTER CONTROLS
// --------------------------------------------------------------------------
function renderCategories() {
  const categories = ["all", "Starters", "Main Course", "Pizza & Pasta", "Burgers & Wraps", "Desserts", "Beverages"];
  const container = document.getElementById("categoryPills");
  if (!container) return;

  container.innerHTML = categories.map(cat => {
    const isActive = filterState.category === cat;
    const label = cat === "all" ? "🔥 All Gourmet" : cat;
    return `
      <button class="filter-pill-btn ${isActive ? 'active' : ''}" onclick="setCategoryFilter('${cat}')">
        ${label}
      </button>
    `;
  }).join("");
}

function setCategoryFilter(cat) {
  filterState.category = cat;
  renderCategories();
  renderMenu();
}

function setDietFilter(type) {
  filterState.diet = type;
  
  const allBtn = document.getElementById("dietAllBtn");
  const vegBtn = document.getElementById("dietVegBtn");
  const nonVegBtn = document.getElementById("dietNonVegBtn");

  if (allBtn) allBtn.className = `diet-toggle-btn w-100 ${type === 'all' ? 'active-all' : ''}`;
  if (vegBtn) vegBtn.className = `diet-toggle-btn w-100 ${type === 'veg' ? 'active-veg' : ''}`;
  if (nonVegBtn) nonVegBtn.className = `diet-toggle-btn w-100 ${type === 'nonveg' ? 'active-nonveg' : ''}`;

  renderMenu();
}

function filterByCuisine(cuisineName) {
  filterState.cuisine = cuisineName;
  const select = document.getElementById("cuisineSelect");
  if (select) select.value = cuisineName;
  
  renderMenu();
  
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    const navHeight = 80;
    const elementPosition = menuSection.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: "smooth"
    });
  }
}

function handleFilterChange() {
  const cuisineSel = document.getElementById("cuisineSelect");
  const sortSel = document.getElementById("sortSelect");

  if (cuisineSel) filterState.cuisine = cuisineSel.value;
  if (sortSel) filterState.sortBy = sortSel.value;

  renderMenu();
}

function resetFilters() {
  filterState = {
    searchQuery: "",
    category: "all",
    diet: "all",
    cuisine: "all",
    sortBy: "popular"
  };

  const navSearch = document.getElementById("navSearchInput");
  const menuSearch = document.getElementById("menuSearchInput");
  const cuisineSel = document.getElementById("cuisineSelect");
  const sortSel = document.getElementById("sortSelect");

  if (navSearch) navSearch.value = "";
  if (menuSearch) menuSearch.value = "";
  if (cuisineSel) cuisineSel.value = "all";
  if (sortSel) sortSel.value = "popular";

  setDietFilter("all");
  renderCategories();
  renderMenu();
}

// --------------------------------------------------------------------------
// RENDER FOOD MENU GRID WITH MULTI-FILTERING (INR ₹)
// --------------------------------------------------------------------------
function renderMenu() {
  const container = document.getElementById("foodGrid");
  const emptyState = document.getElementById("emptyState");
  if (!container) return;

  // Filter Items
  let filtered = FOOD_ITEMS.filter(item => {
    if (filterState.searchQuery) {
      const q = filterState.searchQuery;
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCuisine = item.cuisine.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCuisine && !matchCat) return false;
    }

    if (filterState.category !== "all" && item.category !== filterState.category) {
      return false;
    }

    if (filterState.diet === "veg" && !item.isVeg) return false;
    if (filterState.diet === "nonveg" && item.isVeg) return false;

    if (filterState.cuisine !== "all" && item.cuisine.toLowerCase() !== filterState.cuisine.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Sort Items
  filtered.sort((a, b) => {
    if (filterState.sortBy === "price-asc") return a.price - b.price;
    if (filterState.sortBy === "price-desc") return b.price - a.price;
    if (filterState.sortBy === "rating") return b.rating - a.rating;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  } else {
    if (emptyState) emptyState.classList.add("d-none");
  }

  container.innerHTML = filtered.map(item => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="glass-panel h-100 d-flex flex-column">
        <div class="food-card-img-container">
          <img src="${item.image}" alt="${item.name}" class="food-card-img" />
          <div class="card-top-badges">
            <span class="glass-badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}">
              <i class="bi ${item.isVeg ? 'bi-circle-fill' : 'bi-triangle-fill'} small"></i>
              ${item.isVeg ? 'VEG' : 'NON-VEG'}
            </span>
            <span class="rating-pill"><i class="bi bi-star-fill"></i> ${item.rating}</span>
          </div>
        </div>

        <div class="food-card-body">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="glass-badge small">${item.cuisine}</span>
            <span class="text-muted small"><i class="bi bi-clock me-1"></i> ${item.prepTime}</span>
          </div>

          <h5 class="food-title">${item.name}</h5>
          <p class="food-desc">${item.description}</p>

          <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25 mt-auto">
            <div class="food-price">₹${item.price.toFixed(0)}</div>
            <div class="d-flex gap-2">
              <button class="btn btn-liquid-secondary btn-sm" onclick="openQuickView('${item.id}')" title="Quick View">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-liquid-primary btn-sm" onclick="addToCart('${item.id}')">
                <i class="bi bi-plus-lg me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------------
// QUICK VIEW ITEM MODAL
// --------------------------------------------------------------------------
function openQuickView(foodId) {
  const item = FOOD_ITEMS.find(i => i.id === foodId);
  if (!item) return;

  const content = document.getElementById("quickViewContent");
  if (!content) return;

  content.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-12 col-md-6">
        <div class="rounded-4 overflow-hidden shadow-lg position-relative">
          <img src="${item.image}" alt="${item.name}" class="img-fluid w-100" style="height: 320px; object-fit: cover;" />
          <span class="glass-badge position-absolute top-0 start-0 m-3 ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}">
            <i class="bi ${item.isVeg ? 'bi-circle-fill' : 'bi-triangle-fill'} me-1"></i> ${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          </span>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="glass-badge text-warning"><i class="bi bi-shop me-1"></i> ${item.restaurantName}</span>
          <span class="rating-pill"><i class="bi bi-star-fill me-1"></i> ${item.rating} (${item.reviews} reviews)</span>
        </div>
        <h3 class="mb-2">${item.name}</h3>
        <p class="text-muted small mb-3">${item.description}</p>

        <div class="d-flex gap-3 mb-4">
          <div class="glass-panel p-2 px-3 text-center">
            <div class="text-muted small">Prep Time</div>
            <div class="fw-bold">${item.prepTime}</div>
          </div>
          <div class="glass-panel p-2 px-3 text-center">
            <div class="text-muted small">Calories</div>
            <div class="fw-bold">${item.calories}</div>
          </div>
          <div class="glass-panel p-2 px-3 text-center">
            <div class="text-muted small">Cuisine</div>
            <div class="fw-bold">${item.cuisine}</div>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25">
          <div>
            <span class="text-muted small d-block">Price per dish</span>
            <span class="display-6 fw-bold">₹${item.price.toFixed(0)}</span>
          </div>
          <button class="btn btn-liquid-primary py-3 px-4" onclick="addToCart('${item.id}'); bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide();">
            <i class="bi bi-bag-plus-fill me-2 fs-5"></i> Add to Order
          </button>
        </div>
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("quickViewModal"));
  modal.show();
}

// --------------------------------------------------------------------------
// DYNAMIC CART STATE MANAGEMENT
// --------------------------------------------------------------------------
function addToCart(foodId, qty = 1) {
  const item = FOOD_ITEMS.find(i => i.id === foodId);
  if (!item) return;

  const existing = cartState.find(entry => entry.item.id === foodId);

  if (existing) {
    existing.quantity += qty;
  } else {
    cartState.push({
      item: item,
      quantity: qty
    });
  }

  updateCartUI();
  showToast("Item Added", `${item.name} added to your cart!`, "success");
}

function updateCartQuantity(foodId, delta) {
  const entry = cartState.find(e => e.item.id === foodId);
  if (!entry) return;

  entry.quantity += delta;
  if (entry.quantity <= 0) {
    removeCartItem(foodId);
    return;
  }

  updateCartUI();
}

function removeCartItem(foodId) {
  cartState = cartState.filter(e => e.item.id !== foodId);
  updateCartUI();
  showToast("Item Removed", "Item removed from your cart.", "info");
}

function clearCart() {
  if (cartState.length === 0) return;
  cartState = [];
  appliedCoupon = null;
  updateCartUI();
  showToast("Cart Cleared", "Your cart has been reset.", "info");
}

// --------------------------------------------------------------------------
// CALCULATIONS & CART UI UPDATE (INR ₹)
// --------------------------------------------------------------------------
function updateCartUI() {
  const count = cartState.reduce((sum, e) => sum + e.quantity, 0);
  
  const navCount = document.getElementById("navCartCount");
  const floatCount = document.getElementById("floatingCartCount");
  if (navCount) navCount.textContent = count;
  if (floatCount) floatCount.textContent = count;

  const container = document.getElementById("cartItemsContainer");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!container) return;

  if (cartState.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted opacity-25 mb-3"></i>
        <h5>Your Cart is Empty</h5>
        <p class="text-muted small">Explore our gourmet menu and add your favorite dishes!</p>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    if (checkoutBtn) checkoutBtn.disabled = false;
    container.innerHTML = cartState.map(entry => `
      <div class="cart-item-card">
        <img src="${entry.item.image}" alt="${entry.item.name}" class="cart-item-img" />
        <div class="flex-grow-1 min-w-0">
          <h6 class="mb-1 text-truncate">${entry.item.name}</h6>
          <div class="text-warning fw-bold small">₹${(entry.item.price * entry.quantity).toFixed(0)}</div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="qty-btn" onclick="updateCartQuantity('${entry.item.id}', -1)">-</button>
          <span class="fw-bold small px-1">${entry.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${entry.item.id}', 1)">+</button>
          <button class="btn btn-link text-danger p-0 ms-2" onclick="removeCartItem('${entry.item.id}')" title="Delete">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  const subtotal = cartState.reduce((sum, e) => sum + (e.item.price * e.quantity), 0);
  
  const freeThreshold = 399.00;
  const isFreeDelivery = subtotal >= freeThreshold || (appliedCoupon && appliedCoupon.type === "shipping");
  const deliveryFee = subtotal === 0 ? 0 : (isFreeDelivery ? 0 : 49);

  const progressPercent = Math.min(100, (subtotal / freeThreshold) * 100);
  const progressBar = document.getElementById("freeShippingProgressBar");
  const freeText = document.getElementById("freeShippingText");
  const freeAmt = document.getElementById("freeShippingAmount");

  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  if (freeText && freeAmt) {
    if (subtotal >= freeThreshold) {
      freeText.textContent = "🎉 You unlocked FREE Express Shipping!";
      freeAmt.textContent = "Unlocked!";
    } else {
      const remaining = freeThreshold - subtotal;
      freeText.textContent = `Add ₹${remaining.toFixed(0)} more for FREE Shipping`;
      freeAmt.textContent = `₹${remaining.toFixed(0)} left`;
    }
  }

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.max) discountAmount = Math.min(discountAmount, appliedCoupon.max);
    } else if (appliedCoupon.type === "flat") {
      discountAmount = appliedCoupon.value;
    }
  }

  const tax = subtotal * 0.05; // 5% GST
  const finalTotal = Math.max(0, subtotal + deliveryFee + tax - discountAmount);

  const elemSubtotal = document.getElementById("cartSubtotal");
  const elemDelivery = document.getElementById("cartDeliveryFee");
  const elemTax = document.getElementById("cartTax");
  const elemTotal = document.getElementById("cartTotal");
  const discountLine = document.getElementById("discountLine");
  const elemDiscount = document.getElementById("cartDiscount");

  if (elemSubtotal) elemSubtotal.textContent = `₹${subtotal.toFixed(0)}`;
  if (elemDelivery) elemDelivery.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(0)}`;
  if (elemTax) elemTax.textContent = `₹${tax.toFixed(0)}`;
  if (elemTotal) elemTotal.textContent = `₹${finalTotal.toFixed(0)}`;

  if (discountLine && elemDiscount) {
    if (discountAmount > 0) {
      discountLine.classList.remove("d-none");
      elemDiscount.textContent = `-₹${discountAmount.toFixed(0)}`;
    } else {
      discountLine.classList.add("d-none");
    }
  }

  const checkoutPayable = document.getElementById("checkoutPayableTotal");
  if (checkoutPayable) checkoutPayable.textContent = `₹${finalTotal.toFixed(0)}`;
}

// --------------------------------------------------------------------------
// PROMO CODE HANDLING
// --------------------------------------------------------------------------
function applyPromoCodeDirect(code) {
  const couponInput = document.getElementById("couponCodeInput");
  if (couponInput) couponInput.value = code;
  
  const offcanvasEl = document.getElementById("cartOffcanvas");
  if (offcanvasEl) {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
    bsOffcanvas.show();
  }

  applyCouponFromInput();
}

function applyCouponFromInput() {
  const couponInput = document.getElementById("couponCodeInput");
  const statusBadge = document.getElementById("couponStatusBadge");

  if (!couponInput || !statusBadge) return;

  const code = couponInput.value.trim().toUpperCase();
  const subtotal = cartState.reduce((sum, e) => sum + (e.item.price * e.quantity), 0);

  if (!code) {
    statusBadge.className = "small mb-2 text-danger";
    statusBadge.textContent = "Please enter a coupon code.";
    statusBadge.classList.remove("d-none");
    return;
  }

  const coupon = VALID_COUPONS[code];

  if (!coupon) {
    statusBadge.className = "small mb-2 text-danger";
    statusBadge.textContent = "Invalid coupon code.";
    statusBadge.classList.remove("d-none");
    appliedCoupon = null;
    updateCartUI();
    return;
  }

  if (subtotal < coupon.min) {
    statusBadge.className = "small mb-2 text-warning";
    statusBadge.textContent = `Minimum order amount of ₹${coupon.min} required for this code.`;
    statusBadge.classList.remove("d-none");
    appliedCoupon = null;
    updateCartUI();
    return;
  }

  appliedCoupon = coupon;
  statusBadge.className = "small mb-2 text-success fw-bold";
  statusBadge.textContent = `Applied: ${coupon.label}`;
  statusBadge.classList.remove("d-none");

  updateCartUI();
  showToast("Coupon Applied", `${coupon.label} active!`, "success");
}

// --------------------------------------------------------------------------
// CHECKOUT & CONTACT FLOW
// --------------------------------------------------------------------------
function openCheckoutModal() {
  if (cartState.length === 0) return;

  const offcanvasEl = document.getElementById("cartOffcanvas");
  if (offcanvasEl) {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
  }

  const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  checkoutModal.show();
}

function handlePlaceOrder(event) {
  event.preventDefault();

  const name = document.getElementById("checkoutName").value;
  const address = document.getElementById("checkoutAddress").value;
  const orderId = "AF-IN-" + Math.floor(100000 + Math.random() * 900000);

  const modalEl = document.getElementById("checkoutModal");
  const bsModal = bootstrap.Modal.getInstance(modalEl);
  if (bsModal) bsModal.hide();

  cartState = [];
  appliedCoupon = null;
  updateCartUI();

  showToast("Order Confirmed! 🎉", `Thank you ${name}! Order ${orderId} placed. Express delivery to ${address.slice(0, 25)}...`, "success");
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contactForm");
  if (form) form.reset();

  showToast("Message Sent", "Thank you for contacting Aura Feast! Our support team will reply shortly.", "success");
}

// --------------------------------------------------------------------------
// TOAST NOTIFICATIONS
// --------------------------------------------------------------------------
function showToast(title, message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toastId = "toast-" + Date.now();
  const icon = type === "success" ? "bi-check-circle-fill text-success" : "bi-info-circle-fill text-info";

  const toastHTML = `
    <div id="${toastId}" class="toast liquid-toast align-items-center border-0 show" role="alert">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-3">
          <i class="bi ${icon} fs-4"></i>
          <div>
            <h6 class="mb-0 fw-bold">${title}</h6>
            <small class="text-muted">${message}</small>
          </div>
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", toastHTML);

  setTimeout(() => {
    const elem = document.getElementById(toastId);
    if (elem) elem.remove();
  }, 4000);
}
