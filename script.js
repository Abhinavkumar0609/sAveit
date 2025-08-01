function generatePassword() {
  const length = document.getElementById("length").value;
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumber = document.getElementById("numbers").checked;
  const useSymbol = document.getElementById("symbols").checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";

  let chars = "";
  if (useUpper) chars += upper;
  if (useLower) chars += lower;
  if (useNumber) chars += numbers;
  if (useSymbol) chars += symbols;

  if (!chars) {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("passwordDisplay").value = password;
}

function copyToClipboard() {
  const password = document.getElementById("passwordDisplay");
  password.select();
  document.execCommand("copy");
  alert("Password copied!");
}

function savePassword() {
  const label = document.getElementById("label").value.trim();
  const password = document.getElementById("passwordDisplay").value;

  if (!label || !password) {
    alert("Please enter a label and generate a password first.");
    return;
  }

  let saved = JSON.parse(localStorage.getItem("passwords") || "[]");
  saved.push({ label, password });
  localStorage.setItem("passwords", JSON.stringify(saved));
  displaySavedPasswords();
  document.getElementById("label").value = "";
}

function deletePassword(index) {
  let saved = JSON.parse(localStorage.getItem("passwords") || "[]");
  saved.splice(index, 1);
  localStorage.setItem("passwords", JSON.stringify(saved));
  displaySavedPasswords();
}

function copySavedPassword(password) {
  navigator.clipboard.writeText(password);
  alert("Password copied!");
}

function displaySavedPasswords() {
  const list = document.getElementById("savedList");
  list.innerHTML = "";
  let saved = JSON.parse(localStorage.getItem("passwords") || "[]");

  saved.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.label}</strong> - ${item.password}
      <span>
        <button onclick="copySavedPassword('${item.password}')">📋</button>
        <button onclick="deletePassword(${index})">🗑️</button>
      </span>
    `;
    list.appendChild(li);
  });
}

window.onload = displaySavedPasswords;
