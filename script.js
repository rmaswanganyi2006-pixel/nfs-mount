/* ==========================================
   SU NFS Home Mount Assistant
   script.js (Part 1)
========================================== */

// =============================
// DOM Elements
// =============================

const studentInput = document.getElementById("studentNumber");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const terminalContainer = document.getElementById("terminalContainer");
const copyAllBtn = document.getElementById("copyAllBtn");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");

// Stores currently generated commands
let generatedCommands = [];

// =============================
// Theme Handling
// =============================

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        document.body.classList.remove("light");
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});

// =============================
// Toast Notification
// =============================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);

}

// =============================
// Copy to Clipboard
// =============================

async function copyCommand(command) {

    try {

        await navigator.clipboard.writeText(command);

        showToast("Copied!");

    }

    catch {

        showToast("Copy failed.");

    }

}

// =============================
// Create Terminal Window
// =============================

function createTerminal(command) {

    const terminal = document.createElement("div");
    terminal.className = "terminal";

    terminal.innerHTML = `
        <div class="terminal-header">

            <div class="terminal-buttons">

                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>

            </div>

            <button class="copy-btn">
                <i class="fa-solid fa-copy"></i>
                Copy
            </button>

        </div>

        <div class="terminal-body">

            <code class="command">${command}</code>

        </div>
    `;

    const button = terminal.querySelector(".copy-btn");

    button.addEventListener("click", function () {

        copyCommand(command);

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(function () {

            button.innerHTML =
                '<i class="fa-solid fa-copy"></i> Copy';

        }, 1500);

    });

    return terminal;

}

// =============================
// Generate Commands
// =============================

function generateCommands() {

    const studentNumber = studentInput.value.trim();

    if (!/^\d{8}$/.test(studentNumber)) {

        alert("Please enter a valid 8-digit student number.");

        return;

    }

    localStorage.setItem("studentNumber", studentNumber);

    generatedCommands = [

        "mkdir -p ~/nfs-home",

        `sshfs ${studentNumber}@bach.sun.ac.za:/home/${studentNumber} ~/nfs-home`,

        "mv ~/Downloads/cs-stow.sh ~/nfs-home",

        "chmod 700 ~/nfs-home/cs-stow.sh",

        "~/nfs-home/cs-stow.sh ~/nfs-home --backup",

        "ssh-add ~/nfs-home/.ssh/id_rsa"

    ];

    terminalContainer.innerHTML = "";

    generatedCommands.forEach(function (command) {

        terminalContainer.appendChild(createTerminal(command));

    });

}

// =============================
// Copy All Commands
// =============================

copyAllBtn.addEventListener("click", function () {

    if (generatedCommands.length === 0) {

        showToast("Generate commands first.");

        return;

    }

    const allCommands = generatedCommands.join("\n");

    copyCommand(allCommands);

});

// =============================
// Buttons
// =============================

generateBtn.addEventListener("click", generateCommands);

clearBtn.addEventListener("click", function () {

    studentInput.value = "";

    terminalContainer.innerHTML = "";

    generatedCommands = [];

    localStorage.removeItem("studentNumber");

});

// =============================
// Restore Saved Student Number
// =============================

const savedStudentNumber =
    localStorage.getItem("studentNumber");

if (savedStudentNumber) {

    studentInput.value = savedStudentNumber;

}

// =============================
// Initialize Theme
// =============================

loadTheme();
/* ==========================================
   script.js (Part 2)
========================================== */

// =============================
// Progress Checklist
// =============================

const checklist = document.querySelectorAll(
    ".checklist input[type='checkbox']"
);

const resetChecklistBtn =
    document.getElementById("resetChecklist");

function saveChecklist() {

    const state = [];

    checklist.forEach(function(box) {

        state.push(box.checked);

    });

    localStorage.setItem(
        "checklist",
        JSON.stringify(state)
    );

}

function loadChecklist() {

    const saved =
        localStorage.getItem("checklist");

    if (!saved) {

        return;

    }

    const state = JSON.parse(saved);

    checklist.forEach(function(box, index) {

        box.checked = state[index] || false;

    });

}

checklist.forEach(function(box) {

    box.addEventListener("change", saveChecklist);

});

resetChecklistBtn.addEventListener("click", function() {

    checklist.forEach(function(box) {

        box.checked = false;

    });

    localStorage.removeItem("checklist");

    showToast("Progress reset.");

});

// =============================
// FAQ Accordion
// =============================

const accordions =
    document.querySelectorAll(".accordion");

accordions.forEach(function(item) {

    const button =
        item.querySelector(".accordion-btn");

    button.addEventListener("click", function() {

        item.classList.toggle("active");

    });

});

// =============================
// Keyboard Shortcut
// Press Enter to Generate Commands
// =============================

studentInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        generateCommands();

    }

});

// =============================
// Auto Restore Commands
// =============================

window.addEventListener("load", function() {

    loadTheme();

    loadChecklist();

    const savedStudentNumber =
        localStorage.getItem("studentNumber");

    if (savedStudentNumber) {

        studentInput.value = savedStudentNumber;

        generateCommands();

    }

});

// =============================
// Accessibility
// =============================

copyAllBtn.setAttribute(
    "aria-label",
    "Copy all commands"
);

generateBtn.setAttribute(
    "aria-label",
    "Generate commands"
);

clearBtn.setAttribute(
    "aria-label",
    "Clear form"
);

themeToggle.setAttribute(
    "aria-label",
    "Toggle theme"
);

// =============================
// Input Validation
// Allow Only Numbers
// =============================

studentInput.addEventListener("input", function() {

    this.value =
        this.value.replace(/\D/g, "");

});

// =============================
// Empty State
// =============================

if (terminalContainer.innerHTML.trim() === "") {

    terminalContainer.innerHTML = `
        <div class="terminal">

            <div class="terminal-header">

                <div class="terminal-buttons">

                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>

                </div>

            </div>

            <div class="terminal-body">

                <code class="command">
Generate commands to see them here...
                </code>

            </div>

        </div>
    `;

}

// =============================
// Finished Initialization
// =============================

console.log(
    "SU NFS Home Mount Assistant loaded successfully."
);