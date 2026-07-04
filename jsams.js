
// ===============================
// AMS DASHBOARD JAVASCRIPT
// ===============================

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    // Highlight active sidebar link
    setActiveLink();

    // Load dashboard data (demo counters)
    loadDashboardStats();

    // Handle logout button
    setupLogout();

});


// ===============================
// 1. ACTIVE LINK HIGHLIGHT
// ===============================
function setActiveLink() {
    const links = document.querySelectorAll(".sidebar a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}


// ===============================
// 2. DASHBOARD STATS (DEMO DATA)
// ===============================
function loadDashboardStats() {

    // Only run on dashboard page
    if (!document.querySelector(".cards")) return;

    const students = 120;
    const assignments = 35;
    const submissions = 90;

    const cards = document.querySelectorAll(".card h2");

    if (cards.length >= 3) {
        cards[0].textContent = students;
        cards[1].textContent = assignments;
        cards[2].textContent = submissions;
    }
}


// ===============================
// 3. LOGOUT FUNCTION
// ===============================
function setupLogout() {
    const logoutLink = document.querySelector("a[href='index.html']");

    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();

            const confirmLogout = confirm("Are you sure you want to logout?");

            if (confirmLogout) {
                // Clear fake session data
                localStorage.removeItem("teacherLoggedIn");

                // Redirect to login page
                window.location.href = "index.html";
            }
        });
    }
}


// ===============================
// 4. FORM HANDLING (UPLOAD PAGE)
// ===============================
// This will work on upload-assignment.html (if you add a form)
document.addEventListener("submit", function (e) {

    if (e.target.id === "assignmentForm") {
        e.preventDefault();

        const title = document.querySelector("#title")?.value;
        const course = document.querySelector("#course")?.value;
        const dueDate = document.querySelector("#dueDate")?.value;

        if (!title || !course || !dueDate) {
            alert("Please fill all fields!");
            return;
        }

        // Fake save (localStorage)
        const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

        assignments.push({
            id: assignments.length + 1,
            title,
            course,
            dueDate,
            status: "Pending"
        });

        localStorage.setItem("assignments", JSON.stringify(assignments));

        alert("Assignment uploaded successfully!");

        // Redirect to view page
        window.location.href = "view-assignments.html";
    }
});


// ===============================
// 5. LOAD ASSIGNMENTS (VIEW PAGE)
// ===============================
function loadAssignmentsTable() {

    const tableBody = document.querySelector("tbody");
    if (!tableBody) return;

    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    tableBody.innerHTML = "";

    assignments.forEach(item => {

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.course}</td>
                <td>${item.dueDate}</td>
                <td class="${item.status.toLowerCase()}">${item.status}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

// Auto-run if table exists
loadAssignmentsTable();