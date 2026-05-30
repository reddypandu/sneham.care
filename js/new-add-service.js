document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const tableBody = document.getElementById("serviceTableBody");

  let services = JSON.parse(localStorage.getItem("services")) || [];

  // ---------------------- FORM SUBMIT ----------------------
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("serviceName").value;
      const desc = document.getElementById("serviceDesc").value;
      const status = document.getElementById("serviceStatus").value;

      const newService = { name, desc, status };
      services.push(newService);
      localStorage.setItem("services", JSON.stringify(services));

      document.getElementById("successMsg").textContent = "Service added successfully!";
      form.reset();

      setTimeout(() => {
        window.location.href = "logindashboard.html";
      }, 1000);
    });
  }

  // ---------------------- TABLE LIST ----------------------
  if (tableBody) {
    renderTable();

    window.editService = function (index) {
      const service = services[index];
      const newName = prompt("Update Service Name:", service.name);
      const newDesc = prompt("Update Description:", service.desc);
      const newStatus = prompt("Update Status (Active/Inactive):", service.status);

      if (!newName || !newDesc || !["Active", "Inactive"].includes(newStatus)) {
        alert("Invalid input or status.");
        return;
      }

      services[index] = {
        name: newName.trim(),
        desc: newDesc.trim(),
        status: newStatus
      };

      localStorage.setItem("services", JSON.stringify(services));
      renderTable();
    };

    window.deleteService = function (index) {
      if (confirm("Are you sure you want to delete this service?")) {
        services.splice(index, 1);
        localStorage.setItem("services", JSON.stringify(services));
        renderTable();
      }
    };

    function renderTable() {
      tableBody.innerHTML = "";
      services.forEach((service, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${service.name}</td>
          <td>${service.desc}</td>
          <td>${service.status}</td>
          <td>
            <button onclick="editService(${index})">✏️ Edit</button>
            <button onclick="deleteService(${index})">🗑️ Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("serviceName").value.trim();
  const desc = document.getElementById("serviceDesc").value.trim();
  const status = document.getElementById("serviceStatus").value;

  // ✅ Check for empty name or desc
  if (!name || !desc || !status) {
    alert("Please fill out all fields.");
    return;
  }

  const newService = { name, desc, status };
  services.push(newService);
  localStorage.setItem("services", JSON.stringify(services));

  document.getElementById("successMsg").textContent = "✅ Service added successfully!";
  form.reset();

  setTimeout(() => {
    window.location.href = "logindashboard.html";
  }, 1000);
});



let services = JSON.parse(localStorage.getItem("services")) || [];
let editIndex = null;

function renderTable() {
  const tableBody = document.getElementById("serviceTableBody");
  tableBody.innerHTML = "";

  services.forEach((s, i) => {
    tableBody.innerHTML += `
      <tr>
        <td><img src="${s.image}" width="50" /> ${s.name}</td>
        <td>${s.desc}</td>
        <td>${s.status}</td>
        <td>
          <button onclick="openEdit(${i})">✏️ Edit</button>
          <button onclick="deleteService(${i})">🗑️ Delete</button>
        </td>
      </tr>`;
  });
}

function openEdit(index) {
  editIndex = index;
  const s = services[index];
  document.getElementById("editName").value = s.name;
  document.getElementById("editDesc").value = s.desc;
  document.getElementById("editGpay").value = s.gpayNumber;
  document.getElementById("editStatus").value = s.status;
  document.getElementById("editPopup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("editPopup").classList.add("hidden");
}

function saveEdit() {
  const name = document.getElementById("editName").value.trim();
  const desc = document.getElementById("editDesc").value.trim();
  const gpayNumber = document.getElementById("editGpay").value.trim();
  const status = document.getElementById("editStatus").value;

  if (!name || !desc || !status || !gpayNumber) {
    alert("All fields are required!");
    return;
  }

  services[editIndex] = { ...services[editIndex], name, desc, gpayNumber, status };
  localStorage.setItem("services", JSON.stringify(services));
  closePopup();
  renderTable();
}

function deleteService(index) {
  if (confirm("Are you sure to delete?")) {
    services.splice(index, 1);
    localStorage.setItem("services", JSON.stringify(services));
    renderTable();
  }
}

document.addEventListener("DOMContentLoaded", renderTable);
