function createStars() {
  const container = document.querySelector("body");

  for (let i = 0; i < 1000; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = ".1px";
    star.style.height = ".1px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    // Assign random animation delay for blinking effect
    const randomDelay = Math.random() * 5; // Delay between 0 to 5 seconds
    star.style.animationDelay = `${randomDelay}s`;

    container.appendChild(star);
  }
}

createStars();
