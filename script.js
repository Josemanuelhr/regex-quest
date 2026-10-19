const levels = [
    {
        title: "Nivel 1",
        description: "Encuentra números de 5 cifras",
        expected: "\\d{5}",
        examples: [
            "30001",
            "28080",
            "ABC123",
            "999"
        ]
    },
    {
        title: "Nivel 2",
        description: "Tres letras mayúsculas y cuatro números",
        expected: "^[A-Z]{3}-\\d{4}$",
        examples: [
            "USR-1234",
            "ADM-9876",
            "AB-1234"
        ]
    }
];

let currentLevel = 0;
let xp = 0;

function loadLevel() {

    const level = levels[currentLevel];

    document.getElementById("title").textContent =
        level.title;

    document.getElementById("description").textContent =
        level.description;

    document.getElementById("examples").innerHTML =
        level.examples
        .map(e => `<li>${e}</li>`)
        .join("");
}

function checkAnswer() {

    const answer =
        document.getElementById("regexInput")
        .value
        .trim();

    const level = levels[currentLevel];

    if(answer === level.expected){

        xp += 100;

        document.getElementById("xp").textContent = xp;

        document.getElementById("result").textContent =
            "✅ Correcto";

        currentLevel++;

        if(currentLevel < levels.length){

            document.getElementById("regexInput").value = "";

            setTimeout(loadLevel, 1000);

        } else {

            document.getElementById("result").textContent =
                "🏆 Has completado Regex Quest";
        }

    } else {

        document.getElementById("result").textContent =
            "❌ Incorrecto";
    }
}

loadLevel();