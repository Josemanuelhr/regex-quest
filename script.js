'use strict';

/* Regex Quest — versión final: seis misiones, sin puntos de experiencia. */
const levels = [
  {
    id: 1, title: 'El archivo perdido', subtitle: 'Recupera el código de acceso', category: 'ARCHIVOS CORRUPTOS', difficulty: 'FÁCIL · 01', icon: '📁',
    story: 'El sistema ha perdido la expresión regular que protege un archivo. Reconstruye el patrón para recuperar códigos numéricos de cinco cifras. Debes validar toda la cadena, no solo encontrar cinco cifras en algún lugar.',
    theory: [
      { symbol: '\\d', title: 'Una cifra', explanation: 'Representa una cifra del 0 al 9.', example: 'Ejemplo: 7' },
      { symbol: '{5}', title: 'Repetición exacta', explanation: 'Indica que el elemento anterior debe aparecer exactamente cinco veces.', example: 'Ejemplo: A{3}' },
      { symbol: '^', title: 'Inicio de cadena', explanation: 'Exige que la coincidencia empiece al principio del texto.', example: 'Ejemplo: ^Hola' },
      { symbol: '$', title: 'Final de cadena', explanation: 'Exige que la coincidencia llegue al final del texto.', example: 'Ejemplo: mundo$' }
    ],
    instruction: 'Escribe una expresión regular que acepte exactamente cinco cifras, sin letras, espacios ni caracteres adicionales.',
    valid: ['12345', '00001', '98765', '30001'], invalid: ['1234', '123456', '12A45', ' 12345', '12345 ', '12\n345'],
    reference: '^\\d{5}$',
    explanation: 'La expresión ^\\d{5}$ se lee así: ^ inicio de la cadena; \\d una cifra; {5} exactamente cinco veces; $ final de la cadena. La aplicación comprueba además que la coincidencia cubra todo el texto, incluso ante saltos de línea.',
    feedback: { falsePositive: 'Tu expresión ha aceptado un texto que debía rechazarse. Revisa si el patrón puede coincidir solo con una parte.', falseNegative: 'Tu expresión ha rechazado un código válido. Comprueba que permita cinco cifras y no exija caracteres adicionales.', concept: 'Combina el tipo de carácter (\\d), la longitud ({5}) y la validación completa (^ y $).' }
  },
  {
    id: 2, title: 'Acceso restringido', subtitle: 'Identifica al personal autorizado', category: 'SEGURIDAD CORPORATIVA', difficulty: 'FÁCIL · 02', icon: '🔐',
    story: 'El sistema de seguridad ha mezclado identificadores de empleados. Cada código contiene tres letras mayúsculas, un guion y cuatro cifras. Reconstruye el filtro que separa los identificadores válidos de los corruptos.',
    theory: [
      { symbol: '[A-Z]', title: 'Rango de letras', explanation: 'Representa una letra mayúscula ASCII entre A y Z.', example: 'Ejemplo: A, M, Z' },
      { symbol: '-', title: 'Carácter literal', explanation: 'Fuera de una clase de caracteres, el guion representa el propio guion.', example: 'Ejemplo: X-Y' },
      { symbol: '\\d', title: 'Una cifra', explanation: 'Representa una cifra del 0 al 9.', example: 'Ejemplo: 4' },
      { symbol: '{3} / {4}', title: 'Longitud exacta', explanation: 'Permite exigir una cantidad fija de letras o cifras.', example: 'Ejemplo: [A-F]{2}' }
    ],
    instruction: 'Valida identificadores formados por tres letras mayúsculas, un guion y cuatro cifras.',
    valid: ['USR-1234', 'ADM-0001', 'XYZ-9876', 'DEV-2468'], invalid: ['usr-1234', 'US-1234', 'USRR-1234', 'USR_1234', 'USR-123', 'USR-12345', 'USR-12A4'],
    reference: '^[A-Z]{3}-\\d{4}$',
    explanation: '^[A-Z]{3}-\\d{4}$ exige tres letras mayúsculas, un guion literal y cuatro cifras. Los anclajes impiden aceptar caracteres adicionales.',
    feedback: { falsePositive: 'Se ha aceptado un identificador no autorizado. Revisa el rango [A-Z], el guion literal y las longitudes exactas.', falseNegative: 'Se ha rechazado un identificador válido. Comprueba que letras, guion y cifras estén en el orden correcto.', concept: '[A-Z] representa una letra mayúscula ASCII; \\d representa una cifra. Los cuantificadores se aplican al elemento anterior.' }
  },
  {
    id: 3, title: 'Mensajes interceptados', subtitle: 'Descifra los mensajes del sistema', category: 'COMUNICACIONES SEGURAS', difficulty: 'FÁCIL · 03', icon: '📡',
    story: 'Has interceptado mensajes de tres subsistemas: USR, ADM y SYS. Todos siguen la misma estructura después del prefijo. Crea una única expresión que acepte los tres formatos sin admitir otros prefijos.',
    theory: [
      { symbol: '|', title: 'Alternativa', explanation: 'Permite elegir entre una opción u otra.', example: 'Ejemplo: gato|perro' },
      { symbol: '( )', title: 'Agrupación', explanation: 'Agrupa varias partes para tratarlas como una unidad.', example: 'Ejemplo: (rojo|azul)' },
      { symbol: '-', title: 'Guion literal', explanation: 'Representa el separador que debe aparecer en el mensaje.', example: 'Ejemplo: A-B' },
      { symbol: '\\d{2}', title: 'Dos cifras', explanation: 'Exige exactamente dos cifras consecutivas.', example: 'Ejemplo: 68' }
    ],
    instruction: 'Acepta mensajes que comiencen por USR, ADM o SYS, seguidos de un guion y exactamente dos cifras.',
    valid: ['USR-01', 'ADM-42', 'SYS-99'], invalid: ['DEV-42', 'USR-1', 'ADM-123', 'SYS_99', 'USR-AB', 'XUSR-01'],
    reference: '^(USR|ADM|SYS)-\\d{2}$',
    explanation: '^(USR|ADM|SYS)-\\d{2}$ permite cualquiera de los tres prefijos agrupados, seguido de un guion y dos cifras. La agrupación hace que el sufijo común se aplique a todas las alternativas.',
    feedback: { falsePositive: 'Se ha aceptado un mensaje que debería rechazarse. Revisa las alternativas autorizadas, los paréntesis y los anclajes.', falseNegative: 'Se ha rechazado un mensaje válido. Comprueba que los tres prefijos estén incluidos y que el sufijo admita dos cifras.', concept: 'El operador | significa «o». Los paréntesis agrupan las alternativas para que compartan el sufijo -\\d{2}.' }
  },
  {
    id: 4, title: 'Línea de comunicaciones', subtitle: 'Normaliza los teléfonos de contacto', category: 'SISTEMAS DE COMUNICACIÓN', difficulty: 'INTERMEDIO · 04', icon: '📞',
    story: 'La central recibe teléfonos españoles escritos de dos maneras: con el prefijo internacional +34 o sin él. El número nacional debe empezar por 6, 7, 8 o 9 y contener nueve cifras. El prefijo internacional es opcional, pero si aparece debe ser exactamente +34.',
    theory: [
      { symbol: '?', title: 'Elemento opcional', explanation: 'Hace que el elemento anterior pueda aparecer cero o una vez.', example: 'Ejemplo: colou?r' },
      { symbol: '(?:...)', title: 'Grupo no capturante', explanation: 'Agrupa elementos para aplicarles operadores sin guardar el texto coincidente como grupo capturado.', example: 'Ejemplo: (?:ab)?' },
      { symbol: '\\+', title: 'Carácter especial literal', explanation: 'La barra invertida permite buscar un signo + real, en lugar de interpretarlo como cuantificador.', example: 'Ejemplo: \\+34' },
      { symbol: '[6-9]', title: 'Rango numérico', explanation: 'Acepta un solo carácter entre 6 y 9.', example: 'Ejemplo: [3-7]' }
    ],
    instruction: 'Acepta teléfonos de nueve cifras que comiencen por 6, 7, 8 o 9, con el prefijo +34 opcional. No admitas espacios ni separadores.',
    valid: ['612345678', '+34612345678', '789456123', '+34987654321'],
    invalid: ['512345678', '+33512345678', '+3461234567', '6123456789', '612 345 678', '34612345678', '+34-612345678'],
    reference: '^(?:\\+34)?[6-9]\\d{8}$',
    explanation: '^(?:\\+34)?[6-9]\\d{8}$ hace opcional el bloque \\+34, exige que la primera cifra nacional esté entre 6 y 9 y después requiere ocho cifras más. Los anclajes y la comprobación de cadena completa descartan espacios y sufijos.',
    feedback: { falsePositive: 'Has aceptado un teléfono con un prefijo, longitud o separador no permitido. Revisa el grupo opcional y la longitud total.', falseNegative: 'Has rechazado un formato permitido. Comprueba que el prefijo +34 pueda omitirse y que el número nacional tenga nueve cifras.', concept: '? hace opcional el grupo anterior; \\+ representa el signo + literal; [6-9] limita la primera cifra nacional.' }
  },
  {
    id: 5, title: 'Archivos bajo vigilancia', subtitle: 'Filtra los documentos autorizados', category: 'INTEGRIDAD DE ARCHIVOS', difficulty: 'INTERMEDIO · 05', icon: '🗂️',
    story: 'El servidor solo debe procesar archivos de texto con extensión .pdf, .csv o .txt. El nombre debe empezar por una letra; después puede incluir letras, cifras, guiones o guiones bajos. La extensión debe escribirse en minúsculas y el nombre no puede contener espacios.',
    theory: [
      { symbol: '*', title: 'Cero o más repeticiones', explanation: 'Permite que el elemento anterior aparezca ninguna vez o tantas veces como sea necesario.', example: 'Ejemplo: [A-Z]*' },
      { symbol: '[A-Za-z0-9_-]', title: 'Clase de caracteres', explanation: 'Permite una letra, una cifra, un guion bajo o un guion en cada posición del nombre.', example: 'Ejemplo: [A-Za-z0-9_-]*' },
      { symbol: '\\.', title: 'Punto literal', explanation: 'La barra invertida hace que el punto se interprete como un punto real y no como cualquier carácter.', example: 'Ejemplo: informe\\.txt' },
      { symbol: '(pdf|csv|txt)', title: 'Alternativas de extensión', explanation: 'Los paréntesis agrupan opciones y la barra vertical permite elegir una de ellas.', example: 'Ejemplo: (jpg|png|gif)' }
    ],
    instruction: 'Valida nombres que empiecen por una letra, continúen con letras, cifras, guiones o guiones bajos, y terminen en .pdf, .csv o .txt en minúsculas.',
    valid: ['Informe_final.pdf', 'datos2026.csv', 'Notas-de-clase.txt', 'A.pdf'],
    invalid: ['2Informe.pdf', 'informe.docx', 'datos.CSV', 'mis datos.pdf', 'informe..pdf', 'archivo-.exe', '.pdf'],
    reference: '^[A-Za-z][A-Za-z0-9_-]*\\.(pdf|csv|txt)$',
    explanation: '^[A-Za-z] obliga a empezar por una letra. [A-Za-z0-9_-]* permite cero o más caracteres de nombre; \\. exige un punto literal y (pdf|csv|txt) limita la extensión a las tres opciones indicadas.',
    feedback: { falsePositive: 'Se ha aceptado un nombre no permitido. Revisa el primer carácter, los caracteres autorizados y las extensiones exactas.', falseNegative: 'Se ha rechazado un nombre válido. Recuerda que tras la primera letra puede haber cero o más caracteres permitidos.', concept: '+ significa una o más repeticiones y * cero o más. El punto debe escaparse como \\. y las alternativas se agrupan entre paréntesis.' }
  },
  {
    id: 6, title: 'El protocolo maestro', subtitle: 'Refuerza la clave de acceso definitiva', category: 'DEFENSA DEL SISTEMA', difficulty: 'DIFÍCIL · 06', icon: '🛡️',
    story: 'El núcleo del sistema necesita una clave robusta. Debe tener entre 8 y 12 caracteres y contener, como mínimo, una letra minúscula, una mayúscula, una cifra y uno de estos símbolos: ! @ # $ %. No se permiten espacios ni otros símbolos. Combina varias condiciones en un único patrón.',
    theory: [
      { symbol: '(?=...)', title: 'Anticipación positiva', explanation: 'Comprueba que una condición se cumple desde la posición actual, sin consumir caracteres de la coincidencia.', example: 'Ejemplo: (?=.*[A-Z])' },
      { symbol: '.*', title: 'Cualquier carácter, cero o más', explanation: 'El punto representa un carácter y * permite repetirlo cero o más veces; en JavaScript, el punto no incluye saltos de línea por defecto.', example: 'Ejemplo: ab.*' },
      { symbol: '{8,12}', title: 'Rango de longitud', explanation: 'Exige que el elemento anterior aparezca entre ocho y doce veces, ambos límites incluidos.', example: 'Ejemplo: [a-z]{2,5}' },
      { symbol: '[!@#$%]', title: 'Conjunto permitido', explanation: 'Acepta exactamente uno de los símbolos enumerados dentro de los corchetes.', example: 'Ejemplo: [!?]' }
    ],
    instruction: 'Crea un patrón que valide claves de 8 a 12 caracteres con al menos una minúscula, una mayúscula, una cifra y un símbolo de ! @ # $ %. Solo pueden usarse letras ASCII, cifras y esos cinco símbolos.',
    valid: ['Clave123!', 'M4ng0#Verde', 'Abcdef7@', 'Xy9!Clave'],
    invalid: ['clave123!', 'CLAVE123!', 'Claveabc!', 'Clave1234', 'Ab1!', 'Clave123!Extra', 'Clave 123!', 'Clave123&'],
    reference: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%])[A-Za-z\\d!@#$%]{8,12}$',
    explanation: 'Las cuatro anticipaciones (?=...) exigen que exista al menos una minúscula, una mayúscula, una cifra y un símbolo autorizado. Después, [A-Za-z\\d!@#$%]{8,12} limita los caracteres permitidos y la longitud total. Los anclajes y la comprobación de cadena completa impiden contenido extra.',
    feedback: { falsePositive: 'La clave no cumple alguna condición de seguridad o contiene caracteres prohibidos. Comprueba las cuatro condiciones, la lista permitida y la longitud.', falseNegative: 'Se ha rechazado una clave válida. Asegúrate de comprobar la presencia de cada tipo de carácter sin exigir un orden fijo.', concept: 'Las anticipaciones positivas (?=...) comprueban requisitos sin consumir caracteres. Combínalas con una clase permitida y un cuantificador de longitud.' }
  }
];

