function validateLogin() {
    // Get the input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    // Simple validation (you can replace this with actual authentication logic)
    if (username === "admin" && password === "password") {
        // Redirect to main_page.html
        window.location.href = "main_page.html";
        return false; // Prevent form submission
    } else {
        errorMessage.textContent = "Invalid username or password.";
        errorMessage.style.display = "block";
        return false; // Prevent form submission
    }
}
