document.addEventListener("DOMContentLoaded", () => {
  const serviceList = document.getElementById("service-list");
  const services = JSON.parse(localStorage.getItem("services")) || [];

  console.log("Loaded services:", services);

  const activeServices = services.filter(service => service.status?.toLowerCase() === "active");

  if (activeServices.length === 0) {
    serviceList.innerHTML = `<p>No active services available.</p>`;
  } else {
    activeServices.forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.desc}</p>
      `;
      serviceList.appendChild(card);
    });
  }
});
activeServices.forEach(service => {
  const card = document.createElement("div");
  card.className = "service-card";
  card.innerHTML = `
    <img src="${service.image}" alt="Service Image" />
    <h3>${service.name}</h3>
    <p>${service.desc}</p>
    <p><strong>GPay Number:</strong> ${service.gpayNumber}</p>
    <img src="${service.qr}" alt="GPay QR" width="100" />
  `;
  serviceList.appendChild(card);
});
