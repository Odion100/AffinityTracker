console.log(window);
alert("test_script.js");
if (window.utag_data)
  alert(`The product category is ${window.utag_data.product_category}`);
else alert("Failed to access gloable Variable!");