const STORAGE_KEY = 'regexQuestProgressV1';
const state = { currentLevel: 0, completed: [] };
const $ = (id) => document.getElementById(id);
let toastTimer = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return;
    state.completed = Array.isArray(saved.completed)
      ? [...new Set(saved.completed.filter((id) => Number.isInteger(id) && levels.some((level) => level.id === id)))]
      : [];
    state.currentLevel = Number.isInteger(saved.currentLevel) && saved.currentLevel >= 0 && saved.currentLevel < levels.length ? saved.currentLevel : 0;
  } catch (error) {
    console.warn('No se pudo recuperar el progreso guardado.', error);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: state.completed, currentLevel: state.currentLevel }));
  } catch (error) {
    console.warn('No se pudo guardar el progreso en este navegador.', error);
  }
}

function updateHeader() {
  $('completedCount').textContent = state.completed.length;
  $('totalLevels').textContent = levels.length;
  $('progressLabel').textContent = `${state.completed.length} de ${levels.length} completados`;
  $('progressBar').style.width = `${(state.completed.length / levels.length) * 100}%`;
  $('levelMap').innerHTML = levels.map((level, index) => {
    const done = state.completed.includes(level.id);
    const active = index === state.currentLevel;
    const status = done ? '✓' : active ? '●' : '○';
    return `<button type="button" class="level-card ${done ? 'complete' : ''} ${active ? 'active' : ''}" data-level-index="${index}" ${active ? 'aria-current="step"' : ''} aria-label="Ir a la misión ${level.id}: ${escapeHTML(level.title)}">
      <div class="level-number">${done ? '✓' : String(level.id).padStart(2, '0')}</div>
      <div class="level-card-copy"><h3>${escapeHTML(level.title)}</h3><p>${done ? 'MISIÓN COMPLETADA' : level.difficulty}</p></div>
      <span class="level-status" aria-hidden="true">${status}</span>
    </button>`;
  }).join('');
  document.querySelectorAll('[data-level-index]').forEach((button) => {
    button.addEventListener('click', () => navigateToLevel(Number(button.dataset.levelIndex)));
  });
}

