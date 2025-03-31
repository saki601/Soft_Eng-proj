function validateLogin() {
    // Dummy credentials
    const correctUsername = "admin";
    const correctPassword = "12345";

    // Get user input
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    // Check credentials
    if (username === correctUsername && password === correctPassword) {
        errorMessage.style.display = "none"; // Hide error if login is successful
        alert("Login successful!");
        return true;  // Allow form submission
    } else {
        errorMessage.innerText = "Incorrect username or password!";
        errorMessage.style.display = "block"; // Show error message
        return false; // Prevent form submission
    }
}
