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

    const facts = [
        "I love animals.",
        "My favorite flavor is mint.",
        "I like challenges and puzzles.",
        "One of my favorite games is Kingdom Hearts 2.",
        "I love the Zombieland movies and The Maze Runner series.",
        "I love live theater.",
        "My favorite cartoon is Wander Over Yonder.",
        "I'm a Leo.",
        "My favorite school subject was math.",
        "One of my favorite personal quotes is: “If you can't beat it, flow with it.”",
        "If I could be reborn in any era, I would choose the 80s.",
        "My childhood dream job was radio host.",
        "My favorite drink is milkshakes.",
        "I used to take toys apart when I was little to see how they worked.",
        "I love bringing smiles to everyone around me.",
        "My favorite mythology creature is a mimic.",
        "I love horror movies and watching ghost videos before bed.",
        "I grew up with two sisters.",
        "My favorite animals are rats and wolves.",
        "I love very spicy food."
    ];

    const rollButton = document.getElementById("rollButton");
    const rollNumber = document.getElementById("rollNumber");
    const factText = document.getElementById("factText");

    if (rollButton) {
        rollButton.addEventListener("click", function () {
            let rolls = 0;

            const rolling = setInterval(function () {
                const randomNumber = Math.floor(Math.random() * facts.length) + 1;
                rollNumber.textContent = "#" + randomNumber;
                rolls++;

                if (rolls > 15) {
                    clearInterval(rolling);

                    const finalNumber = Math.floor(Math.random() * facts.length);
                    rollNumber.textContent = "#" + (finalNumber + 1);
                    factText.textContent = facts[finalNumber];
                }
            }, 75);
        });
    }
});
