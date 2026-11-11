
const CREDENCIALES = {
    usuario: "JHUSARA",
    contrasena: "MIPRINCESA"
};
/* =========================================
   1. CONFIGURACIÓN DE LAS SORPRESAS
========================================= */
const surprises = [
    {
        world: "FONDO DE BIKINI",
        theme: "bikini",
        type: "PREMIO",
        icon: "⭐",
        image: "images/img2.jpg",
        title: "¡Una cita que no podrás rechazar!",
        description: "Has ganado una cita especial. Podrás elegir entre una salida romántica, una noche de películas con tus antojos favoritos o una pequeña aventura juntos. Yo me encargaré de organizarlo todo.",
        extra: "Esta vez no tienes que organizar nada. Solo ponte bonita, ven conmigo y déjame sorprenderte. ❤️"
    },
    {
        world: "FONDO DE BIKINI",
        theme: "bikini",
        type: "PREMIO",
        icon: "🍍",
        image: "images/img3.jpg",
        title: "¡El cofre de los antojos!",
        description: "Has desbloqueado una cajita llena de chocolates, dulces y algunas de tus golosinas favoritas. Porque sé que hay pequeños antojos que merecen ser consentidos.",
        extra: "Tienes permiso de ponerte golosa hoy... aunque cuidado, porque yo también quiero un poquito de tu atención. 😏"
    },
    {
        world: "ERA FEUDAL DE INUYASHA",
        theme: "inuyasha",
        type: "PREMIO",
        icon: "🌸",
        image: "images/img4.jpg",
        title: "¡Un secreto entre tú y yo!",
        description: "Has ganado una carta especial escrita por mí. En ella encontrarás recuerdos, confesiones y algunas cosas que quizá no siempre me atrevo a decirte en persona.",
        extra: "Hay sentimientos que no caben en un mensaje. Esta vez quiero que puedas leerlos y guardarlos para siempre. ❤️"
    },
    {
        world: "ERA FEUDAL DE INUYASHA",
        theme: "inuyasha",
        type: "PREMIO",
        icon: "👑",
        image: "images/img5.jpg",
        title: "¡Hoy mandas tú, princesa!",
        description: "Por un día tendrás el poder de elegir qué hacemos, qué comemos, qué película vemos o dónde salimos. Tu misión será disfrutar mientras yo me encargo de consentirte.",
        extra: "Hoy tus deseos son órdenes... bueno, casi todos. No abuses de tu poder, princesa. 😉"
    },
    {
        world: "FONDO DE BIKINI",
        theme: "bikini",
        type: "CASTIGO",
        icon: "💃",
        image: "images/img6.jpg",
        title: "¡Baile sin vergüenza!",
        description: "Tu desafío consiste en enviarme un video bailando una canción que yo elija. Tendrás que inventar un movimiento propio y terminar con una pose de estrella. ¡Quiero ver ese talento oculto!",
        extra: "Quiero espectáculo, quiero actitud y sobre todo quiero ver si tienes ritmo. ¡No se aceptan excusas! 😂"
    },
    {
        world: "ERA FEUDAL DE INUYASHA",
        theme: "inuyasha",
        type: "CASTIGO",
        icon: "🔥",
        image: "images/img7.jpg",
        title: "¡Interrogatorio peligroso!",
        description: "Tendrás que responder estas cinco preguntas con toda sinceridad:\n\n1. ¿Qué fue lo primero que te llamó la atención de mí?\n2. ¿Cuándo te dieron ganas de besarme?\n3. ¿Qué es lo que más te gusta de mis abrazos?\n4. ¿Qué cita romántica te gustaría tener conmigo?\n5. ¿Qué cosa atrevida te gustaría hacer juntos?",
        extra: "Responde con sinceridad, señorita. ¡El interrogatorio apenas comienza! Y cuidado con tus respuestas, que quizá me den algunas ideas. 😏"
    },
    {
        world: "FONDO DE BIKINI",
        theme: "bikini",
        type: "CASTIGO",
        icon: "📸",
        image: "images/img8.jpg",
        title: "¡Selfie de tentación!",
        description: "Tu misión será enviarme dos fotografías: una con tu expresión más tierna y otra con tu mirada más coqueta. Tú decides cómo sorprenderme, pero quiero ver esas dos versiones tuyas.",
        extra: "Quiero comprobar si puedes conquistarme con una sola mirada... aunque sospecho que ya sabes hacerlo. 😉"
    },
    {
        world: "ERA FEUDAL DE INUYASHA",
        theme: "inuyasha",
        type: "CASTIGO",
        icon: "🎙️",
        image: "images/img9.jpg",
        title: "¡Un audio que me hará perder la cabeza!",
        description: "Tu último desafío consiste en enviarme un audio con tres partes: primero, decirme algo bonito; segundo, contarme qué harías si estuviera a tu lado en ese momento; y tercero, terminar con una frase coqueta especialmente para mí.",
        extra: "Tienes que usar tu voz más encantadora. Advertencia: este audio podría hacer que quiera verte inmediatamente. ❤️"
    }
];
/* =========================================
   2. ELEMENTOS HTML
========================================= */
const screens = document.querySelectorAll(".screen");
const cardsContainer = document.getElementById("cardsContainer");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const completionMessage = document.getElementById("completionMessage");
const backgroundMusic = document.getElementById("backgroundMusic");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");
const togglePassword = document.getElementById("togglePassword");
/* =========================================
   3. ESTADO DEL JUEGO
========================================= */
let discovered = [];
try {
    const saved = JSON.parse(localStorage.getItem("jh_discovered") || "[]");
    if (Array.isArray(saved)) {
        discovered = saved.filter(
            index => Number.isInteger(index) && index >= 0 && index < surprises.length
        );
    }
} catch (error) {
    console.warn("No se pudo recuperar el progreso:", error);
}
discovered = [...new Set(discovered)];
const UNLOCK_INTERVAL_MS = 60 * 60 * 1000;
let nextUnlockAt = Number(localStorage.getItem("jh_next_unlock_at")) || 0;
if (!Number.isFinite(nextUnlockAt) || nextUnlockAt < Date.now()) {
    nextUnlockAt = 0;
    localStorage.removeItem("jh_next_unlock_at");
}
let cooldownInterval = null;
const cooldownMessage = document.createElement("p");
cooldownMessage.id = "cooldownMessage";
cooldownMessage.style.textAlign = "center";
cooldownMessage.style.fontWeight = "bold";
cooldownMessage.style.margin = "15px auto";
cooldownMessage.style.padding = "12px";
cooldownMessage.style.borderRadius = "12px";
cooldownMessage.style.background = "rgba(255,255,255,0.9)";
cooldownMessage.style.color = "#182b49";
cooldownMessage.style.maxWidth = "600px";
cardsContainer.parentNode.insertBefore(cooldownMessage, cardsContainer);
let musicStarted = false;
let revealTimers = [];
/* =========================================
   4. INICIO DE SESIÓN
========================================= */
function login() {
    const usuario = loginUsername.value.trim();
    const contrasena = loginPassword.value;
    if (
        usuario.toUpperCase() === CREDENCIALES.usuario &&
        contrasena === CREDENCIALES.contrasena
    ) {
        loginError.classList.add("hidden");
        loginPassword.value = "";
        showScreen("welcome");
        startMusic();
    } else {
        loginError.classList.remove("hidden");
        loginPassword.value = "";
        loginPassword.focus();
    }
}
loginButton.addEventListener("click", login);
loginUsername.addEventListener("keydown", event => {
    if (event.key === "Enter") login();
});
loginPassword.addEventListener("keydown", event => {
    if (event.key === "Enter") login();
});
togglePassword.addEventListener("click", () => {
    const mostrar = loginPassword.type === "password";
    loginPassword.type = mostrar ? "text" : "password";
    togglePassword.textContent = mostrar ? "🙈" : "👁";
    togglePassword.setAttribute(
        "aria-label",
        mostrar ? "Ocultar contraseña" : "Mostrar contraseña"
    );
});
/* =========================================
   5. MÚSICA DE FONDO
========================================= */
async function startMusic() {
    if (musicStarted || !backgroundMusic) return;
    try {
        await backgroundMusic.play();
        musicStarted = true;
        console.log("Música iniciada correctamente.");
    } catch (error) {
        console.log("No se pudo iniciar la música. Se podrá intentar nuevamente.");
    }
}
/* =========================================
   6. CAMBIAR DE PANTALLA
========================================= */
function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });
    const selectedScreen = document.getElementById(screenId);
    if (!selectedScreen) return;
    selectedScreen.classList.add("active");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* =========================================
   7. INICIAR AVENTURA
