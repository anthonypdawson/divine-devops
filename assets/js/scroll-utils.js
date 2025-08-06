// Simple scroll utility for smooth scrolling to any selector
function scrollToElement(selector, options = { behavior: 'smooth', block: 'start' }) {
  var el = document.querySelector(selector);
  if (el) el.scrollIntoView(options);
}

// Optionally, expose globally for inline event handlers
window.scrollToElement = scrollToElement;
