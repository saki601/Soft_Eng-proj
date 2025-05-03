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
            <p><strong>Position:</strong> ${employee.position}</p>
            <p><strong>Address:</strong> ${employee.address}</p>
            <p><strong>Phone:</strong> ${employee.phone}</p>
            <p><strong>Start Date:</strong> ${employee.startDate}</p>
            <p><strong>Salary:</strong> $${parseFloat(employee.salary).toLocaleString()}</p>
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