========================================= */
document.getElementById("startButton").addEventListener("click", () => {
    startMusic();
    showScreen("selection");
});
/* =========================================
   8. GENERAR TARJETAS
========================================= */
function renderCards() {
    cardsContainer.innerHTML = "";
    surprises.forEach((surprise, index) => {
        const opened = discovered.includes(index);
        const locked = !opened && nextUnlockAt > Date.now();
        const card = document.createElement("button");
        card.className = "surprise-card";
        card.type = "button";
        card.disabled = opened || locked;
        if (locked) card.classList.add("locked");
        card.innerHTML = `
            <span class="number">
                ${String(index + 1).padStart(2, "0")}
            </span>
            <img
                src="${surprise.image}"
                class="card-image"
                alt="Imagen de sorpresa ${index + 1}"
            >
            <span class="card-label">
                ${opened ? "✓ DESCUBIERTA" : locked ? "🔒 BLOQUEADA" : "ABRIR SORPRESA"}
            </span>
        `;
        card.addEventListener("click", () => {
            revealSurprise(index);
        });
        cardsContainer.appendChild(card);
    });
    updateProgress();
    updateCooldownMessage();
}
/* =========================================
   9. ACTUALIZAR BARRA DE PROGRESO
========================================= */
function updateProgress() {
    const total = surprises.length;
    const amount = discovered.length;
    const percentage = (amount / total) * 100;
    progressText.textContent = `${amount} / ${total}`;
    progressBar.style.width = `${percentage}%`;
    if (amount === total) {
        completionMessage.classList.add("visible");
        completionMessage.textContent =
            "¡Has descubierto todas las sorpresas! " +
            "Tu regalo final te espera. ❤️";
    } else {
        completionMessage.classList.remove("visible");
    }
}
/* =========================================
   9.1. CONTROL DEL DESBLOQUEO POR TIEMPO
========================================= */
function formatRemainingTime(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
        .map(value => String(value).padStart(2, "0"))
        .join(":");
}
function updateCooldownMessage() {
    if (discovered.length === surprises.length) {
        cooldownMessage.style.display = "none";
        return;
    }
    const remaining = nextUnlockAt - Date.now();
    if (remaining > 0) {
        cooldownMessage.textContent =
            `🔒 Tu próxima sorpresa estará disponible en: ${formatRemainingTime(remaining)} ❤️`;
        cooldownMessage.style.display = "block";
    } else if (discovered.length > 0) {
        nextUnlockAt = 0;
        localStorage.removeItem("jh_next_unlock_at");
        cooldownMessage.textContent =
            "🎉 ¡Tu próxima sorpresa ya está disponible, princesa!";
        cooldownMessage.style.display = "block";
    } else {
        cooldownMessage.style.display = "none";
    }
}
/* =========================================
   10. MOSTRAR CAJA Y REVELAR SORPRESA
========================================= */
function revealSurprise(index) {
    updateCooldownMessage();
    if (discovered.includes(index)) return;
    if (nextUnlockAt > Date.now()) return;
    const surprise = surprises[index];
    revealTimers.forEach(timer => clearTimeout(timer));
    revealTimers = [];
    discovered.push(index);
    localStorage.setItem("jh_discovered", JSON.stringify(discovered));
    if (discovered.length < surprises.length) {
        nextUnlockAt = Date.now() + UNLOCK_INTERVAL_MS;
        localStorage.setItem("jh_next_unlock_at", String(nextUnlockAt));
    } else {
        nextUnlockAt = 0;
        localStorage.removeItem("jh_next_unlock_at");
    }
    const revealScreen = document.getElementById("reveal");
    revealScreen.classList.remove("bikini", "inuyasha");
    revealScreen.classList.add(surprise.theme);
    document.getElementById("revealContent").classList.add("hidden");
    document.getElementById("boxScene").classList.remove("hidden");
    const giftBox = document.getElementById("giftBox");
    giftBox.classList.remove("shaking", "opening");
    void giftBox.offsetWidth;
    document.getElementById("boxMessage").textContent = "¿Qué habrá dentro?";
    document.getElementById("boxHint").textContent = "Prepárate para descubrirlo...";
    renderCards();
    showScreen("reveal");
    revealTimers.push(setTimeout(() => {
        giftBox.classList.add("shaking");
        document.getElementById("boxMessage").textContent =
            "¡Algo mágico está por suceder!";
        document.getElementById("boxHint").textContent =
            "¡La sorpresa está a punto de salir!";
    }, 500));
    revealTimers.push(setTimeout(() => {
        giftBox.classList.remove("shaking");
        giftBox.classList.add("opening");
        document.getElementById("boxMessage").textContent =
            "¡ABRIENDO TU SORPRESA!";
        document.getElementById("boxHint").textContent =
            "Un momento más, mi princesa... ❤️";
    }, 2100));
    revealTimers.push(setTimeout(() => {
        document.getElementById("revealWorld").textContent = surprise.world;
        document.getElementById("revealType").textContent =
            `${surprise.icon} ${surprise.type}`;
        document.getElementById("revealTitle").textContent = surprise.title;
        document.getElementById("revealImage").src = surprise.image;
        document.getElementById("revealDescription").textContent =
            surprise.description;
        document.getElementById("revealExtra").textContent = surprise.extra;
        document.getElementById("boxScene").classList.add("hidden");
        document.getElementById("revealContent").classList.remove("hidden");
        revealTimers = [];
    }, 3900));
}
/* =========================================
   11. VOLVER A LAS TARJETAS
========================================= */
document.getElementById("backButton").addEventListener("click", () => {
    if (discovered.length === surprises.length) {
        showScreen("final");
    } else {
        showScreen("selection");
    }
});
/* =========================================
   12. ABRIR REGALO FINAL
========================================= */
document.getElementById("giftButton").addEventListener("click", () => {
    if (discovered.length !== surprises.length) return;
    const giftMessage = document.getElementById("giftMessage");
    giftMessage.classList.remove("hidden");
    const giftButton = document.getElementById("giftButton");
    giftButton.textContent = "¡Regalo descubierto! ❤️";
    giftButton.disabled = true;
});
/* =========================================
   13. INICIALIZAR LA PÁGINA
========================================= */
renderCards();
cooldownInterval = setInterval(() => {
    if (nextUnlockAt > 0 && Date.now() >= nextUnlockAt) {
        nextUnlockAt = 0;
        localStorage.removeItem("jh_next_unlock_at");
        renderCards();
    } else {
        updateCooldownMessage();
    }
}, 1000);
showScreen("login");
