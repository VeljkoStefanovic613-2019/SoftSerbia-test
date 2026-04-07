let currentStep = 1;

const step1Data = JSON.parse(localStorage.getItem("step1"));
const step2Data = JSON.parse(localStorage.getItem("step2"));

if (step1Data) {
  document.getElementById("name").value = step1Data.name;
}
if (step2Data) {
  document.getElementById("email").value = step2Data.email;
}

document.getElementById("form1").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;

  if (!name) {
    document.getElementById("error1").innerText = "Polje je obavezno!";
    return;
  }

  document.getElementById("error1").innerText = "";
  localStorage.setItem("step1", JSON.stringify({ name }));
  goToStep(2);
});

document.getElementById("form2").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (!email) {
    document.getElementById("error2").innerText = "Polje je obavezno!";
    return;
  }

  document.getElementById("error2").innerText = "";
  localStorage.setItem("step2", JSON.stringify({ email }));
  goToStep(3);
});

function goToStep(step) {
  const globalError = document.getElementById("globalError");
  globalError.innerText = "";

  if (step === 2 && !localStorage.getItem("step1")) {
    globalError.innerText = "Morate prvo popuniti korak 1!";
    return;
  }

  if (step === 3 && !localStorage.getItem("step2")) {
    globalError.innerText = "Morate prvo popuniti korak 2!";
    return;
  }

  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");

  document.getElementById("title").innerText = "Registracija - korak " + step;

  currentStep = step;

  if (step === 3) {
    const s1 = JSON.parse(localStorage.getItem("step1"));
    const s2 = JSON.parse(localStorage.getItem("step2"));

    document.getElementById("review").innerText =
      "Ime: " + s1.name + " | Email: " + s2.email;
  }
}

function finish() {
  document.getElementById("globalError").innerText = "";
  alert("Registracija uspešna!");
  localStorage.clear();
  location.reload();
}