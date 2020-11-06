var carts=document.querySelectorAll('.cart');

var products=[
    {
    name:'NIKE KIRMIZI AYAKKABI',
    tag:'kirmizi',
    price :150,
    inCart:0
    },
    {
    name:'NIKE YESİL AYAKKABI',
    tag:'yesil',
    price:250,
    inCart:0
    },
    {
    name:'NIKE MAVİ AYAKKABI',
    tag:'mavi',
    price:220,
    inCart:0
    },
    {
    name:'NIKE SİYAH AYAKKABI',
    tag:'siyah',
    price:180,
    inCart:0
    }
    
];

for(let i=0; i<carts.length ;i++){
    carts[i].addEventListener('click',() => {cartNumbers(products[i]);
    totalCost(products[i]); 
    displayCart();                                         
    })
    
}

function onLoadCartNumbers(){
    
    let productNumbers=localStorage.getItem('cartNumbers');
    
     if(productNumbers){
        document.querySelector('.cart1 span').textContent=productNumbers;
        document.querySelector('.shopping-cart-header span').textContent=productNumbers;
    }
}
    
function cartNumbers(product){
    
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers= parseInt(productNumbers);
    
    if( productNumbers ){
        
        localStorage.setItem('cartNumbers',productNumbers + 1);
        
        document.querySelector('.cart1 span').textContent=productNumbers+1;
        
        document.querySelector('.shopping-cart-header span').textContent=productNumbers+1;
        
    }else{
        localStorage.setItem('cartNumbers',1);
        
        document.querySelector('.cart1 span').textContent=1;
        
        document.querySelector('.shopping-cart-header span').textContent=productNumbers+1;
    }
    
    setItems(product);
}

function setItems(product){
    
    let cartItems=localStorage.getItem('productsInCart');
    
    cartItems = JSON.parse(cartItems);
    
    if(cartItems!=null)
    {
        if(cartItems[product.tag]== undefined)
            {
                cartItems={
                    ...cartItems,
                    [product.tag]:product
                }
            }
            cartItems[product.tag].inCart +=1;
        
    }
    else{
        product.inCart=1;
        cartItems={
        [product.tag]:product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    localStorage.setItem("totalCost",product.price);
    
    if(cartCost !=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    } 
    else {
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".shopping-cart-items");
    let total=document.querySelector(".shopping-cart-total span");
    let cartCost=localStorage.getItem('totalCost');
    cartCost=parseInt(cartCost);
    
    if(cartItems && productContainer ){
        
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="shopping-cart-items">
                <ion-icon name="trash-outline"></ion-icon>
                <img style="width:50px; height:50px;" src='images/${item.tag}.jpg'>
                <span> ${item.name} </span>
            </div>
            <div class="item-price">Price: ${item.price}</div>
            <div class="item-quantity>
                <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
                <span>Quantity: ${item.inCart}</span>
                <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">Total: 
                $${item.inCart * item.price},00
                </div>
`
        });     
    }
    if(total)
    {
        total.innerHTML='Total:$';
        total.innerHTML+=cartCost;
    }

}

(function(){
 
  $(".cart1").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
  });
  
})();

onLoadCartNumbers();
displayCart();
