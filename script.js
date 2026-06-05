console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function(button) {
        button.addEventListener("click", function() {
            const panel = this.nextElementSibling;
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });

    const branches = document.querySelectorAll(".tree-branch");

    branches.forEach(function(branch) {
        branch.addEventListener("click", function () {
            const leaves = this.nextElementSibling;
            leaves.style.display = leaves.style.display === "flex" ? "none" : "flex";
        });
    });

    const rollButton = document.getElementById("rollButton");
    const rollNumber = document.getElementById("rollNumber");
    const factText = document.getElementById("factText");

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

    function closeAllModals() {
        document.querySelectorAll(".modal").forEach(function(modal) {
            modal.style.display = "none";
        });
    }

    const qnaButton = document.getElementById("qnaButton");
    const qnaModal = document.getElementById("qnaModal");

    if (qnaButton && qnaModal) {
        qnaButton.addEventListener("click", function(event) {
            event.preventDefault();
            closeAllModals();
            qnaModal.style.display = "block";
        });
    }

    const phoneApp = document.getElementById("phoneApp");
    const emailApp = document.getElementById("emailApp");
    const mapsApp = document.getElementById("mapsApp");

    const phoneModal = document.getElementById("phoneModal");
    const emailModal = document.getElementById("emailModal");
    const mapsModal = document.getElementById("mapsModal");

    if (phoneApp && phoneModal) {
        phoneApp.addEventListener("click", function () {
            closeAllModals();
            phoneModal.style.display = "block";
        });
    }

    if (emailApp && emailModal) {
        emailApp.addEventListener("click", function () {
            closeAllModals();
            emailModal.style.display = "block";
        });
    }

    if (mapsApp && mapsModal) {
        mapsApp.addEventListener("click", function () {
            closeAllModals();
            mapsModal.style.display = "block";
        });
    }

    document.querySelectorAll(".modal-close").forEach(function(button) {
        button.addEventListener("click", function () {
            closeAllModals();
        });
    });

    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal")) {
            closeAllModals();
        }
    });
});
