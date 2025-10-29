import { answers } from "./Data.js";
const staticQuestions = [
  {
    dimension: "EI",
    id: 1,
    options: [
      {
        option: "الف",
        text: "با به اشتراک‌گذاری آزادانه ایده‌ها با گروه انرژی می‌گیرید",
        value: "E",
      },
      {
        option: "ب",
        text: "ترجیح می‌دهید گوش دهید و قبل از مشارکت، تأمل کنید",
        value: "I",
      },
    ],
    question: "هنگام شرکت در جلسات تیمی، شما:",
  },
  {
    dimension: "EI",
    id: 2,
    options: [
      {
        option: "الف",
        text: "در میان شلوغی و هیاهو شکوفا می‌شوید",
        value: "E",
      },
      {
        option: "ب",
        text: "نیاز به پیدا کردن فضایی ساکت برای تمرکز دارید",
        value: "I",
      },
    ],
    question: "در یک محیط اداری شلوغ، شما:",
  },
];

let questions = [];
let currentQuestion = 0;
//  let answers = [];
let autoNextTimer = null;

const questionEl = document.getElementById("question");
const questionnumber = document.getElementById("questionnumber");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

async function loadQuestions() {
  try {
    const response = await fetch("https://raah.work/api/mbti/questions");
    if (!response.ok) throw new Error("خطا در دریافت سوالات");
    const data = await response.json();
    questions = data.length ? data : staticQuestions;
    // console.log("دریافت شد ✅", questions[0]);
    console.log("دریافت شد ✅");

    // fetch("https://raah.work/api/mbti/questions").then((res)=>{
    //   return res.json()
    // }) .then(data=>{
    //   console.log(data);
    // })
  } catch (error) {
    console.warn(
      "مشکل در بارگذاری سوالات از بک‌اند، از سوالات محلی استفاده می‌شود."
    );
    questions = staticQuestions;
  }
  // answers = new Array(questions.length).fill(null);
  renderQuestion();
}

function renderQuestion() {
  if (!questions.length) return;
  if (autoNextTimer) {
    clearTimeout(autoNextTimer);
    autoNextTimer = null;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  questionnumber.textContent = q.id;
  optionsEl.innerHTML = "";
  // console.log(q);

  q.options.map((opt) => {
    const label = document.createElement("label");
    label.style.display = "block";
    label.innerHTML = `
      <input type="radio" name="option" value="${opt.value}" ${
      answers[currentQuestion] === opt ? "checked" : ""
    }> ${opt.text}
    `;
    optionsEl.appendChild(label);
  });

  const radios = optionsEl.querySelectorAll('input[name="option"]');
  radios.forEach((radio) => {
    radio.disabled = false;
    radio.addEventListener("change", () => {
      // answers[currentQuestion] = radio.value;
      answers[currentQuestion] = {
        question_id: questions[currentQuestion].id,
        value: radio.value,
      };
      radios.forEach((r) => (r.disabled = true));

      autoNextTimer = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          renderQuestion();
        } else {
          finishQuiz();
        }
      }, 1000);
    });
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "پایان" : "بعدی";

  // به‌صورت پیش‌فرض دکمه بعدی مخفی شود
  nextBtn.style.display = "none";
}

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }

  // وقتی روی قبلی کلیک شد، دکمه بعدی ظاهر شود
  nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) answers[currentQuestion] = selected.value;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    finishQuiz();
  }

  // بعد از کلیک، دوباره دکمه بعدی مخفی شود
  nextBtn.style.display = "none";
});

async function finishQuiz() {
  quizEl.style.display = "none";
  resultEl.style.display = "block";
  console.log("answers:", answers);
  try {
    // resultEl.innerHTML = "<h2>پاسخ‌ها با موفقیت ارسال شدند ✅</h2>";
    console.log("answers before save:", answers);
    localStorage.setItem("answers", JSON.stringify(answers));
    resultEl.innerHTML =
      "<h4>پاسخ‌ها با موفقیت ارسال شدند ✅</h4><p />برای مشاهده و دریافت نتایج فرم صفحه بعد رو تکمیل کنید!<br/> <a href='./Login.html'> بزن بریم</a>";
  } catch (err) {
    resultEl.innerHTML =
      "<h4>پاسخ‌ها با موفقیت ارسال شدند ✅</h4><p />برای مشاهده و دریافت نتایج فرم صفحه بعد رو تکمیل کنید!<br/> <a href='./Login.html'> بزن بریم</a>";
  }
}

// async function finishQuiz() {
//   quizEl.style.display = "none";
//   resultEl.style.display = "block";
//   console.log("answers:", answers);
//   try {
//     await fetch("https://raah.work/api/mbti/questions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ answers }),
//     });
//     resultEl.innerHTML = "<h2>پاسخ‌ها با موفقیت ارسال شدند ✅</h2>";
//   } catch (err) {
//     resultEl.innerHTML =
//       "<h4>پاسخ‌ها با موفقیت ارسال شدند ✅</h4><p />برای مشاهده نتایج لازمه وارد حساب کاربری بشی!<br/> <a href='./Login.html'> بزن بریم</a>";
//   }
// }

loadQuestions();
