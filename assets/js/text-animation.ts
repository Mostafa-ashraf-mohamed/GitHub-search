function animationTextWrite(
  targetId: string,
  interval: number = 100,
  startFrom: number = 0
): void {
  const element = document.getElementById(targetId) as HTMLElement | null;

  if (element === null) {
    throw new Error("animationTextWrite: cannot find element");
  }

  const message = element.textContent || "animation Text Write";
  let currentIndex = startFrom;

  element.textContent = "";

  const animationInterval = setInterval(() => {
    if (currentIndex < message.length) {
      element.textContent += message.charAt(currentIndex);
      currentIndex++;
    } else {
      clearInterval(animationInterval);
    }
  }, interval);
}

animationTextWrite("header-text");
