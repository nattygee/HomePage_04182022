const squarecarousel = document.getElementById("squarousel");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
var squareRotation = 0;

previousButton.addEventListener("click", () => {
    console.log("previous button clicked");
    console.log(squareRotation);
    squareRotation -= 30;
    squarecarousel.style.transform = `rotate(${squareRotation}deg)`;
});
nextButton.addEventListener("click", () => {
    console.log("next button clicked");
    squareRotation += 30;
    squarecarousel.style.transform = `rotate(${squareRotation}deg)`;
});