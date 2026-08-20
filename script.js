console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function () {
    const siteNav = document.querySelector("nav");

    function updateNavTransparency() {
        if (!siteNav) return;
        siteNav.classList.toggle("nav-scrolled", window.scrollY > 70);
    }

    updateNavTransparency();
    window.addEventListener("scroll", updateNavTransparency, { passive: true });

    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function(button) {
        button.addEventListener("click", function() {
            const panel = this.nextElementSibling;
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });

    const pixelTreeStage = document.getElementById("pixelTreeStage");
    const pixelTreeScene = document.getElementById("pixelTreeScene");
    const pixelTreeViewport = document.getElementById("pixelTreeViewport");
    const pixelTreeReset = document.getElementById("pixelTreeReset");
    const pixelTreeSign = document.getElementById("pixelTreeSign");
    const skillLeafCluster = document.getElementById("skillLeafCluster");
    const skillLeafHeading = document.getElementById("skillLeafHeading");
    const skillLeaves = document.getElementById("skillLeaves");
    const pixelBranches = document.querySelectorAll(".pixel-branch");
    let activeSkillBranch = null;

    const skillBranchData = {
        technical: {
            label: "🛠 Technical Support",
            color: "#58a6ff",
            zoom: "translate(8%, 5%) scale(1.16)",
            skills: ["Computer Repair", "Computer Upgrading", "Hardware Installation", "Troubleshooting", "Website Building"]
        },
        leadership: {
            label: "👥 Leadership",
            color: "#f2cc60",
            zoom: "translate(-8%, 5%) scale(1.16)",
            skills: ["Team Management", "Task Delegation", "Deadline Tracking", "Training Support"]
        },
        customer: {
            label: "🤝 Customer Service",
            color: "#3fb950",
            zoom: "translate(8%, 0%) scale(1.16)",
            skills: ["Customer Support", "Communication", "Problem Resolution", "Reliability"]
        },
        social: {
            label: "📱 Social Media",
            color: "#a970ff",
            zoom: "translate(-8%, 0%) scale(1.16)",
            skills: ["Content Planning", "Trend Research", "Editor Coordination", "Partnership Outreach"]
        },
        operations: {
            label: "⚙️ Operations",
            color: "#ffa657",
            zoom: "translate(-5%, -5%) scale(1.14)",
            skills: ["Inventory Management", "Time Management", "Food Safety", "Workplace Safety"]
        }
    };

    function positionSkillCluster(branch) {
        if (!branch || !skillLeafCluster || !pixelTreeScene) return;

        requestAnimationFrame(function() {
            const sceneWidth = pixelTreeScene.clientWidth;
            const sceneHeight = pixelTreeScene.clientHeight;
            const panelWidth = skillLeafCluster.offsetWidth;
            const panelHeight = skillLeafCluster.offsetHeight;
            const margin = 14;

            let left = branch.offsetLeft;
            let top = branch.offsetTop + branch.offsetHeight + 10;

            if (left + panelWidth > sceneWidth - margin) {
                left = sceneWidth - panelWidth - margin;
            }
            left = Math.max(margin, left);

            // Keep the panel attached to the branch while preventing clipping.
            // Lower branches (especially Operations) open upward instead of being cut off.
            if (top + panelHeight > sceneHeight - margin) {
                const aboveBranch = branch.offsetTop - panelHeight - 10;
                top = aboveBranch >= margin
                    ? aboveBranch
                    : Math.max(margin, sceneHeight - panelHeight - margin);
            }

            skillLeafCluster.style.left = left + "px";
            skillLeafCluster.style.top = top + "px";
        });
    }

    function resetPixelTree() {
        activeSkillBranch = null;
        if (pixelTreeStage) {
            pixelTreeStage.classList.remove("focused");
            pixelTreeStage.removeAttribute("data-focus");
        }
        if (pixelTreeScene) {
            pixelTreeScene.style.transform = "translate(0, 0) scale(1)";
        }
        pixelBranches.forEach(function(branch) {
            branch.classList.remove("active");
            branch.setAttribute("aria-pressed", "false");
        });
        if (skillLeafCluster) {
            // Hide the tray immediately before the tree zooms back out.
            // This prevents the old skill tray from flashing over the full tree.
            skillLeafCluster.classList.remove("show");
            skillLeafCluster.hidden = true;
            skillLeafCluster.style.left = "";
            skillLeafCluster.style.top = "";
        }
        if (pixelTreeReset) pixelTreeReset.hidden = true;
        if (pixelTreeSign) pixelTreeSign.classList.remove("hidden");
    }

    function focusPixelBranch(key) {
        const data = skillBranchData[key];
        if (!data || !pixelTreeStage) return;

        activeSkillBranch = key;
        pixelTreeStage.classList.add("focused");
        pixelTreeStage.setAttribute("data-focus", key);
        if (pixelTreeScene) pixelTreeScene.style.transform = data.zoom;

        let selectedBranch = null;
        pixelBranches.forEach(function(branch) {
            const selected = branch.getAttribute("data-skill-branch") === key;
            branch.classList.toggle("active", selected);
            branch.setAttribute("aria-pressed", selected ? "true" : "false");
            if (selected) selectedBranch = branch;
        });

        if (skillLeafHeading) {
            skillLeafHeading.textContent = data.label;
            skillLeafHeading.style.color = data.color;
        }
        if (skillLeaves) {
            skillLeaves.innerHTML = data.skills.map(function(skill, index) {
                return `<span class="skill-leaf" style="--leaf-color:${data.color}; --leaf-delay:${index * 55}ms">${skill}</span>`;
            }).join("");
        }
        if (skillLeafCluster) {
            skillLeafCluster.hidden = false;
            skillLeafCluster.classList.remove("show");
            positionSkillCluster(selectedBranch);
            requestAnimationFrame(function() {
                skillLeafCluster.classList.add("show");
            });
        }
        if (pixelTreeReset) pixelTreeReset.hidden = false;
        if (pixelTreeSign) pixelTreeSign.classList.add("hidden");
    }

    pixelBranches.forEach(function(branch) {
        branch.setAttribute("aria-pressed", "false");

        function showBranchPreview() {
            if (!pixelTreeStage || activeSkillBranch) return;
            pixelTreeStage.setAttribute("data-hover", branch.getAttribute("data-skill-branch"));
        }

        function clearBranchPreview() {
            if (!pixelTreeStage || activeSkillBranch) return;
            pixelTreeStage.removeAttribute("data-hover");
        }

        branch.addEventListener("mouseenter", showBranchPreview);
        branch.addEventListener("mouseleave", clearBranchPreview);
        branch.addEventListener("focus", showBranchPreview);
        branch.addEventListener("blur", clearBranchPreview);

        branch.addEventListener("click", function() {
            const key = branch.getAttribute("data-skill-branch");
            if (pixelTreeStage) pixelTreeStage.removeAttribute("data-hover");
            if (activeSkillBranch === key) {
                resetPixelTree();
            } else {
                focusPixelBranch(key);
            }
        });
    });

    if (pixelTreeReset) {
        pixelTreeReset.addEventListener("click", resetPixelTree);
    }

    window.addEventListener("resize", function() {
        if (!activeSkillBranch) return;
        const activeBranch = document.querySelector('.pixel-branch[data-skill-branch="' + activeSkillBranch + '"]');
        positionSkillCluster(activeBranch);
    });

    resetPixelTree();



    const mapStops = document.querySelectorAll(".map-stop");
    const journeyDetailInner = document.getElementById("journeyDetailInner");
    const journeyDetailCard = document.getElementById("journeyDetailCard");
    const journeyEmptyState = document.getElementById("journeyEmptyState");

    const journeyMapData = {
        level1: {
            level: "LEVEL 1",
            role: "Content Team Member",
            company: "Nightwing7974",
            location: "Remote",
            dates: "June 2021 – September 2023",
            summary: "The beginning of my journey. Started as a member of a content creation team, learning video production workflows, content planning, and online community engagement.",
            xp: "+100 XP",
            achievement: "Entered The Content Industry",
            skillsTitle: "Skills Unlocked",
            skills: ["Content Creation", "Team Collaboration", "Communication", "Trend Research"],
            accent: "#58a6ff",
            subtitle: "Career Start"
        },
        level2: {
            level: "LEVEL 2",
            role: "Computer Technician",
            company: "The PcRoom",
            location: "Ottawa, ON",
            dates: "September 2023 – January 2024",
            summary: "Entered the technical field, repairing and upgrading computers while assisting customers and managing inventory.",
            xp: "+250 XP",
            achievement: "Technical Foundation Acquired",
            skillsTitle: "Skills Unlocked",
            skills: ["Computer Repair", "Troubleshooting", "Technical Support", "Inventory Management"],
            accent: "#58a6ff",
            subtitle: "Technical Experience"
        },
        level3: {
            level: "LEVEL 3",
            role: "Supervisor",
            company: "Hammond Hill",
            location: "Hammond, ON",
            dates: "June 2024 – March 2025",
            summary: "First major leadership role. Assisted with daily operations, customer service, and inventory management while helping ensure smooth campground operations.",
            xp: "+400 XP",
            achievement: "First Leadership Position",
            skillsTitle: "Skills Unlocked",
            skills: ["Leadership", "Customer Service", "Inventory Management", "Team Coordination"],
            accent: "#79c48a",
            subtitle: "First Leadership Role"
        },
        level4: {
            level: "LEVEL 4",
            role: "Professional Cook",
            company: "Boston Pizza",
            location: "Rockland, ON",
            dates: "May 2024 – October 2025",
            summary: "Developed the ability to thrive in fast-paced environments while mastering multiple kitchen positions and maintaining high standards under pressure.",
            xp: "+500 XP",
            achievement: "Mastered High-Pressure Environments",
            skillsTitle: "Skills Unlocked",
            skills: ["Time Management", "Adaptability", "Food Safety", "Working Under Pressure"],
            accent: "#ff7b72",
            subtitle: "Fast-Paced Kitchen Experience"
        },
        level5: {
            level: "LEVEL 5",
            role: "Cook",
            company: "3 Brasseurs - Sparks",
            location: "Ottawa, ON",
            dates: "November 2025 – December 2025",
            summary: "Jumped into a fast-paced kitchen environment and became a dependable closer who helped keep the line stocked, organized, and ready for service.",
            xp: "+600 XP",
            achievement: "Trusted To Close",
            skillsTitle: "Skills Unlocked",
            skills: ["Closing Procedures", "Stock Organization", "Sanitation", "Reliability"],
            accent: "#ffa657",
            subtitle: "Closing & Reliability"
        },
        level6: {
            level: "LEVEL 6",
            role: "First Cook",
            company: "Carleton University Dining Hall (Aramark)",
            location: "Ottawa, ON",
            dates: "January 2026 – February 2026",
            summary: "Took on additional responsibility by helping coordinate staff, support team members, and maintain operational efficiency.",
            xp: "+700 XP",
            achievement: "Advanced Team Coordination",
            skillsTitle: "Skills Unlocked",
            skills: ["Team Leadership", "Delegation", "Task Management", "Operational Awareness"],
            accent: "#f2cc60",
            subtitle: "Team Coordination"
        },
        level7: {
            level: "LEVEL 7",
            role: "Assistant Manager",
            company: "Confidential Company",
            location: "Confidential Location",
            dates: "March 2026 – August 2026",
            summary: "Expanded leadership experience through operational support, project coordination, and responsible handling of sensitive information.",
            xp: "+900 XP",
            achievement: "Management Experience Acquired",
            skillsTitle: "Skills Unlocked",
            skills: ["Management", "Professional Responsibility", "Project Support", "Decision Making"],
            accent: "#d2a8ff",
            subtitle: "Management Experience"
        },
        level8: {
            level: "LEVEL 8",
            role: "Social Media Manager",
            company: "Nightwing7974",
            location: "Remote",
            dates: "June 2021 – Present",
            summary: "Progressed from Content Team Member to Social Media Manager through consistent performance, leadership, content planning, and team coordination.",
            xp: "+1500 XP",
            achievement: "Promotion Achieved",
            skillsTitle: "Skills Mastered",
            skills: ["Leadership", "Project Coordination", "Content Strategy", "Team Management", "Partnership Development", "Research & Trend Analysis"],
            extraTitle: "Achievements",
            extra: ["Managed a team of video editors", "Coordinated content production schedules", "Researched trends and audience interests", "Assisted with sponsor and partnership outreach", "Contributed to channel growth over 5+ years"],
            accent: "#f2cc60",
            subtitle: "Current Leadership Role"
        }
    };

    function resetJourneyMap() {
        mapStops.forEach(function(stop) {
            stop.classList.remove("active");
            stop.setAttribute("aria-pressed", "false");
        });
        if (journeyDetailInner) {
            journeyDetailInner.hidden = true;
            journeyDetailInner.innerHTML = "";
        }
        if (journeyEmptyState) {
            journeyEmptyState.hidden = false;
        }
    }

    function renderJourneyMapStop(key) {
        const data = journeyMapData[key];
        if (!data || !journeyDetailInner) return;

        mapStops.forEach(function(stop) {
            const active = stop.getAttribute("data-map-stop") === key;
            stop.classList.toggle("active", active);
            stop.setAttribute("aria-pressed", active ? "true" : "false");
        });

        if (journeyEmptyState) journeyEmptyState.hidden = true;
        journeyDetailInner.hidden = false;
        journeyDetailInner.innerHTML = `
            <div class="journey-detail-topline">
                <span class="journey-level-pill" style="--journey-accent:${data.accent}">${data.level}</span>
                <span class="journey-subtitle-pill">${data.subtitle}</span>
            </div>
            <h3 class="journey-role-title">${data.role}</h3>
            <p class="journey-company-line">${data.company} <span>• ${data.location}</span></p>
            <p class="journey-date-line">${data.dates}</p>
            <p class="journey-summary"><span class="journey-summary-label">Role Summary</span><br>${data.summary}</p>
            <div class="journey-meta-grid">
                <div class="journey-meta-box">
                    <h4>Experience Gained</h4>
                    <p>${data.xp}</p>
                </div>
                <div class="journey-meta-box">
                    <h4>Career Milestone</h4>
                    <p>${data.achievement}</p>
                </div>
            </div>
            <div class="journey-list-box">
                <h4>${data.skillsTitle}</h4>
                <ul>
                    ${data.skills.map(function(item) { return `<li>${item}</li>`; }).join("")}
                </ul>
            </div>
            ${data.extra ? `<div class="journey-list-box journey-extra-box"><h4>${data.extraTitle}</h4><ul>${data.extra.map(function(item) { return `<li>${item}</li>`; }).join("")}</ul></div>` : ""}
        `;
    }

    mapStops.forEach(function(stop) {
        stop.setAttribute("aria-pressed", "false");
        stop.addEventListener("click", function() {
            const key = stop.getAttribute("data-map-stop");
            if (stop.classList.contains("active")) {
                resetJourneyMap();
            } else {
                renderJourneyMapStop(key);
                if (journeyDetailCard) {
                    requestAnimationFrame(function() {
                        journeyDetailCard.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                }
            }
        });
    });

    resetJourneyMap();

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
    let activeProject = null;

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

    function closeProject() {
        if (!projectDisplay) return;
        projectItems.forEach(function(button) {
            button.classList.remove("active");
            button.setAttribute("aria-selected", "false");
        });
        projectDisplay.classList.remove("project-display-animate");
        projectDisplay.hidden = true;
        projectDisplay.innerHTML = "";
        activeProject = null;
    }

    function renderProject(key) {
        const project = projectData[key];
        if (!projectDisplay || !project) return;

        projectDisplay.innerHTML = `
            <div class="project-display-top">
                <span class="project-status-tag">${project.status}</span>
                <span class="project-type-tag">${project.type}</span>
                <button class="project-close-button" type="button" aria-label="Close project details">×</button>
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

        projectDisplay.hidden = false;
        projectDisplay.classList.remove("project-display-animate");
        void projectDisplay.offsetWidth;
        projectDisplay.classList.add("project-display-animate");

        const closeButton = projectDisplay.querySelector(".project-close-button");
        if (closeButton) {
            closeButton.addEventListener("click", closeProject);
        }
    }

    projectItems.forEach(function(item) {
        item.addEventListener("click", function() {
            const key = item.getAttribute("data-project");

            if (activeProject === key) {
                closeProject();
                return;
            }

            projectItems.forEach(function(button) {
                button.classList.remove("active");
                button.setAttribute("aria-selected", "false");
            });

            item.classList.add("active");
            item.setAttribute("aria-selected", "true");
            activeProject = key;
            renderProject(key);
        });
    });
});
