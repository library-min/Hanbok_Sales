document.addEventListener('DOMContentLoaded', () => {
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            if (cartCount > 0) {
                cartCountElement.style.display = 'inline-block';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    }

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'inline-block' : 'none';
        }
    }

    // --- Sample Product Data ---
    const products = [
        { id: 1, name: '데일리 생활 한복', price: 180000, type: 'daily', colors: ['white', 'red', 'blue', 'green'], image: 'images/Daily Hanbok.png', description: '편안하고 세련된 디자인의 생활 한복입니다.' },
        { id: 2, name: '명절 맞이 한복', price: 320000, type: 'holiday', colors: ['white', 'red', 'blue', 'green'], image: 'images/Holiday Hanbok.png', description: '명절에 입기 좋은 화사한 색감의 한복입니다.' },
        { id: 3, name: '혼주 및 예복 한복', price: 550000, type: 'wedding', colors: ['white', 'red', 'blue', 'green'], image: 'images/Ceremonial and Formal Hanbok.png', description: '결혼식 등 특별한 날을 위한 고급 한복입니다.' }
    ];

    // --- Contact Form Logic ---
    const contactForm = document.querySelector('#contact form');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (contactForm && confirmationMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactForm.style.display = 'none';
            confirmationMessage.style.display = 'block';
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
                contactForm.style.display = 'flex';
                contactForm.reset();
            }, 5000);
        });
    }

    // --- Gallery Page Logic ---
    const galleryGrid = document.querySelector('.gallery-grid');
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');

    function renderProducts(filteredProducts) {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            galleryGrid.innerHTML = '<p style="text-align: center; width: 100%;">해당 조건의 상품이 없습니다.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'animate-on-scroll';
            itemWrapper.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="gallery-item-link">
                    <div class="gallery-item">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price.toLocaleString()}원</p>
                        <p class="description">${product.description}</p>
                    </div>
                </a>
            `;
            galleryGrid.appendChild(itemWrapper);
        });

        const newAnimatedElements = galleryGrid.querySelectorAll('.animate-on-scroll');
        newAnimatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    function filterProducts() {
        const type = typeFilter.value;
        const price = priceFilter.value;

        let filtered = products.filter(p => {
            const typeMatch = type === 'all' || p.type === type;
            let priceMatch = false;
            switch (price) {
                case 'all': priceMatch = true; break;
                case 'under20': priceMatch = p.price < 200000; break;
                case '20to50': priceMatch = p.price >= 200000 && p.price < 500000; break;
                case 'over50': priceMatch = p.price >= 500000; break;
            }

            return typeMatch && priceMatch;
        });
        renderProducts(filtered);
    }

    if (galleryGrid && typeFilter && priceFilter) {
        renderProducts(products);
        typeFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }

    // --- Product Detail Page Logic ---
    const productDetailContainer = document.querySelector('#product-detail .container');

    function renderProductDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (!product) {
            productDetailContainer.innerHTML = '<p>상품을 찾을 수 없습니다.</p>';
            return;
        }

        // Load reviews and Q&A from localStorage
        const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
        const questions = JSON.parse(localStorage.getItem(`qa_${productId}`)) || [];

        const colorOptions = {
            red: '붉은색',
            blue: '푸른색',
            green: '초록색',
            white: '흰색'
        };

        const colorSwatches = product.colors.map((color, index) => 
            `<div class="color-swatch ${index === 0 ? 'active' : ''}" data-color="${color}" style="background-color: ${color};" title="${colorOptions[color]}"></div>`
        ).join('');

        const reviewsHtml = reviews.length > 0 ? reviews.map(r => `
            <div class="review-item">
                <p class="review-author"><strong>${r.name}</strong></p>
                <p>${r.comment}</p>
            </div>
        `).join('') : '<p>아직 리뷰가 없습니다.</p>';

        const qaHtml = questions.length > 0 ? questions.map(q => `
            <div class="qa-item">
                <p class="qa-author"><strong>${q.name}</strong></p>
                <p>${q.question}</p>
            </div>
        `).join('') : '<p>아직 Q&A가 없습니다.</p>';

        productDetailContainer.innerHTML = `
            <div class="product-image animate-on-scroll">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info animate-on-scroll">
                <h1>${product.name}</h1>
                <p class="price">${product.price.toLocaleString()}원</p>
                <p class="description">${product.description}</p>
                <div class="color-selection">
                    <label>색상</label>
                    <div class="color-swatch-container">
                        ${colorSwatches}
                    </div>
                </div>
                <div class="size-selection">
                    <label for="size">사이즈</label>
                    <select id="size">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                    </select>
                </div>
                <div class="quantity-selection">
                    <label for="quantity">수량</label>
                    <input type="number" id="quantity" value="1" min="1">
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">장바구니에 담기</button>
            </div>
            <div class="product-tabs animate-on-scroll">
                <div class="tab-buttons">
                    <button class="tab-button active" data-tab="details">상세 정보</button>
                    <button class="tab-button" data-tab="reviews">리뷰 (${reviews.length})</button>
                    <button class="tab-button" data-tab="qa">Q&A (${questions.length})</button>
                </div>
                <div class="tab-content">
                    <div id="details" class="tab-pane active">
                        <p>${product.description}</p>
                        <p>모든 고운 한복은 숙련된 장인의 손에서 탄생합니다. 전통 기법과 현대적인 디자인이 조화를 이루어, 편안하면서도 우아한 실루엣을 자랑합니다.</p>
                    </div>
                    <div id="reviews" class="tab-pane">
                        <div class="review-list">${reviewsHtml}</div>
                        <form id="review-form" class="review-form">
                            <h4>리뷰 작성하기</h4>
                            <div class="form-group">
                                <input type="text" id="review-name" placeholder="이름" required>
                            </div>
                            <div class="form-group">
                                <textarea id="review-comment" placeholder="리뷰를 작성해주세요." rows="4" required></textarea>
                            </div>
                            <button type="submit">리뷰 등록</button>
                        </form>
                    </div>
                    <div id="qa" class="tab-pane">
                        <div class="qa-list">${qaHtml}</div>
                        <form id="qa-form" class="review-form">
                            <h4>Q&A 작성하기</h4>
                            <div class="form-group">
                                <input type="text" id="qa-name" placeholder="이름" required>
                            </div>
                            <div class="form-group">
                                <textarea id="qa-question" placeholder="질문을 작성해주세요." rows="4" required></textarea>
                            </div>
                            <button type="submit">질문 등록</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const newAnimatedElements = productDetailContainer.querySelectorAll('.animate-on-scroll');
        newAnimatedElements.forEach(element => observer.observe(element));

        addTabEventListeners();
        addColorSwatchEventListeners();
        addCartEventListener();
        addReviewSubmitListener(productId);
        addQASubmitListener(productId);
    }

    function addReviewSubmitListener(productId) {
        const reviewForm = document.getElementById('review-form');
        if (!reviewForm) return;
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('review-name').value;
            const comment = document.getElementById('review-comment').value;
            const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
            reviews.push({ name, comment });
            localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
            renderProductDetail(); // Re-render to show the new review
        });
    }

    function addQASubmitListener(productId) {
        const qaForm = document.getElementById('qa-form');
        if (!qaForm) return;
        qaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('qa-name').value;
            const question = document.getElementById('qa-question').value;
            const questions = JSON.parse(localStorage.getItem(`qa_${productId}`)) || [];
            questions.push({ name, question });
            localStorage.setItem(`qa_${productId}`, JSON.stringify(questions));
            renderProductDetail(); // Re-render to show the new Q&A
        });
    }

    function addColorSwatchEventListeners() {
        const swatches = document.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
            });
        });
    }

    function addTabEventListeners() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(button.dataset.tab).classList.add('active');
            });
        });
    }

    function addCartEventListener() {
        const addToCartButton = document.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', () => {
            const productId = parseInt(addToCartButton.dataset.id);
            const quantity = parseInt(document.getElementById('quantity').value);
            const size = document.getElementById('size').value;
            const selectedColorEl = document.querySelector('.color-swatch.active');
            const color = selectedColorEl ? selectedColorEl.dataset.color : null;

            if (!color) {
                alert('색상을 선택해주세요.');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingProductIndex = cart.findIndex(item => item.id === productId && item.size === size && item.color === color);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push({ id: productId, quantity, size, color });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('장바구니에 상품이 담겼습니다.');
            updateCartCounter();
        });
    }

    if (productDetailContainer) {
        renderProductDetail();
    }

    // --- Cart Page Logic ---
    const cartContainer = document.querySelector('#cart .cart-container');
    const cartSummary = document.querySelector('#cart .cart-summary');

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartPage(); // Re-render the cart every time it's updated
        updateCartCounter();
    }

    function updateCartItem(cartItemId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => `${item.id}-${item.size}-${item.color}` === cartItemId);

        if (itemIndex > -1 && newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else if (itemIndex > -1) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        }
        saveCart(cart);
    }

    function removeCartItem(cartItemId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => `${item.id}-${item.size}-${item.color}` !== cartItemId);
        saveCart(updatedCart);
    }

    function renderCartPage() {
        if (!cartContainer) return; // Only run on cart page

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = ''; // Clear previous content
        cartSummary.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>장바구니가 비어있습니다.</p>';
            return;
        }

        let subtotal = 0;

        const colorOptions = {
            red: '붉은색',
            blue: '푸른색',
            green: '초록색',
            white: '흰색'
        };

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return; // Skip if product not found

            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            const cartItemId = `${item.id}-${item.size}-${item.color}`;

            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>사이즈: ${item.size}</p>
                    <p>색상: ${colorOptions[item.color] || item.color}</p>
                    <p>가격: ${product.price.toLocaleString()}원</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" data-item-id="${cartItemId}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-item-id="${cartItemId}">
                    <button class="quantity-btn plus-btn" data-item-id="${cartItemId}">+</button>
                </div>
                <div class="cart-item-total">
                    ${itemTotal.toLocaleString()}원
                </div>
                <div class="cart-item-remove">
                    <button data-item-id="${cartItemId}">×</button>
                </div>
            `;
            cartContainer.appendChild(cartItemEl);
        });

        // Render summary
        cartSummary.innerHTML = `
            <h3>주문 요약</h3>
            <p>총 상품 금액: <span>${subtotal.toLocaleString()}원</span></p>
            <p>배송비: <span>0원</span></p>
            <p class="total">총 주문 금액: <span>${subtotal.toLocaleString()}원</span></p>
        `;

        // Add event listeners for new elements
        document.querySelectorAll('.cart-item-quantity input').forEach(input => {
            input.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                const cartItemId = e.target.dataset.itemId;
                updateCartItem(cartItemId, newQuantity);
            });
        });

        document.querySelectorAll('.cart-item-quantity .quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItemId = e.target.dataset.itemId;
                const input = e.target.parentNode.querySelector('input[type="number"]');
                let newQuantity = parseInt(input.value);
                if (e.target.classList.contains('plus-btn')) {
                    newQuantity++;
                } else if (e.target.classList.contains('minus-btn')) {
                    newQuantity--;
                }
                updateCartItem(cartItemId, newQuantity);
            });
        });

        document.querySelectorAll('.cart-item-remove button').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItemId = e.target.dataset.itemId;
                removeCartItem(cartItemId);
            });
        });
    }

    // Initial setup
    updateCartCounter();

    // Initial setup
    updateCartCounter();

    if (cartContainer) {
        renderCartPage();
    }

    // --- Checkout Page Logic ---
    const checkoutForm = document.getElementById('checkout-form');

    function renderCheckoutPage() {
        if (!checkoutForm) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const summaryItemsContainer = document.getElementById('order-summary-items');
        const summaryTotalContainer = document.getElementById('order-summary-total');
        summaryItemsContainer.innerHTML = '';
        summaryTotalContainer.innerHTML = '';

        if (cart.length === 0) {
            summaryItemsContainer.innerHTML = '<p>장바구니가 비어있어 결제를 진행할 수 없습니다.</p>';
            document.querySelector('.checkout-form-container').style.display = 'none';
            return;
        }

        let subtotal = 0;
        const colorOptions = { red: '붉은색', blue: '푸른색', green: '초록색', white: '흰색' };

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;

            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            const summaryItemEl = document.createElement('div');
            summaryItemEl.className = 'summary-item';
            summaryItemEl.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="summary-item-img">
                <div class="summary-item-info">
                    <h4>${product.name}</h4>
                    <p>${item.quantity}개 / ${item.size} / ${colorOptions[item.color] || item.color}</p>
                </div>
                <div class="summary-item-price">${itemTotal.toLocaleString()}원</div>
            `;
            summaryItemsContainer.appendChild(summaryItemEl);
        });

        summaryTotalContainer.innerHTML = `
            <p>총 상품 금액: <span>${subtotal.toLocaleString()}원</span></p>
            <p>배송비: <span>0원</span></p>
            <p class="total">총 주문 금액: <span>${subtotal.toLocaleString()}원</span></p>
        `;
    }

    if (checkoutForm) {
        renderCheckoutPage();

        const sameAsOrderCheckbox = document.getElementById('same-as-order');
        sameAsOrderCheckbox.addEventListener('change', (e) => {
            const orderName = document.getElementById('order-name').value;
            const orderPhone = document.getElementById('order-phone').value;
            if (e.target.checked) {
                document.getElementById('shipping-name').value = orderName;
                document.getElementById('shipping-phone').value = orderPhone;
            } else {
                document.getElementById('shipping-name').value = '';
                document.getElementById('shipping-phone').value = '';
            }
        });

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelector('.checkout-container').style.display = 'none';
            document.getElementById('checkout-confirmation').style.display = 'block';
            document.querySelector('#checkout-page h2').textContent = '주문 완료';
            localStorage.removeItem('cart');
            updateCartCounter();
        });
    }
});
