// Toggle between Login & Signup
function toggleForm() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
}

// Show popup message
function showPopup(message) {
    document.getElementById("popup-message").innerText = message;
    document.getElementById("popup").style.display = "block";
}

// Close popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Show/Hide Course Input Field
function toggleCourseInput() {
    let education = document.getElementById('education').value;
    let courseInput = document.getElementById('course');
    
    if (education === "Other") {
        courseInput.classList.remove("hidden");
    } else {
        courseInput.classList.add("hidden");
    }
}

// Send OTP (Mock)
function sendOTP() {
    let mobile = document.getElementById('mobile').value;
    
    if (mobile.length !== 10 || isNaN(mobile)) {
        showPopup("Please enter a valid 10-digit mobile number.");
        return;
    }

    let otpField = document.getElementById('otp');
    let generatedOTP = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    localStorage.setItem("otp", generatedOTP);
    otpField.disabled = false;
    showPopup("Your OTP is: " + generatedOTP);

    document.getElementById("signupBtn").disabled = false; // Enable Signup Button
}

// Signup Function
function signup() {
    let name = document.getElementById('name').value.trim();
    let mobile = document.getElementById('mobile').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let education = document.getElementById('education').value;
    let course = document.getElementById('course').value.trim();
    let enteredOTP = document.getElementById('otp').value.trim();
    let storedOTP = localStorage.getItem("otp");

    // Form Validation
    if (!name || !mobile || !email || !password || !education) {
        showPopup("All fields are required.");
        return;
    }

    if (education === "Other" && !course) {
        showPopup("Please enter your course name.");
        return;
    }

    if (password.length < 6) {
        showPopup("Password must be at least 6 characters long.");
        return;
    }

    if (enteredOTP !== storedOTP) {
        showPopup("Invalid OTP. Try Again!");
        return;
    }

    localStorage.removeItem("otp");

    let user = { name, mobile, email, password, education, course };
    localStorage.setItem("user", JSON.stringify(user));
    
    showPopup("Signup Successful! Redirecting to login...");
    
    setTimeout(() => {
        toggleForm();
        closePopup();
    }, 2000);
}

// Login Function
function login() {
    let loginId = document.getElementById('loginId').value.trim();
    let password = document.getElementById('loginPassword').value.trim();

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        showPopup("No user found. Please sign up first.");
        return;
    }

    if ((loginId === storedUser.email || loginId === storedUser.mobile) && password === storedUser.password) {
        showPopup("Login Successful!");
    } else {
        showPopup("Invalid Credentials.");
    }
}
