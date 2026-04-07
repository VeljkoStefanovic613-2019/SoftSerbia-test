let currentStep = 1;
const errorDisplay = document.getElementById("globalError");

function showError(message) {
  errorDisplay.innerText = message;
}

function clearError() {
  errorDisplay.innerText = "";
}

const step1Data = JSON.parse(localStorage.getItem("step1"));
const step2Data = JSON.parse(localStorage.getItem("step2"));

if (step1Data) document.getElementById("name").value = step1Data.name;
if (step2Data) document.getElementById("email").value = step2Data.email;

document.getElementById("form1").addEventListener("submit", function(e) {
  e.preventDefault();
  clearError();
  const name = document.getElementById("name").value.trim();

  if (!name) {
    showError("Molimo unesite ime i prezime!");
    return;
  }

  localStorage.setItem("step1", JSON.stringify({ name }));
  goToStep(2);
});

document.getElementById("form2").addEventListener("submit", function(e) {
  e.preventDefault();
  clearError();
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    showError("Polje je obavezno!");
    return;
  }
  if (!emailRegex.test(email)) {
    showError("Email adresa nije u odgovarajucem formatu!");
    return;
  }

  localStorage.setItem("step2", JSON.stringify({ email }));
  goToStep(3);
});

function goToStep(step) {
  clearError();

  if (step === 2 && !localStorage.getItem("step1")) {
    showError("Morate prvo popuniti korak 1!");
    return;
  }
  if (step === 3 && !localStorage.getItem("step2")) {
    showError("Morate prvo popuniti korak 2!");
    return;
  }

  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");
  document.getElementById("title").innerText = "Registracija - korak " + step;
  
  currentStep = step;

  if (step === 2) {
    const s1 = JSON.parse(localStorage.getItem("step1"));
    document.getElementById("displayName").innerText = s1.name;
  }
  if (step === 3) {
    const s1 = JSON.parse(localStorage.getItem("step1"));
    const s2 = JSON.parse(localStorage.getItem("step2"));
    document.getElementById("review").innerText = "Ime: " + s1.name + " | Email: " + s2.email;
  }
}

function finish() {
  clearError();
  const terms = document.getElementById("terms").checked;

  if (!terms) {
    showError("Molimo prihvatite uslove registracije!");
    return;
  }

  localStorage.clear();
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("successStep").classList.add("active");
  
  document.getElementById("header-area").style.display = "none";
  document.getElementById("mainNav").style.display = "none";
}