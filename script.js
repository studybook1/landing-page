/* === TRANSLATIONS === */
const lang = document.documentElement.lang || "ru";
const translations = {
  ru: {
    questions: [
      {
        q: "Чему равен корень из 144?",
        opts: ["11", "12", "14", "13"],
        correct: 1,
      },
      {
        q: 'Переведите: "I am learning"',
        opts: ["Я учу", "Я учусь", "Я изучил", "Я буду учить"],
        correct: 1,
      },
      {
        q: "Что выведет: print(2**3)?",
        opts: ["6", "9", "8", "5"],
        correct: 2,
      },
      {
        q: "Сколько сторон у гексагона?",
        opts: ["5", "7", "8", "6"],
        correct: 3,
      },
    ],
    subjects: [
      "Математика · Уровень 4",
      "Английский · Уровень 3",
      "Python · Уровень 5",
      "Геометрия · Уровень 2",
    ],
    wlSuccess: "✓ Записано!",
    wlDefault: "Записаться →",
  },
  uz: {
    questions: [
      {
        q: "144 ning ildizi nimaga teng?",
        opts: ["11", "12", "14", "13"],
        correct: 1,
      },
      {
        q: 'Tarjima qiling: "I am learning"',
        opts: [
          "Men o'qiyman",
          "Men o'rganayapman",
          "Men o'rgandim",
          "Men o'rganaman",
        ],
        correct: 1,
      },
      {
        q: "print(2**3) nimani chiqaradi?",
        opts: ["6", "9", "8", "5"],
        correct: 2,
      },
      {
        q: "Oltiburchakning nechta tomoni bor?",
        opts: ["5", "7", "8", "6"],
        correct: 3,
      },
    ],
    subjects: [
      "Matematika · 4-daraja",
      "Ingliz tili · 3-daraja",
      "Python · 5-daraja",
      "Geometriya · 2-daraja",
    ],
    wlSuccess: "✓ Yozildingiz!",
    wlDefault: "Yozilish →",
  },
};

const t = translations[lang] || translations.ru;
const questions = t.questions;

/* === QUIZ INTERACTION === */
let quizAnswered = false;
let currentQ = 0;

function handleQuiz(el) {
  if (quizAnswered) return;
  quizAnswered = true;
  const opts = document.querySelectorAll(".quiz-opt");
  const isCorrect = el.dataset.correct === "true";

  if (isCorrect) {
    el.classList.add("correct");
    const xp = document.getElementById("xpCount");
    xp.textContent = parseInt(xp.textContent) + 50;
    const popup = document.getElementById("xpPopup");
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 1200);
    const fill = document.getElementById("quizFill");
    fill.style.width =
      Math.min(100, parseInt(fill.style.width || "60") + 20) + "%";
  } else {
    el.classList.add("wrong");
    opts[questions[currentQ].correct].classList.add("correct");
  }

  // Next question after delay
  setTimeout(() => {
    currentQ = (currentQ + 1) % questions.length;
    loadQuestion();
    quizAnswered = false;
  }, 1800);
}

function loadQuestion() {
  const q = questions[currentQ];
  document.getElementById("quizQ").textContent = q.q;
  const optsEl = document.getElementById("quizOpts");
  const letters = ["A", "B", "C", "D"];
  optsEl.innerHTML = q.opts
    .map(
      (o, i) =>
        `<div class="quiz-opt" data-correct="${i === q.correct}" onclick="handleQuiz(this)">
      <div class="opt-letter">${letters[i]}</div><span>${o}</span>
    </div>`,
    )
    .join("");
  document.querySelector(".quiz-subject").textContent = t.subjects[currentQ];
}

/* === SCROLL REVEAL === */
const revEls = document.querySelectorAll(".reveal");
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("vis");
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
);
revEls.forEach((el) => revObs.observe(el));

/* === WAITLIST === */
function submitWL() {
  const inp = document.getElementById("emailIn");
  const btn = document.getElementById("wlBtn");
  if (!inp.value.trim() || !inp.value.includes("@")) {
    inp.style.borderColor = "var(--coral)";
    inp.style.background = "var(--coral-light)";
    setTimeout(() => {
      inp.style.borderColor = "";
      inp.style.background = "";
    }, 1500);
    return;
  }
  btn.textContent = t.wlSuccess;
  btn.style.background = "var(--green)";
  inp.value = "";
  setTimeout(() => {
    btn.textContent = t.wlDefault;
    btn.style.background = "";
  }, 3000);
}

/* === MOBILE MENU === */
document.getElementById("mobBtn").addEventListener("click", function () {
  const links = document.querySelector(".nav-links");
  if (links.style.display === "flex") {
    links.style.display = "";
    this.textContent = "☰";
  } else {
    links.style.cssText =
      "display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--cream);border-bottom:var(--border);padding:16px 20px;gap:4px;z-index:999";
    this.textContent = "✕";
  }
});

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    const links = document.querySelector(".nav-links");
    if (window.innerWidth <= 768) {
      links.style.display = "";
      document.getElementById("mobBtn").textContent = "☰";
    }
  });
});

/* === XP COUNTER ANIMATION (on scroll to gamify) === */
let xpAnimated = false;
const gamifySection = document.getElementById("gamify");
const xpObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !xpAnimated) {
        xpAnimated = true;
      }
    });
  },
  { threshold: 0.3 },
);
if (gamifySection) xpObs.observe(gamifySection);
