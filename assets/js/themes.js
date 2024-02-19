var themesBtn = document.getElementById("themes-btn");
if (themesBtn != null) {
    themesBtn.addEventListener("click", function () {
        themesBtn.classList.toggle("rotate-180");
        document.body.classList.toggle("light-theme");
    });
}
else {
    throw new Error("themes: themes-btn is not defined");
}
