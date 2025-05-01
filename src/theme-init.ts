
// Simple script to initialize the theme based on localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const root = document.documentElement;
  
  if (savedTheme === "dark") {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  } else {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  }
}

export default initializeTheme;
