// Wait for page to load
$(document).ready(function () {

    // ============================
    // 1. GET SELECTED EMPLOYEE
    // ============================
    let employeeData = localStorage.getItem("selectedEmployee");

    // Check if employee exists
    if (!employeeData) {
        $("main").html("<h3 class='text-center text-danger'>No Employee Selected</h3>");
        return;
    }

    // Convert string → object
    let employee = JSON.parse(employeeData);

    // ============================
    // 2. DISPLAY BASIC DETAILS
    // ============================
    $("#empName").text(employee.name);
    $("#empDept").text(employee.department);
    $("#empRole").text(employee.role);

    // Status Badge
    if (employee.status === "active") {
        $("#empStatus")
            .text("Active")
            .removeClass("bg-danger")
            .addClass("bg-success");
    } else {
        $("#empStatus")
            .text("Inactive")
            .removeClass("bg-success")
            .addClass("bg-danger");
    }

    // ============================
    // 3. DISPLAY CLIENTS
    // ============================

    // Clear old data
    $("#empClientsPreview").empty();
    $("#empClientsList").empty();

    if (employee.clients && employee.clients.length > 0) {

        employee.clients.forEach(function (client) {

            // Small preview list
            $("#empClientsPreview").append(`<li>${client}</li>`);

            // Full ordered list
            $("#empClientsList").append(`<li>${client}</li>`);
        });

    } else {
        $("#empClientsPreview").append("<li>No Clients</li>");
        $("#empClientsList").append("<li>No Clients</li>");
    }

    // ============================
    // 4. GET PERFORMANCE DATA
    // ============================

    // Store scores per employee (important)
    let scores = JSON.parse(localStorage.getItem("employeeScores")) || {};

    let score = scores[employee.id];

    // ============================
    // 5. UPDATE PROGRESS BAR
    // ============================

    if (score !== undefined) {

        // Set progress width
        $("#empProgress")
            .css("width", score + "%")
            .text(score + "%");

        // ============================
        // 6. GRADE CALCULATION
        // ============================
        let grade = "";
        let feedback = "";

        if (score >= 80) {
            grade = "A";
            feedback = "Excellent Performance";
        } else if (score >= 60) {
            grade = "B";
            feedback = "Good Performance";
        } else if (score >= 40) {
            grade = "C";
            feedback = "Average Performance";
        } else {
            grade = "F";
            feedback = "Needs Improvement";
        }

        // Show performance text
        $("#performanceText").html(
            `Score: ${score}% | Grade: ${grade} <br> ${feedback}`
        );

    } else {
        // Not attempted
        $("#empProgress")
            .css("width", "0%")
            .text("0%");

        $("#performanceText").text("Assessment Not Attempted");
    }

});



