// local storage se link taki seedhe na hat jaye

document.addEventListener('DOMContentLoaded', () => {
    //saare element ka const baby
    let product1 ={ id:1, price:300, name : "shoes"};
    let product2 ={ id:2, price:500,name :"shirts"};
    let product3 ={ id:3 , price:600,name:"silver" };

    let products =[product1,product2,product3];
    let cart =JSON.parse.localStorage.getItem(cart) || [];

    const emptyCartMessage = document.getElementById("empty-cart");
    const checkoutbtn = document.getElementById("checkout-btn");
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = document.getElementById("total-price");
    

    // product list show karna
      for(let i=0;i<3;i++){
        let productItem = document.createElement("div");
        productItem.innerHTML =`<span>${products[i].name}-$${products[i].price}</span>
        <button data-id="${products[i].id}">add to cart</button>`;
        productItem.classList.add("product");
        productList.appendChild(productItem);
        }
    // add wale se button se add to cart karna
    productList.addEventListener('click', (e)=>{
    if (e.target.tagName == "BUTTON") {
        let itemId =parseInt(e.target.getAttribute("data-id"));
        let item = products.find((p) =>p.id === itemId);
        cart.push(item);
        renderCart();
    }
    })
    //render wala funstion cart ke item show karna cart me empty message hatana aur cart total bhi
    function renderCart(){
        cartItems.innerHTML="";
        let total =0
        if(cart.length >0){
            emptyCartMessage.classList.add("hidden");
            cartTotal.classList.remove("hidden");
            //cart ke saare item push karna scrren pe
            cart.forEach((item , index) =>{
                total =total + item.price;
                let cartElement = document.createElement("div");
                cartElement.innerHTML =`<span>${item.name}-  $${item.price}</span>
                                        <button>remove element</button>`;
                                        cartElement.classList.add("product")
                                        cartItems.appendChild(cartElement);
            })
            // total price daal do
            totalPrice.textContent =`$ ${total}`;
        }
        else{
            emptyCartMessage.classList.remove("hidden");
            totalPrice.textContent = `$0.00`;
        }
    }
    //checkout wala function
    checkoutbtn.addEventListener("click",()=>{
        cart.length =0;
        emptyCartMessage.classList.remove("hidden");
        renderCart();
        cartTotal.classList.add("hidden")
        alert("deal has beeen struck")
    })
    

})