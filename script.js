const levels = [
    {
    title: "📮 Nivel 1 - Archivo Perdido",
    description: "Encuentra códigos postales españoles de 5 cifras.",
    hint: "💡 Pista: recuerda anclar la regex con ^ al inicio y $ al final.",
    valid: ["30001", "28080", "08001", "41001"],
    invalid: ["ABC123", "1234", "123456", "30A01"]
    },
  {
    title: "🏢 Nivel 2 - Acceso Corporativo",
    description: "Tres letras mayúsculas, guion y cuatro números.",
    valid: ["USR-1234", "ADM-9999", "DEV-0001"],
    invalid: ["AB-1234", "user-1234", "USR1234", "USR-12"]
  },
  {
    title: "🛡️ Nivel 3 - Sala Segura",
    description: "Valida DNIs españoles: 8 números y una letra mayúscula.",
    valid: ["12345678Z", "87654321A", "00000000T"],
    invalid: ["1234567A", "123456789A", "12345678aa", "ABC45678Z", "12345678z"]
  }
];

let currentLevel = 0;
let xp = 0;
let locked = false; // evita validar durante la transición o tras terminar

function loadLevel() {
  const level = levels[currentLevel];

  document.getElementById("title").textContent = level.title;
  document.getElementById("description").textContent = level.description;
  document.getElementById("hint").textContent = level.hint || "";

  document.getElementById("valid").innerHTML =
    level.valid.map(item => `<li>${item}</li>`).join("");

  document.getElementById("invalid").innerHTML =
    level.invalid.map(item => `<li>${item}</li>`).join("");

  document.getElementById("feedback").textContent = "";
  document.getElementById("regexInput").value = "";
  locked = false;
}

function checkAnswer() {
  if (locked) return;

  const feedback = document.getElementById("feedback");
  const answer = document.getElementById("regexInput").value.trim();

  if (!answer) {
    feedback.textContent = "✍️ Escribe una regex primero";
    return;
  }

  let regex;
  try {
    regex = new RegExp(answer);
  } catch {
    feedback.textContent = "⚠️ Expresión regular inválida";
    return;
  }

  const level = levels[currentLevel];
  const validOk = level.valid.every(v => regex.test(v));
  const invalidOk = level.invalid.every(v => !regex.test(v));

  if (!(validOk && invalidOk)) {
    feedback.textContent = "❌ Tu regex no supera las pruebas";
    return;
  }

  locked = true;
  xp += 100;
  document.getElementById("xp").textContent = xp;
  feedback.textContent = "✅ Nivel superado";
  currentLevel++;

  if (currentLevel < levels.length) {
    setTimeout(loadLevel, 1200);
  } else {
    feedback.textContent = `🏆 Has terminado Regex Quest con ${xp} XP`;
  }
}

loadLevel();