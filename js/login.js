// Initialize EmailJS
emailjs.init("6xSfwxo6sBWk3ULAj"); // Your actual public key

// Allowed credentials
const allowedAdminEmail = "gssneham@gmail.com";
const allowedPassword = "Sneham@2025";

let generatedOTP = "";

document.getElementById("send-otp").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  message.textContent = "";

  if (email !== allowedAdminEmail) {
    message.style.color = "red";
    message.textContent = "Only the authorized admin email is allowed.";
    return;
  }

  if (password !== allowedPassword) {
    message.style.color = "red";
    message.textContent = "Invalid password.";
    return;
  }

  // Generate 6-digit OTP
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

  const templateParams = {
    otp: generatedOTP,
    name: "Admin",
    email: allowedAdminEmail
  };

  // ✅ USE THE CORRECT TEMPLATE ID
  emailjs.send("service_7xns7mk", "template_iatmms8", templateParams)
    .then(() => {
      message.style.color = "green";
      message.textContent = "OTP sent to your email.";
      document.getElementById("otp-section").style.display = "block";
      document.getElementById("send-otp").disabled = true;
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      message.style.color = "red";
      message.textContent = "Failed to send OTP. Try again.";
    });
});

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const otpInput = document.getElementById("otp").value.trim();
  const message = document.getElementById("message");

  if (otpInput === generatedOTP) {
    message.style.color = "green";
    message.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "logindashboard.html";
    }, 1500);
  } else {
    message.style.color = "red";
    message.textContent = "Invalid OTP.";
  }
});
