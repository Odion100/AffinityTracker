//ensure this module has its own namespace as to not conflict with global variables
(() => {
  const targetCategories = ["womens", "mens", "home", "lifestyle", "beauty"];

  const increaseAffinity = (categories, points) => {
    //get serialized CSE_Challange object for storing affinity data
    const affinityScores =
      JSON.parse(localStorage.getItem("CSE_Challenge")) || {};
    //convert categories array to string to be compared against each targetCategories
    const str_categories = categories.join(" ").toLowerCase();

    //increment each target category's affinity by the given points
    targetCategories.forEach(category => {
      //ensure category value is not null
      affinityScores[category] = affinityScores[category] || 0;
      //use regx to match category keywords without falsely matching mens with womens
      let rx = new RegExp(`([^a-z0-9]|^)${category}`, "i");
      //if there's a match increase affinity for that category
      if (rx.test(str_categories)) affinityScores[category] += points;
    });
    //re-serialize and save the CSE_challange object
    localStorage.setItem("CSE_Challenge", JSON.stringify(affinityScores));
  };

  //everytime the user visits a new page this script will run
  //if the utag_data object exists then increase user affinity
  if (window.utag_data) {
    //use localStorage to save the last url you record affinity for
    //so that refreshing doesn't increment affinity (should i be doing this?)
    let { product_category, page_breadcrumb } = window.utag_data;
    if (
      window.utag_data["dom.url"] !=
        localStorage.getItem("last_affinity_url") &&
      Array.isArray(product_category)
    ) {
      //I noticed that the utag_data.product_category array is not always reliable
      increaseAffinity([...product_category, ...page_breadcrumb], 1);
      localStorage.setItem("last_affinity_url", window.utag_data["dom.url"]);
    }

    console.log(`The product category is ${product_category}`);
  }

  //select the add to cart button if it exists in the DOM
  const cartButton = document.querySelector(".c-product-add-to-cart__button");
  if (cartButton) {
    let { product_category, page_breadcrumb } = window.utag_data;
    //fire event everytime the user clicks add to cart button
    cartButton.addEventListener("click", e => {
      increaseAffinity([...product_category, ...page_breadcrumb], 3);
    });
  }

  //sort page content in accordance with each category's affinity score
  const categorySort = () => {
    const affinityScores = JSON.parse(localStorage.getItem("CSE_Challenge"));
    //exit early if affinityScores doesn't already exists in local store
    if (!affinityScores) return;
    //create a list of sorted categories by affinity score
    const sortedCategories = targetCategories
      .sort((a, b) => affinityScores[b] - affinityScores[a])
      .slice(0);

    //select the elements containing each category content using custom attribute
    const contentNodes = document.querySelectorAll(
      '[data-qa-module-type="categoryProductTray"]'
    );

    //sort elements
    for (let i = 0; i < contentNodes.length; i++) {
      //find out which category this node belongs to
      let category = findNodeCategory(contentNodes.item(i));
      //replace category string in sortedCategories array with the corresponding node
      let sorted_index = sortedCategories.indexOf(category);
      sortedCategories[sorted_index] = contentNodes.item(i);
    }
    //debugger;
    //loop through sorted nodes and append them to the parent element in order
    sortedCategories.forEach(item =>
      contentNodes.item(0).parentElement.appendChild(item)
    );
  };

  const findNodeCategory = node => {
    //I could find no other way to findout to which category each node belongs
    //travers the element to find the span containing the category title
    let header = node.querySelector(".c-product-tray__h2").innerText;
    //get rid of the apostrophy (Men's and Women's ) and make lowercase
    return header
      .replace("'s", "s")
      .toLowerCase()
      .trim();
  };

  //only sort content on the specified page
  if (utag_data["dom.url"] === "https://www.urbanoutfitters.com/new-arrivals")
    categorySort();
})();
