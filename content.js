alert(`I'm on Urban Outfitters' website.`);
//document.addEventListener("DOMContentLoaded", function() {
//insert script into the Dom
alert("Document Content Loaded");
console.log(window);
let s = document.createElement("script");
// TODO: add "affinity_tracker.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL("affinity_tracker.js");
s.onload = function() {
  this.remove();
};

(document.head || document.documentElement).appendChild(s);
//});
