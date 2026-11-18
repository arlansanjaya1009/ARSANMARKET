alert("PRODUCTS JS JALAN");
const products = [
  {
    id: 1,
    name: "Akun Sultan Free Fire",
    category: "Free Fire",
    price: 150000,
    description: "Skin langka • Banyak bundle",
    image: "https://placehold.co/600x400/171326/a783ff?text=FREE+FIRE"
  },
  {
    id: 2,
    name: "Akun Free Fire Elite",
    category: "Free Fire",
    price: 85000,
    description: "Bundle premium • Rank tinggi",
    image: "https://placehold.co/600x400/171326/a783ff?text=FF+ELITE"
  },
  {
    id: 3,
    name: "Akun Mobile Legends",
    category: "Mobile Legends",
    price: 200000,
    description: "Skin Epic • Banyak hero",
    image: "https://placehold.co/600x400/171326/738dff?text=MOBILE+LEGENDS"
  },
  {
    id: 4,
    name: "Akun MLBB Collector",
    category: "Mobile Legends",
    price: 350000,
    description: "Skin Collector • Banyak skin",
    image: "https://placehold.co/600x400/171326/738dff?text=MLBB+COLLECTOR"
  },
  {
    id: 5,
    name: "Akun PUBG Mobile",
    category: "PUBG",
    price: 175000,
    description: "Outfit premium • Senjata skin",
    image: "https://placehold.co/600x400/171326/ffbd59?text=PUBG+MOBILE"
  },
  {
    id: 6,
    name: "Akun PUBG Sultan",
    category: "PUBG",
    price: 450000,
    description: "Inventory lengkap • Outfit langka",
    image: "https://placehold.co/600x400/171326/ffbd59?text=PUBG+SULTAN"
  }
];

let activeCategory = "Semua";

/**
 * @param {number} price
 * @returns {string}
 */
function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}

function renderProducts() {
  const container = document.getElementById("product-list");
  const searchInput = document.getElementById("search");

  if (!container) return;

  const keyword = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const filteredProducts = products.filter(function(product) {
    const categoryMatch =
      activeCategory === "Semua" ||
      product.category === activeCategory;

    const searchMatch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);

    return categoryMatch && searchMatch;
  });

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <p class="empty-products">
        Produk tidak ditemukan.
      </p>
    `;
    return;
  }

  container.innerHTML = filteredProducts.map(function(product) {
    return `
      <article class="product-card">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <div class="product-info">
          <span class="product-category">
            ${product.category}
          </span>

          <h3>${product.name}</h3>

          <p class="product-description">
            ${product.description}
          </p>

          <div class="product-price">
            ${formatRupiah(product.price)}
          </div>

          <button
            class="add-button"
            onclick="addToCart(${product.id})"
          >
            + Tambah Keranjang
          </button>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * @param {string} category
 * @param {HTMLElement} button
 */
function filterCategory(category, button) {
  activeCategory = category;

  document.querySelectorAll(".category").forEach(function(item) {
    item.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  renderProducts();
}

document.querySelectorAll(".category").forEach(function(button) {
  button.addEventListener("click", function() {
    filterCategory(button.dataset.category, button);
  });
});

const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

renderProducts();