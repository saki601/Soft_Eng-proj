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
    const employeeJob = document.getElementById('employeeJob').value;
    const employeeDescription = document.getElementById('employeeDescription').value;

    const container = document.querySelector('.staff-container');
    const newBox = document.createElement('div');
    newBox.className = 'staff-box';
    newBox.setAttribute('onclick', 'toggleDetails(this)');

    newBox.innerHTML = `
        <h2>${employeeName}</h2>
        <p class="details"><strong>Job:</strong> ${employeeJob}<br><strong>Description:</strong> ${employeeDescription}</p>
        <button class="remove-button" onclick="removeSpecificEmployee(event, this)" style="display: none;">Remove</button>
    `;

    container.appendChild(newBox);
    closeModal(); // Close the modal after adding the employee
}

function removeSpecificEmployee(event, button) {
    event.stopPropagation(); // Prevent triggering the toggleDetails function
    const box = button.closest('.staff-box'); // Find the parent staff-box
    box.remove(); // Remove the specific employee box
}
