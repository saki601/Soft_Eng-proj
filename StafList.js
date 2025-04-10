function toggleDetails(box) {
    const details = box.querySelector('.details');
    const removeButton = box.querySelector('.remove-button');

    // Toggle the visibility of the details
    if (details.style.display === 'block') {
        details.style.display = 'none';
        removeButton.style.display = 'none'; // Hide the remove button
    } else {
        details.style.display = 'block';
        removeButton.style.display = 'inline-block'; // Show the remove button
    }
}

function openModal() {
    document.getElementById('employeeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
    document.getElementById('employeeForm').reset(); // Clear the form
}

function submitEmployee(event) {
    event.preventDefault(); // Prevent form submission

    const employeeName = document.getElementById('employeeName').value;
    const employeePosition = document.getElementById('employeePosition').value;
    const employeeAddress = document.getElementById('employeeAddress').value;
    const employeePhone = document.getElementById('employeePhone').value;
    const employeeStartDate = document.getElementById('employeeStartDate').value;
    const employeeSalary = document.getElementById('employeeSalary').value;

    const container = document.querySelector('.staff-container');
    const newBox = document.createElement('div');
    newBox.className = 'staff-box';

    newBox.innerHTML = `
        <div class="employee-name">
            <h2>${employeeName}</h2>
        </div>
        <div class="employee-details">
            <p><strong>Position:</strong> ${employeePosition}</p>
            <p><strong>Address:</strong> ${employeeAddress}</p>
            <p><strong>Phone No.:</strong> ${employeePhone}</p>
            <p><strong>Start Date:</strong> ${employeeStartDate}</p>
            <p><strong>Salary:</strong> $${employeeSalary}</p>
        </div>
        <div class="employee-actions">
            <button class="remove-button" onclick="removeSpecificEmployee(event, this)">Remove</button>
            <button class="update-button" onclick="openUpdateModal(this)">Update</button>
        </div>
    `;

    container.appendChild(newBox);
    closeModal(); 
}

function openUpdateModal(button) {
    const box = button.closest('.staff-box');
    const name = box.querySelector('.employee-name h2').textContent;
    const position = box.querySelector('.employee-details p:nth-child(1)').textContent.replace('Position: ', '');
    const address = box.querySelector('.employee-details p:nth-child(2)').textContent.replace('Address: ', '');
    const phone = box.querySelector('.employee-details p:nth-child(3)').textContent.replace('Phone No.: ', '');
    const startDate = box.querySelector('.employee-details p:nth-child(4)').textContent.replace('Start Date: ', '');
    const salary = box.querySelector('.employee-details p:nth-child(5)').textContent.replace('Salary: $', '');

    // Populate the modal with existing details
    document.getElementById('employeeName').value = name;
    document.getElementById('employeePosition').value = position;
    document.getElementById('employeeAddress').value = address;
    document.getElementById('employeePhone').value = phone;
    document.getElementById('employeeStartDate').value = startDate;
    document.getElementById('employeeSalary').value = salary;

    // Update the form submission to modify the existing box
    const form = document.getElementById('employeeForm');
    form.onsubmit = function (event) {
        event.preventDefault();
        box.querySelector('.employee-name h2').textContent = document.getElementById('employeeName').value;
        box.querySelector('.employee-details p:nth-child(1)').innerHTML = `<strong>Position:</strong> ${document.getElementById('employeePosition').value}`;
        box.querySelector('.employee-details p:nth-child(2)').innerHTML = `<strong>Address:</strong> ${document.getElementById('employeeAddress').value}`;
        box.querySelector('.employee-details p:nth-child(3)').innerHTML = `<strong>Phone No.:</strong> ${document.getElementById('employeePhone').value}`;
        box.querySelector('.employee-details p:nth-child(4)').innerHTML = `<strong>Start Date:</strong> ${document.getElementById('employeeStartDate').value}`;
        box.querySelector('.employee-details p:nth-child(5)').innerHTML = `<strong>Salary:</strong> $${document.getElementById('employeeSalary').value}`;
        closeModal();
        form.onsubmit = submitEmployee; // Reset the form submission to the default behavior
    };

    openModal(); // Open the modal for editing
}

function removeSpecificEmployee(event, button) {
    event.stopPropagation(); // Prevent triggering the toggleDetails function
    const box = button.closest('.staff-box'); // Find the parent staff-box
    box.remove(); // Remove the specific employee box
}
