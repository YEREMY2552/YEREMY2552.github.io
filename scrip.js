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

        // Procesar datos del Excel
        products = rows.map((row, index) => {
            let cols = row.split(',');
            if (cols.length < 5) cols = row.split(';');

            return {
                id: parseInt(cols[0]) || index + 1,
                name: cols[1]?.trim().replace(/"/g, ""),
    
                // ESTA LÍNEA ES LA CORRECCIÓN:
                // Limpia el símbolo $, cambia comas por puntos y luego convierte a número
                 price: parseFloat(cols[2]?.toString().replace(/[^\d,.]/g, '').replace(',', '.')) || 0,
    
                category: cols[3]?.trim().toLowerCase(),
                description: cols[4]?.trim().replace(/"/g, ""),
                image: cols[5]?.trim()
};
        });

        console.log("Productos cargados:", products);
        
        // ¡ESTA ES LA CLAVE! 
        // Llamamos a loadProducts pasándole la nueva lista
        loadProducts(products); 
        
    } catch (error) {
        console.error("Error en la carga:", error);
        alert("Error al cargar productos. Revisa la consola.");
    }
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


// Cargar productos en la página
function loadProducts(productsToShow) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    if (productsToShow.length === 0) {
        productContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No hay productos que coincidan con tus criterios</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image.startsWith('http') ? product.image : './' + product.image}" 
                    onerror="this.src='https://via.placeholder.com/200?text=Cami+Detalles'"
                    alt="${product.name}" 
                    style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-btn" onclick="addToCart(${product.id})">Agregar</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Filtrar por categoría
function filterByCategory(category) {
    currentCategory = category;
    updateActiveButton(event.target);
    applyFilters();
}

// Filtrar por precio
function filterByPrice() {
    const priceRange = document.getElementById('priceRange');
    currentMaxPrice = parseInt(priceRange.value);
    document.getElementById('priceValue').textContent = currentMaxPrice;
    applyFilters();
}

// Aplicar todos los filtros
function applyFilters() {
    filteredProducts = products.filter(product => {
        const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
        const priceMatch = product.price <= currentMaxPrice;
        return categoryMatch && priceMatch;
    });

    // Aplicar búsqueda también
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput)
        );
    }

    loadProducts(filteredProducts);
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

// Actualizar botón activo
function updateActiveButton(button) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
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
    showNotification(`${product.name} agregado al carrito`);
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
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const adelanto = total * 0.50;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="border: 2px solid #ff69b4; max-width: 500px;">
            <h2>¿Qué deseas hacer? ✨</h2>
            <p>Selecciona una opción para continuar con tu pedido:</p>
            
            <div style="display: flex; gap: 10px; flex-direction: column; margin: 20px 0;">
                <button id="optSeparar" style="background: #ff69b4; color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    🔒 Reservar con el 50% ($${adelanto.toFixed(2)})
                </button>
                
                <button id="optInformacion" style="background: #f0f0f0; color: #333; padding: 15px; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ℹ️ Solo pedir información
                </button>
            </div>

            <input type="text" id="userName" placeholder="Escribe tu nombre" style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid #ddd;">
            <input type="tel" id="userPhone" placeholder="Numero de contacto" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
            
            <button class="modal-close" style="background:#4c2882; width: 100%;" onclick="this.parentElement.parentElement.remove()">Volver</button>
        </div>
    `;
    
    document.body.appendChild(modal);

    const miWhatsApp = "51907577763"; // Mi numero de telefono a donde quiero que me llego los mensajes

    // Lógica para RESERVAR
    document.getElementById('optSeparar').onclick = function() {
        enviarWhatsApp("RESERVA (50% Adelanto)", miWhatsApp, total, adelanto);
    };

    // Lógica para INFORMACIÓN
    document.getElementById('optInformacion').onclick = function() {
        enviarWhatsApp("SOLICITUD DE INFORMACIÓN", miWhatsApp, total, null);
    };
}

// Función auxiliar para construir el mensaje
function enviarWhatsApp(tipo, telefono, total, adelanto) {
    // Cambiamos 'userEmail' por 'userName' para capturar el nombre
    const nombre = document.getElementById('userName').value;
    const fono = document.getElementById('userPhone').value;

    if(!nombre || !fono) {
        alert("Por favor completa tu nombre y contacto antes de continuar");
        return;
    }

    let mensaje = `*${tipo}*%0A%0A`;
    mensaje += `Hola, soy *${nombre}* y estoy interesado en:%0A`; // Personalización con nombre
    
    cart.forEach(item => {
        mensaje += `- ${item.quantity}x ${item.name}%0A`;
    });

    if(adelanto !== null) {
        mensaje += `%0AMonto Total: $${total.toFixed(2)}%0A`;
        mensaje += `*Monto de Adelanto: $${adelanto.toFixed(2)}*%0A`;
    } else {
        mensaje += `%0AQuisiera más detalles sobre estos productos.`;
    }

    // Actualizamos la firma del mensaje
    mensaje += `%0A%0A*Cliente:* ${nombre}%0A*Contacto:* ${fono}`;
    
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
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
