// Initialize EmailJS
emailjs.init("6xSfwxo6sBWk3ULAj"); // Replace with your EmailJS public key

const form = document.getElementById("contact-form");
const nameField = document.getElementById("contact-name");
const emailField = document.getElementById("contact-email");
const messageField = document.getElementById("contact-message");

const nameError = document.getElementById("contact-name-error");
const emailError = document.getElementById("contact-email-error");
const messageError = document.getElementById("contact-message-error");
const formMsg = document.getElementById("contact-form-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous messages
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formMsg.textContent = "";

  // Validate input
  let isValid = true;

  if (nameField.value.trim() === "") {
    nameError.textContent = "Please enter your name";
    isValid = false;
  }
  if (emailField.value.trim() === "" || !emailField.value.includes("@")) {
    emailError.textContent = "Please enter a valid email";
    isValid = false;
  }
  if (messageField.value.trim() === "") {
    messageError.textContent = "Please enter your message";
    isValid = false;
  }

  if (!isValid) return;

  const params = {
    from_name: nameField.value,
    from_email: emailField.value,
    message: messageField.value,
  };

  // Send email
  emailjs.send("service_7xns7mk", "YOUR_TEMPLATE_ID", params)
    .then(function (response) {
      formMsg.style.color = "green";
      formMsg.textContent = "Message sent successfully!";
      form.reset();
    }, function (error) {
      formMsg.style.color = "red";
      formMsg.textContent = "Failed to send. Please try again.";
    });
});
