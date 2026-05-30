document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const services = JSON.parse(localStorage.getItem("services")) || [];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("serviceName").value.trim();
    const desc = document.getElementById("serviceDesc").value.trim();
    const gpayNumber = document.getElementById("gpayNumber").value.trim();
    const status = document.getElementById("serviceStatus").value;
    const serviceImage = document.getElementById("serviceImage").files[0];
    const qrCodeImage = document.getElementById("qrCode").files[0];

    if (!name || !desc || !gpayNumber || !status || !serviceImage || !qrCodeImage) {
      alert("Please fill out all fields.");
      return;
    }

    // Convert images to base64
    const imageBase64 = await toBase64(serviceImage);
    const qrBase64 = await toBase64(qrCodeImage);

    const newService = {
      name,
      desc,
      gpayNumber,
      status,
      image: imageBase64,
      qr: qrBase64,
    };

    services.push(newService);
    localStorage.setItem("services", JSON.stringify(services));

    alert("✅ Service added successfully!");
    form.reset();
    setTimeout(() => window.location.href = "logindashboard.html", 800);
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
});
