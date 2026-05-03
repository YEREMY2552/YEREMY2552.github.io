// Reemplaza el enlace de abajo por el tuyo de Google Sheets (el que termina en output=csv)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTuBEsYxq9GP-C8cASsPouBS5_6f7Po-vXUXcRd7Ag9QkILqBrdBg0nYWrNLNon3up40N2vGiwOrUT9/pub?output=csv';

let products = []; // La lista empezará vacía

async function loadProductsFromSheet() {
    try {
        console.log("Iniciando conexión con Google Sheets...");
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("No se pudo conectar con Google");
        
        const data = await response.text();
        const rows = data.trim().split(/\r?\n/).slice(1); 

        products = rows.map((row, index) => {
            let cols = row.split(',');
            if (cols.length < 5) cols = row.split(';');

            // Dentro de loadProductsFromSheet, en el products = rows.map...
            return {
                id: parseInt(cols[0]) || index + 1,
                name: cols[1]?.trim().replace(/"/g, ""),
                price: parseFloat(cols[2]?.toString().replace(/[^\d,.]/g, '').replace(',', '.')) || 0,
                category: cols[3] ? cols[3].trim().toLowerCase() : "todos",
                description: cols[4]?.trim().replace(/"/g, ""),
                image: cols[5]?.trim(),
                stock: parseInt(cols[6]) || 0 // <--- Nueva columna de Stock
            };
        });

        // ESTA LÍNEA ES CLAVE: Muestra los productos apenas cargan
        displayProducts(products); 

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

function displayProducts(productsToShow) {
    const container = document.getElementById('productContainer');
    if (!container) return;
    container.innerHTML = ""; 

    productsToShow.forEach(product => {
        const isOutOfStock = product.stock <= 0; // Verifica si no hay stock
        const productCard = document.createElement('div');
        productCard.className = `product-card ${isOutOfStock ? 'no-stock' : ''}`;
        
        productCard.innerHTML = `
            ${isOutOfStock ? '<div class="out-of-stock-label">Agotado</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-btn" 
                    ${isOutOfStock ? 'disabled' : `onclick="addToCart(${product.id})"`}>
                    ${isOutOfStock ? 'Sin Stock' : '<span>🛒</span> Agregar al Carrito'}
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}


// Ejecutar la carga al iniciar la página
window.onload = () => {
    loadProductsFromSheet();
    loadCartFromLocalStorage();
    updateCartCount();
};

// Carrito
let cart = [];
let filteredProducts = [...products];
let currentCategory = "all";
let currentMaxPrice = 150;


// --- FUNCIONES DE FILTRADO ---

function filterByCategory(category, button) {
    // Actualiza visualmente el botón activo
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    currentCategory = category.toLowerCase();
    applyFilters();
}

function filterByPrice() {
    const priceRange = document.getElementById('priceRange');
    currentMaxPrice = parseInt(priceRange.value, 10);
    document.getElementById('priceValue').textContent = currentMaxPrice;
    applyFilters();
}

function applyFilters() {
    // 1. Filtrar la lista base de productos
    filteredProducts = products.filter(product => {
        const categoryMatch = 
            currentCategory === 'all' || 
            currentCategory === 'todos' || 
            product.category === currentCategory;
        
        const priceMatch = product.price <= currentMaxPrice;
        
        return categoryMatch && priceMatch;
    });

    // 2. Aplicar búsqueda por texto si hay algo escrito
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput)
        );
    }

    // 3. Dibujar los productos filtrados en pantalla
    displayProducts(filteredProducts);
}

// Búsqueda en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            applyFilters();
        });
    }
});

// Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Capturamos el botón específico que fue presionado
    const btn = event.target.closest('.add-btn');
    const originalContent = btn.innerHTML;

    // 1. Fase de Carga: Feedback visual inmediato
    btn.classList.add('loading');

    // Simulamos un pequeño retraso para procesar (400ms)
    setTimeout(() => {
        // Lógica de datos del carrito
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        saveCartToLocalStorage();
        updateCartCount();
        updateCartDisplay();

        // 2. Fase de Éxito: Confirmación visual
        btn.classList.remove('loading');
        btn.classList.add('success');
        btn.innerHTML = "¡Añadido! ✨";

        // 3. Restauración: Volver al estado original tras 1.5 segundos
        setTimeout(() => {
            btn.classList.remove('success');
            btn.innerHTML = originalContent;
        }, 1200);

    }, 500); 
}

// Mostrar notificación
function showNotification(message) {
    // Simple notificación (puede mejorarse)
    console.log('✓ ' + message);
}

// Mostrar/Ocultar carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCartToLocalStorage();
        updateCartCount();
        updateCartDisplay();
    }
}

// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
}

// Actualizar número de artículos en carrito
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">Tu carrito está vacío</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="width: 30px; text-align: center; line-height: 25px;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Limpiar carrito
function clearCart() {
    if (confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
        cart = [];
        saveCartToLocalStorage();
        updateCartCount();
        updateCartDisplay();
    }
}

// Procesar compra
function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const adelanto = total * 0.50;
    const miWhatsApp = "51907577763"; // Tu número configurado

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Finalizar Pedido</h2>
            <p>Total a pagar: <strong>$${total.toFixed(2)}</strong></p>
            <p>Para reservar se requiere un adelanto del 50% ($${adelanto.toFixed(2)})</p>
            
            <div style="margin-bottom: 15px; text-align: left;">
                <input type="text" id="userName" placeholder="Tu nombre completo" style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid #ddd;">
                <input type="tel" id="userPhone" placeholder="Número de contacto" style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid #ddd;">
            </div>

            <button id="btnReserva" class="checkout-btn" style="background:#ff69b4; margin-bottom:10px;">
                ✅ Reservar con 50%
            </button>
            <button id="btnInformacion" class="checkout-btn" style="background:#666; margin-bottom:10px;">
                💬 Solo pedir información
            </button>
            <button onclick="this.parentElement.parentElement.remove()" class="modal-close" style="background:none; color:#999; text-decoration:underline;">
                Cancelar
            </button>
        </div>
    `;
    document.body.appendChild(modal);

    // ASIGNACIÓN CORRECTA DE EVENTOS (AQUÍ ESTABA EL FALLO)
    document.getElementById('btnReserva').addEventListener('click', () => {
        enviarWhatsApp("RESERVA (50% Adelanto)", miWhatsApp, total, adelanto);
    });

    document.getElementById('btnInformacion').addEventListener('click', () => {
        enviarWhatsApp("SOLICITUD DE INFORMACIÓN", miWhatsApp, total, null);
    });
}

// 1. La URL debe estar fuera de la función
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyt4C9-IkVgWCdhIKvsM-2py3fOKqaSqviWvFCTApjK_oIOLVwJgzAxSJhETrUriFRRfg/exec'; 

// 2. Función corregida (sin duplicados y con cierres correctos)
async function enviarWhatsApp(tipo, telefono, total, adelanto) {
    const nombre = document.getElementById('userName').value.trim();
    const fono = document.getElementById('userPhone').value.trim();

    if (!nombre || !fono) {
        alert("Por favor, ingresa tu nombre y número.");
        return;
    }

    // Lógica para descontar stock en Google Sheets
    if (tipo.includes("RESERVA")) {
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
        });
    }

    let mensaje = `*${tipo}*%0A%0A`;
    mensaje += `Hola, soy *${nombre}* y contacto desde la web.%0A`;
    mensaje += `*Pedido:*%0A`;
    
    cart.forEach(item => {
        mensaje += `- ${item.quantity}x ${item.name}%0A`;
    });

    if (adelanto !== null) {
        mensaje += `%0ATotal: $${total.toFixed(2)}%0A`;
        mensaje += `*Adelanto (50%): $${adelanto.toFixed(2)}*%0A%0A`;
        mensaje += `⚠️ *Por favor, adjunte su captura de transferencia.*`;
    }

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
    
    // Limpiar carrito y cerrar modal
    cart = [];
    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
    
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
} 

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('🌸 CamiApp: Service Worker registrado con éxito'))
            .catch(err => console.warn('Error al registrar SW', err));
    });
}
