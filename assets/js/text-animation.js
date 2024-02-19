function animationTextWrite(targetId, interval, startFrom) {
    if (interval === void 0) { interval = 100; }
    if (startFrom === void 0) { startFrom = 0; }
    var element = document.getElementById(targetId);
    if (element === null) {
        throw new Error("animationTextWrite: cannot find element");
    }
    var message = element.textContent || "animation Text Write";
    var currentIndex = startFrom;
    element.textContent = "";
    var animationInterval = setInterval(function () {
        if (currentIndex < message.length) {
            element.textContent += message.charAt(currentIndex);
            currentIndex++;
        }
        else {
            clearInterval(animationInterval);
        }
    }, interval);
}
animationTextWrite("header-text");