function renderLevel() {
  updateHeader();
  const level = levels[state.currentLevel];
  const previousDisabled = state.currentLevel === 0 ? 'disabled' : '';
  const nextDisabled = state.currentLevel === levels.length - 1 ? 'disabled' : '';
  $('missionPanel').innerHTML = `
    <div class="mission-layout"><article class="mission-main">
      <header class="mission-top">
        <div class="mission-kicker"><span>${level.icon} MISIÓN ${String(level.id).padStart(2, '0')} / ${escapeHTML(level.category)}</span><span class="difficulty">${level.difficulty}</span></div>
        <h2>${escapeHTML(level.title)}</h2><p>${escapeHTML(level.subtitle)}</p>
      </header>
      <nav class="mission-navigation" aria-label="Navegación entre misiones">
        <button id="previousMissionBtn" class="secondary-btn" type="button" ${previousDisabled}>← Misión anterior</button>
        <span class="mission-position">Misión ${level.id} de ${levels.length}</span>
        <button id="nextMissionBtn" class="secondary-btn" type="button" ${nextDisabled}>Misión siguiente →</button>
      </nav>
      <div class="mission-body">
        <section class="story-box" aria-labelledby="briefingHeading"><strong id="briefingHeading">📡 BRIEFING DE MISIÓN</strong><p>${escapeHTML(level.story)}</p></section>
        <h3 class="subheading">📘 Aprende los conceptos</h3>
        <div class="theory-grid">${level.theory.map((item) => `<div class="theory-card"><code>${escapeHTML(item.symbol)}</code><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.explanation)}</p><span class="example">${escapeHTML(item.example)}</span></div>`).join('')}</div>
        <section class="challenge-box" aria-labelledby="challengeHeading">
          <div class="challenge-title-row"><h3 id="challengeHeading" class="subheading">⚡ Reto final</h3><span class="test-count">${level.valid.length + level.invalid.length} casos de prueba</span></div>
          <p class="challenge-instruction">${escapeHTML(level.instruction)}</p>
          <div class="test-groups">
            <div class="test-group"><div class="test-group-head good"><span>✓ DEBE ACEPTAR</span><span>${level.valid.length}</span></div><ul class="test-list" id="validTests">${level.valid.map((value, index) => `<li data-type="valid" data-index="${index}"><code>${escapeHTML(value)}</code><span class="test-mark" aria-hidden="true">○</span></li>`).join('')}</ul></div>
            <div class="test-group"><div class="test-group-head bad"><span>✕ DEBE RECHAZAR</span><span>${level.invalid.length}</span></div><ul class="test-list" id="invalidTests">${level.invalid.map((value, index) => `<li data-type="invalid" data-index="${index}"><code>${escapeHTML(value)}</code><span class="test-mark" aria-hidden="true">○</span></li>`).join('')}</ul></div>
          </div>
          <label class="regex-label" for="regexInput">TU EXPRESIÓN REGULAR</label>
          <div class="input-wrap"><span class="regex-prefix" aria-hidden="true">/</span><input id="regexInput" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Escribe tu patrón…" aria-describedby="feedback"><button id="validateBtn" class="primary-btn" type="button">Ejecutar pruebas ↗</button></div>
          <div class="button-row"><button id="clearBtn" class="secondary-btn" type="button">Limpiar</button><button id="resetBtn" class="secondary-btn" type="button">Reiniciar progreso</button></div>
          <div id="feedback" class="feedback" role="status" aria-live="polite"></div>
        </section>
      </div>
    </article></div>`;

  $('previousMissionBtn').addEventListener('click', () => navigateToLevel(state.currentLevel - 1));
  $('nextMissionBtn').addEventListener('click', () => navigateToLevel(state.currentLevel + 1));
  $('validateBtn').addEventListener('click', checkAnswer);
  $('regexInput').addEventListener('keydown', (event) => { if (event.key === 'Enter') checkAnswer(); });
  $('clearBtn').addEventListener('click', () => { $('regexInput').value = ''; clearFeedback(); resetTestMarks(); $('regexInput').focus(); });
  $('resetBtn').addEventListener('click', resetProgress);
}

