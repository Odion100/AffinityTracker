console.log(window);
alert("test_script.js");
if (window.utag_data)
  alert(`The product category is ${window.utag_data.product_category}`);
else alert("Failed to access gloable Variable!");

//everytime the user visits new page

//fire event everytime the user adds an item to the cart
const cartButton = document.querySelector(".c-product-add-to-cart__button");

if (cartButton) {
  let count = 0;
  cartButton.addEventListener("click", () => {
    count++;
    console.log(`added to cart: ${count}`);
  });
}
