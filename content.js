//insert affinity_tracker.js script into the Dom
// REMINDER: affinity_tracker.js needs to be added to web_accessible_resources in manifest.json
const _script = document.createElement("script");
_script.src = chrome.runtime.getURL("affinity_tracker.js");
_script.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(_script);
