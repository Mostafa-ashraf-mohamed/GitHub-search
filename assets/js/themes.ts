const themesBtn = document.getElementById(
  "themes-btn"
) as HTMLInputElement | null;
if (themesBtn != null) {
  themesBtn.addEventListener("click", () => {
    themesBtn.classList.toggle("rotate-180");
    document.body.classList.toggle("light-theme");
  });
} else {
  throw new Error("themes: themes-btn is not defined");
}