function navigateToLevel(index) {
  if (!Number.isInteger(index) || index < 0 || index >= levels.length) return;
  state.currentLevel = index;
  saveProgress();
  renderLevel();
  const top = $('missionPanel').getBoundingClientRect().top + window.scrollY - 20;
  window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function fullMatch(regex, value) {
  regex.lastIndex = 0;
  const match = regex.exec(value);
  const result = Boolean(match && match.index === 0 && match[0].length === value.length);
  regex.lastIndex = 0;
  return result;
}

function resetTestMarks() {
  document.querySelectorAll('.test-list li').forEach((item) => {
    item.classList.remove('pass', 'fail');
    const mark = item.querySelector('.test-mark');
    if (mark) mark.textContent = '○';
  });
}

function clearFeedback() {
  const feedback = $('feedback');
  if (!feedback) return;
  feedback.className = 'feedback';
  feedback.replaceChildren();
}

function showFeedback(kind, title, content) {
  const feedback = $('feedback');
  feedback.className = `feedback show ${kind}`;
  feedback.innerHTML = `<h4>${escapeHTML(title)}</h4>${content}`;
}

function checkAnswer() {
  const input = $('regexInput');
  const answer = input.value;
  const level = levels[state.currentLevel];
  clearFeedback();
  resetTestMarks();

  if (!answer.trim()) {
    showFeedback('warning', '✍️ Escribe una expresión', '<p>Introduce tu patrón en el campo de respuesta y ejecuta las pruebas.</p>');
    input.focus();
    return;
  }

  let regex;
  try {
    regex = new RegExp(answer);
  } catch (error) {
    showFeedback('error', '⚠️ La expresión tiene un error de sintaxis', `<p>El motor de JavaScript no puede interpretar el patrón. Revisa los corchetes, paréntesis, barras invertidas y cuantificadores.</p><p class="concept">Detalle del motor: ${escapeHTML(error.message || 'sintaxis no válida')}</p>`);
    return;
  }

  const failedValid = level.valid.filter((value, index) => {
    const ok = fullMatch(regex, value);
    markTest('valid', index, ok);
    return !ok;
  });
  const failedInvalid = level.invalid.filter((value, index) => {
    const ok = !fullMatch(regex, value);
    markTest('invalid', index, ok);
    return !ok;
  });

  if (failedValid.length || failedInvalid.length) {
    const pieces = [];
    if (failedValid.length) pieces.push(`<p><strong>Debe aceptar, pero ha rechazado:</strong></p><ul>${failedValid.map((value) => `<li>${escapeHTML(value)}</li>`).join('')}</ul>`);
    if (failedInvalid.length) pieces.push(`<p><strong>Debe rechazar, pero ha aceptado:</strong></p><ul>${failedInvalid.map((value) => `<li>${escapeHTML(value)}</li>`).join('')}</ul>`);
    let conceptual;
    if (failedInvalid.length && failedValid.length) conceptual = 'La expresión es demasiado restrictiva en algunos casos y demasiado permisiva en otros. Divide el patrón en partes y revisa cada requisito.';
    else if (failedInvalid.length) conceptual = level.feedback.falsePositive;
    else conceptual = level.feedback.falseNegative;
    showFeedback('error', `❌ Aún quedan ${failedValid.length + failedInvalid.length} caso(s) por corregir`, `${pieces.join('')}<p class="concept"><strong>Repasa este concepto:</strong> ${escapeHTML(conceptual)}<br><br>${escapeHTML(level.feedback.concept)}</p>`);
    return;
  }

  showFeedback('success', '✓ ¡Todas las pruebas superadas!', `<p>Tu expresión ha aceptado los ${level.valid.length} casos válidos y rechazado los ${level.invalid.length} inválidos.</p><p class="concept"><strong>Por qué funciona:</strong> ${escapeHTML(level.explanation)}</p>`);
  const firstCompletion = !state.completed.includes(level.id);
  if (firstCompletion) {
    state.completed.push(level.id);
    saveProgress();
  }
  updateHeader();

  if (state.currentLevel < levels.length - 1) {
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'primary-btn';
    nextButton.style.marginTop = '12px';
    nextButton.textContent = 'Ir a la siguiente misión →';
    nextButton.addEventListener('click', () => navigateToLevel(state.currentLevel + 1));
    $('feedback').appendChild(nextButton);
  } else if (state.completed.length === levels.length) {
    const finish = document.createElement('p');
    finish.className = 'concept';
    finish.textContent = '¡Has completado las seis misiones! Puedes volver a cualquier nivel para practicar de nuevo.';
    $('feedback').appendChild(finish);
  }
}

function markTest(type, index, passed) {
  const item = document.querySelector(`.test-list li[data-type="${type}"][data-index="${index}"]`);
  if (!item) return;
  item.classList.toggle('pass', passed);
  item.classList.toggle('fail', !passed);
  const mark = item.querySelector('.test-mark');
  if (mark) mark.textContent = passed ? '✓' : '✕';
}

function resetProgress() {
  if (!window.confirm('¿Quieres reiniciar el progreso? Se borrarán las misiones completadas y la misión seleccionada guardadas en este navegador.')) return;
  state.currentLevel = 0;
  state.completed = [];
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn('No se pudo borrar el progreso guardado.', error); }
  renderLevel();
  showToast('Progreso reiniciado');
}

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  if (toastTimer !== null) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2300);
}

loadProgress();
renderLevel();
