//ensure this module has its onw namespace as to not conflict with global variables
(() => {
  
  const targetCategories = ["womens", "mens", "home", "lifestyle", "beauty"];

  const increaseAffinity = (categories, points) => {
    //get serialized CSE_Challange object for storing affinity data
    const affinities = JSON.parse(localStorage.getItem("CSE_Challenge")) || {};
    //convert categories array to string to be compared against targetCategories
    const str_categories = categories.join(" ").toLowerCase();

    //increment each target category's affinity by the given points
    targetCategories.forEach(category => {
      //ensure category value is not null
      affinities[category] = affinities[category] || 0;
      //use regx to match category keywords with falsely matching mens with womens
      let rx = new RegExp(`([^a-z0-9]|^)${category}`, "i");
      //if there's a match increase affinity for that category
      if (rx.test(str_categories)) affinities[category] += points;
    });
    //re-serialize and save the CSE_challange object
    localStorage.setItem("CSE_Challenge", JSON.stringify(affinities));
  };

  //everytime the user visits new page this script will run
  //if the utag_data object exists then record user affinity for product categories
  if (window.utag_data) {
    //use localStorage to save the last url you record affinity for
    //so that refreshing doesn't increment affinity (should i be doing this?)
    if (
      window.utag_data["dom.url"] !=
        localStorage.getItem("last_affinity_url") &&
      Array.isArray(window.utag_data.product_category)
    ) {
      increaseAffinity(window.utag_data.product_category, 1);
      localStorage.setItem("last_affinity_url", window.utag_data["dom.url"]);
    }

    console.log(`The product category is ${window.utag_data.product_category}`);
  }

  //select the add to cart button if it exists in the DOM
  const cartButton = document.querySelector(".c-product-add-to-cart__button");
  if (cartButton) {
    //fire event everytime the user clicks add to cart button
    cartButton.addEventListener("click", e => {
      increaseAffinity(window.utag_data.product_category, 3);
    });
  }
})();
