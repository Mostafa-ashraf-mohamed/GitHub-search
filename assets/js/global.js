function responsiveStyle() {
    var searchInput = document.getElementById("search");
    if (searchInput === null) {
        throw new Error("responsive Style: search is not defined");
    }
    if (window.innerWidth <= 576) {
        // Apply mobile styles
        searchInput.placeholder = "Search...";
        // Add more mobile-specific styles here
    }
    else {
        searchInput.placeholder = "Search In GitHub API...";
    }
}
responsiveStyle();
window.addEventListener("resize", responsiveStyle);
