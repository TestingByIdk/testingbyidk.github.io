console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function(button) {

        button.addEventListener("click", function() {

            const panel = this.nextElementSibling;

            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }

        });

    });

});
