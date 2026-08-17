document.addEventListener('DOMContentLoaded', () => {

    // Products
    let product1 = { id: 1, price: 300, name: "shoes" };
    let product2 = { id: 2, price: 500, name: "shirts" };
    let product3 = { id: 3, price: 600, name: "silver" };

    let products = [product1, product2, product3];

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Elements
    const emptyCartMessage = document.getElementById("empty-cart");
    const checkoutbtn = document.getElementById("checkout-btn");
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");

    // Initial render
    renderCart();


    // -----------------------------
    // SHOW PRODUCTS
    // -----------------------------

    for (let i = 0; i < products.length; i++) {

        let productItem = document.createElement("div");

        productItem.innerHTML = `
            <span>${products[i].name} - $${products[i].price}</span>
            <button data-id="${products[i].id}">add to cart</button>
        `;

        productItem.classList.add("product");

        productList.appendChild(productItem);
    }


    // -----------------------------
    // ADD TO CART
    // -----------------------------

    productList.addEventListener('click', (e) => {

        if (e.target.tagName === "BUTTON") {

            let itemId = parseInt(e.target.getAttribute("data-id"));

            let item = products.find((p) => p.id === itemId);

            cart.push(item);

            // Save cart to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update screen
            renderCart();
        }
    });


    // -----------------------------
    // RENDER CART
    // -----------------------------

    function renderCart() {

        // Clear existing cart items
        cartItems.innerHTML = "";

        let total = 0;

        if (cart.length > 0) {

            // Hide empty message
            emptyCartMessage.classList.add("hidden");

            // Show total
            cartTotal.classList.remove("hidden");


            // Display cart items
            cart.forEach((item, index) => {

                total = total + item.price;

                let cartElement = document.createElement("div");

                cartElement.innerHTML = `
                    <span>${item.name} - $${item.price}</span>
                    <button data-index="${index}">remove element</button>
                `;

                cartElement.classList.add("product");

                cartItems.appendChild(cartElement);
            });


            // Display total price
            totalPrice.textContent = `$ ${total}`;

        } else {

            // Cart is empty
            emptyCartMessage.classList.remove("hidden");

            cartTotal.classList.add("hidden");

            totalPrice.textContent = "$0.00";
        }
    }


    cartItems.addEventListener('click', (e) => {

        if (e.target.tagName === "BUTTON") {

            let index = parseInt(e.target.getAttribute("data-index"));
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    checkoutbtn.addEventListener("click", () => {
        cart.length = 0;
        localStorage.removeItem("cart");
        renderCart();
        alert("Deal has been struck");
    });

});