//ensure this module has its onw namespace
(() => {
  console.log("test_script.js");
  const targetCategories = ["Womens", "Mens", "Home", "Lifestyle", "Beaut"];

  const recordAffinity = (categories, points) => {
    //get serialized CSE_Challange object for storing affinity data
    const affinities = JSON.parse(localStorage.getItem("CSE_Challenge")) || {};
    //increment product category affinities by the given points
    categories.forEach(category => {
      if (targetCategories.indexOf(category) > -1)
        affinities[category] += points;
    });
    //re-serialize the CSE_challange object
    localStorage.setItem("CSE_Challenge", JSON.stringify(affinities));
  };

  //everytime the user visits new page this script will run
  //if the utag_data object exists then record user affinity for product categories
  if (window.utag_data) {
    //use localStorage to save the last url you record affinity for
    //so that refreshing doesn't increment affinity
    if (
      window.utag_data["dom.url"] !=
        localStorage.getItem("last_affinity_url") &&
      Array.isArray(window.utag_data.product_category)
    ) {
      recordAffinity(window.utag_data.product_category, 1);
      localStorage.setItem("last_affinity_url", window.utag_data["dom.url"]);
    }

    console.log(`The product category is ${window.utag_data.product_category}`);
  }
  //select the add to cart button if it exists in the DOM
  const cartButton = document.querySelector(".c-product-add-to-cart__button");

  if (cartButton) {
    //fire event everytime the user clicks add to cart button
    cartButton.addEventListener("click", e => {
      console.log(`added to cart`, e);
      recordAffinity(window.utag_data.product_category, 3);
    });
  }
})();
