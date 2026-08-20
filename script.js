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
    const contactApps = document.querySelectorAll(".contact-app");
const contactDisplay = document.getElementById("contactDisplay");

const contactInfo = {
    phone: "📞 Phone: (613) 850-6924",
    email: "📧 Email: portelance.d.alex@gmail.com",
    maps: "🗺️ Location: Ottawa, Ontario"
};

contactApps.forEach(function(app) {
    app.addEventListener("click", function() {
        const type = app.getAttribute("data-contact");
        contactDisplay.textContent = contactInfo[type];
        contactDisplay.style.display = "block";
    });
});


    const projectItems = document.querySelectorAll(".project-item");
    const projectDisplay = document.getElementById("projectDisplay");

    const projectData = {
        needthingsdone: {
            status: "IN DEVELOPMENT",
            type: "Local Services Platform",
            title: "NeedThingsDone.ca",
            what: "A site I am building to help people find the right company for whatever they need done.",
            does: "It helps people find trusted companies for everything from dog walking to car repairs, keeps customer reviews from disappearing, and gives local family-owned businesses a fair chance to shine through a better filtering system.",
            goal: "To become one of the most trusted places in Canada for finding services — not greedy for cash, but greedy for customer smiles."
        },
        elsewhere: {
            status: "IN DEVELOPMENT",
            type: "Minecraft Horror Mod",
            title: "Elsewhere",
            what: "A Minecraft horror mod designed to put players on edge and make them question what they can trust.",
            does: "Instead of only adding monsters, it plays with paranoia: voices when you are alone, things that copy your friends, and moments that make you second-guess what is really happening.",
            goal: "To create horror that uses the player’s own mind against them by turning worry, doubt, and second-guessing into the real scare."
        },
        discordbot: {
            status: "ACTIVE / EXPERIMENTAL",
            type: "Discord Security Project",
            title: "Scam Protection Bot",
            what: "A Discord bot project built to help protect users from scam bots and account-stealing attempts.",
            does: "Instead of depending on one giant list of known scams, it watches for suspicious patterns in bot behaviour so it can catch threats while cutting down on false flags.",
            goal: "To help protect children and other users from scams before their accounts get compromised."
        }
    };

    function renderProject(key) {
        const project = projectData[key];
        if (!projectDisplay || !project) return;
        projectDisplay.innerHTML = `
            <div class="project-display-top">
                <span class="project-status-tag">${project.status}</span>
                <span class="project-type-tag">${project.type}</span>
            </div>
            <h3 id="projectTitle">${project.title}</h3>
            <div class="project-pages">
                <div class="project-page">
                    <h4>What it is</h4>
                    <p>${project.what}</p>
                </div>
                <div class="project-page">
                    <h4>What it does</h4>
                    <p>${project.does}</p>
                </div>
                <div class="project-page project-goal-page">
                    <h4>The goal</h4>
                    <p>${project.goal}</p>
                </div>
            </div>
        `;
        projectDisplay.classList.remove("project-display-animate");
        void projectDisplay.offsetWidth;
        projectDisplay.classList.add("project-display-animate");
    }

    projectItems.forEach(function(item) {
        item.addEventListener("click", function() {
            projectItems.forEach(function(button) {
                button.classList.remove("active");
                button.setAttribute("aria-selected", "false");
            });
            item.classList.add("active");
            item.setAttribute("aria-selected", "true");
            renderProject(item.getAttribute("data-project"));
        });
    });

    renderProject("needthingsdone");
});
