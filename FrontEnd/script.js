document.addEventListener("DOMContentLoaded", function () {
    const ctaButtons = document.querySelectorAll(".cta-button");

    ctaButtons.forEach((button) => {
        button.addEventListener("click", () => {
            alert("Get Started with CodeConvert for FREE!");
        });
    });
});
