
(function () {
  emailjs.init("6xSfwxo6sBWk3ULAj"); // 🔁 Replace with your actual PUBLIC KEY
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const dialog = document.getElementById("successDialog");
  const okBtn = document.getElementById("okBtn");

  const REGISTERED_KEY = "registeredPhones";
  let registeredPhones = JSON.parse(localStorage.getItem(REGISTERED_KEY)) || [];

  // Convert file to base64
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove metadata prefix
      reader.onerror = error => reject(error);
    });
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let isValid = true;
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    // Get values
    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const family = document.getElementById("family").value.trim();
    const medical = document.getElementById("medical").value.trim();
    const fileInput = document.getElementById("document");
    const file = fileInput.files[0];

    const phonePattern = /^[0-9]{10}$/;

    // Validate fields
    if (!name) {
      document.getElementById("name-error").textContent = "Please enter your full name.";
      isValid = false;
    }

    if (!age || age < 55) {
      document.getElementById("age-error").textContent = "Age must be 55 or above.";
      isValid = false;
    }

    if (!gender) {
      document.getElementById("gender-error").textContent = "Please select your gender.";
      isValid = false;
    }

    if (!address) {
      document.getElementById("address-error").textContent = "Address is required.";
      isValid = false;
    }

    if (!phonePattern.test(contact)) {
      document.getElementById("contact-error").textContent = "Enter a valid 10-digit emergency contact number.";
      isValid = false;
    }

    if (registeredPhones.includes(contact)) {
      document.getElementById("contact-error").textContent = "This phone number is already registered.";
      isValid = false;
    }

    if (!file) {
      document.getElementById("document-error").textContent = "Please attach a PDF file.";
      isValid = false;
    } else if (file.type !== "application/pdf") {
      document.getElementById("document-error").textContent = "Only PDF files are allowed.";
      isValid = false;
    }

    if (!isValid) return;

    try {
      const base64File = await toBase64(file);

      const templateParams = {
        name,
        age,
        gender,
        address,
        contact,
        family,
        medical,
        attachment: {
          content: base64File,
          filename: file.name,
          type: "application/pdf",
          disposition: "attachment"
        }
      };

      // Send email with attachment
      emailjs.send("service_7xns7mk", "template_wsmth1h", templateParams)
        .then(() => {
          registeredPhones.push(contact);
          localStorage.setItem(REGISTERED_KEY, JSON.stringify(registeredPhones));
          dialog.style.display = "flex";
        })
        .catch((error) => {
          alert("Email sending failed. Please try again.");
          console.error("EmailJS error:", error);
        });
    } catch (error) {
      alert("File conversion failed. Please try again.");
      console.error("FileReader error:", error);
    }
  });

  okBtn.addEventListener("click", () => {
    dialog.style.display = "none";
    window.location.href = "../index.html";
  });
});






