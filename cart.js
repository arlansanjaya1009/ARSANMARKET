// @ts-nocheck

let cart = JSON.parse(localStorage.getItem("arsan_cart")) || [];

function saveCart() {
  localStorage.setItem("arsan_cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });

  if (!product) {
    alert("Produk tidak ditemukan!");
    return;
  }

  const existing = cart.find(function (item) {
    return item.id === productId;
  });

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  alert("Produk berhasil ditambahkan!");
}

function updateCartCount() {
  const count = document.getElementById("cart-count");

  if (!count) return;

  let total = 0;

  cart.forEach(function (item) {
    total += item.quantity;
  });

  count.textContent = total;
}

function openCart() {
  const modal = document.getElementById("cart-modal");

  if (!modal) return;

  renderCart();
  modal.classList.add("show");
}

function closeCart() {
  const modal = document.getElementById("cart-modal");

  if (!modal) return;

  modal.classList.remove("show");
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!container || !totalElement) return;

  if (cart.length === 0) {
    container.innerHTML =
      "<p style=\"text-align:center;color:#9294a5;padding:30px\">" +
      "Keranjang kamu masih kosong." +
      "</p>";

    totalElement.textContent = "Rp0";
    return;
  }

  let html = "";

  cart.forEach(function (item) {
    html +=
      "<div class=\"cart-item\">" +
      "<div>" +
      "<h3>" + item.name + "</h3>" +
      "<p>" + formatRupiah(item.price) + "</p>" +
      "<div class=\"quantity-control\">" +
      "<button onclick=\"changeQuantity(" + item.id + ", -1)\">−</button>" +
      "<span>" + item.quantity + "</span>" +
      "<button onclick=\"changeQuantity(" + item.id + ", 1)\">+</button>" +
      "</div>" +
      "</div>" +
      "<button class=\"remove-button\" onclick=\"removeFromCart(" + item.id + ")\">" +
      "Hapus" +
      "</button>" +
      "</div>";
  });

  container.innerHTML = html;

  let total = 0;

  cart.forEach(function (item) {
    total += item.price * item.quantity;
  });

  totalElement.textContent = formatRupiah(total);
}

function changeQuantity(productId, change) {
  const item = cart.find(function (product) {
    return product.id === productId;
  });

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });

  saveCart();
  updateCartCount();
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  alert("Checkout berhasil diproses!");
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});