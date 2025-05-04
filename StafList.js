function openModal() {
    document.getElementById("employeeModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("employeeModal").style.display = "none";
    document.getElementById("employeeForm").reset();
}

function submitEmployee(event) {
    event.preventDefault();

    const name = document.getElementById("employeeName").value.trim();
    const position = document.getElementById("employeePosition").value.trim();
    const address = document.getElementById("employeeAddress").value.trim();
    const phone = document.getElementById("employeePhone").value.trim();
    const startDate = document.getElementById("employeeStartDate").value;
    const salary = document.getElementById("employeeSalary").value;

    const employee = { name, position, address, phone, startDate, salary };
    addEmployeeAccordion(employee);
    closeModal();
}

function addEmployeeAccordion(employee) {
    const container = document.querySelector(".staff-container");

    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    accordionItem.innerHTML = `
        <button class="accordion-header">${employee.name}</button>
        <div class="accordion-body">
            <div class="accordion-body-content">        
                <p><strong>Position:</strong> ${employee.position}</p>
                <p><strong>Address:</strong> ${employee.address}</p>
                <p><strong>Phone:</strong> ${employee.phone}</p>
                <p><strong>Start Date:</strong> ${employee.startDate}</p>
                <p><strong>Salary:</strong> $${parseFloat(employee.salary).toLocaleString()}</p>
            </div>
            <button class="update-button" onclick="openUpdateModal(this)">Update</button>
        </div>
    `;

    container.appendChild(accordionItem);

    // Add toggle behavior
    const header = accordionItem.querySelector(".accordion-header");
    const body = accordionItem.querySelector(".accordion-body");

    header.addEventListener("click", () => {
        body.classList.toggle("active");
    });
}

// Function to open the update modal
function openUpdateModal(button) {
    const accordionBody = button.parentElement;
    const employeeDetails = accordionBody.querySelector(".accordion-body-content");

    // Extract current details
    const name = accordionBody.previousElementSibling.textContent.trim();
    const position = employeeDetails.querySelector("p:nth-child(1)").textContent.split(": ")[1];
    const address = employeeDetails.querySelector("p:nth-child(2)").textContent.split(": ")[1];
    const phone = employeeDetails.querySelector("p:nth-child(3)").textContent.split(": ")[1];
    const startDate = employeeDetails.querySelector("p:nth-child(4)").textContent.split(": ")[1];
    const salary = employeeDetails.querySelector("p:nth-child(5)").textContent.split(": ")[1].replace("$", "").replace(",", "");

    // Pre-fill the modal with the current details
    document.getElementById("employeeName").value = name;
    document.getElementById("employeePosition").value = position;
    document.getElementById("employeeAddress").value = address;
    document.getElementById("employeePhone").value = phone;
    document.getElementById("employeeStartDate").value = startDate;
    document.getElementById("employeeSalary").value = salary;

    // Show the modal
    openModal();

    // Update the form submission to save changes
    const form = document.getElementById("employeeForm");
    form.onsubmit = (event) => {
        event.preventDefault();
        saveUpdatedDetails(accordionBody);
    };
}

// Function to save the updated details
function saveUpdatedDetails(accordionBody) {
    const employeeDetails = accordionBody.querySelector(".accordion-body-content");

    // Update the details in the accordion
    accordionBody.previousElementSibling.textContent = document.getElementById("employeeName").value;
    employeeDetails.querySelector("p:nth-child(1)").innerHTML = `<strong>Position:</strong> ${document.getElementById("employeePosition").value}`;
    employeeDetails.querySelector("p:nth-child(2)").innerHTML = `<strong>Address:</strong> ${document.getElementById("employeeAddress").value}`;
    employeeDetails.querySelector("p:nth-child(3)").innerHTML = `<strong>Phone:</strong> ${document.getElementById("employeePhone").value}`;
    employeeDetails.querySelector("p:nth-child(4)").innerHTML = `<strong>Start Date:</strong> ${document.getElementById("employeeStartDate").value}`;
    employeeDetails.querySelector("p:nth-child(5)").innerHTML = `<strong>Salary:</strong> $${parseFloat(document.getElementById("employeeSalary").value).toLocaleString()}`;

    // Close the modal
    closeModal();
}    

function transformRemoveButton() {
    const removeButtonContainer = document.querySelector(".page-header-buttons");

    // Replace the Remove Employee button with Confirm and Cancel buttons
    removeButtonContainer.innerHTML = `
        <button class="confirm-remove-button" onclick="confirmRemove()">Confirm Remove</button>
        <button class="cancel-remove-button" onclick="cancelRemove()">Cancel</button>
    `;
}

function confirmRemove() {
    alert("Employee removal confirmed.");
    resetRemoveButton(); // Reset the buttons back to the original state
}

function cancelRemove() {
    resetRemoveButton(); // Reset the buttons back to the original state
}

function resetRemoveButton() {
    const removeButtonContainer = document.querySelector(".page-header-buttons");

    // Restore the original Add and Remove Employee buttons
    removeButtonContainer.innerHTML = `
        <button class="add-employee-button" onclick="openModal()">Add Employee</button>
        <button class="remove-employee-button" onclick="transformRemoveButton()">Remove Employee</button>
    `;
}

let isRemoveMode = false; // Track whether the remove mode is active

function transformRemoveButton() {
    const removeButtonContainer = document.querySelector(".page-header-buttons");
    const staffContainer = document.querySelector(".staff-container");

    if (!isRemoveMode) {
        // Enter remove mode
        isRemoveMode = true;

        // Add checkboxes to all accordion headers
        const employees = staffContainer.querySelectorAll(".accordion-header");
        employees.forEach((header) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "remove-checkbox";
            header.prepend(checkbox); // Add the checkbox at the beginning of the header
        });

        // Replace the Remove Employee button with Confirm and Cancel buttons
        removeButtonContainer.innerHTML = `
            <button class="confirm-remove-button" onclick="confirmRemove()">Confirm Remove</button>
            <button class="cancel-remove-button" onclick="cancelRemove()">Cancel</button>
        `;
    }
}

function confirmRemove() {
    const staffContainer = document.querySelector(".staff-container");

    // Find all checked checkboxes and remove their corresponding employees
    const checkboxes = staffContainer.querySelectorAll(".remove-checkbox:checked");
    checkboxes.forEach((checkbox) => {
        const accordionItem = checkbox.closest(".accordion-item"); // Find the parent accordion item
        accordionItem.remove(); // Remove the accordion item from the DOM
    });

    // Exit remove mode
    cancelRemove();
}

function cancelRemove() {
    const removeButtonContainer = document.querySelector(".page-header-buttons");
    const staffContainer = document.querySelector(".staff-container");

    // Remove all checkboxes
    const checkboxes = staffContainer.querySelectorAll(".remove-checkbox");
    checkboxes.forEach((checkbox) => checkbox.remove());

    // Restore the original Add and Remove Employee buttons
    removeButtonContainer.innerHTML = `
        <button class="add-employee-button" onclick="openModal()">Add Employee</button>
        <button class="remove-employee-button" onclick="transformRemoveButton()">Remove Employee</button>
    `;

    isRemoveMode = false; // Exit remove mode
}
