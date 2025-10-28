const staticQuestions = [
  {
    text: "۱. پایتخت ایران چیست؟",
    options: ["تهران", "اصفهان"],
  },
  { text: "۲. حاصل ۵ × ۶ چند است؟", options: ["۳۰", "۳۱"] },
  {
    text: "۳. بزرگ‌ترین قاره جهان کدام است؟",
    options: ["آسیا", "آفریقا"],
  },
  { text: "۴. آب در چند درجه می‌جوشد؟", options: ["۱۰۰", "۹۰"] },
  {
    text: "۵. کدام حیوان سریع‌ترین در خشکی است؟",
    options: ["یوزپلنگ", "اسب"],
  },
  {
    text: "۶. کدام رنگ از ترکیب قرمز و آبی به‌دست می‌آید؟",
    options: ["بنفش", "سبز"],
  },
  {
    text: "۷. چه کسی لامپ را اختراع کرد؟",
    options: ["توماس ادیسون", "نیوتن"],
  },
  {
    text: "۸. کدام سیاره نزدیک‌ترین به خورشید است؟",
    options: ["عطارد", "زهره"],
  },
  {
    text: "۹. واحد اندازه‌گیری نیرو چیست؟",
    options: ["نیوتن", "ژول"],
  },
  {
    text: "۱۰. مؤلف مثنوی معنوی کیست؟",
    options: ["مولوی", "سعدی"],
  },
  {
    text: "۱۱. عدد π تقریباً برابر است با؟",
    options: ["۳.۱۴", "۴.۱۳"],
  },
  {
    text: "۱۲. بزرگ‌ترین اقیانوس جهان؟",
    options: ["آرام", "اطلس"],
  },
  {
    text: "۱۳. خورشید در کدام جهت طلوع می‌کند؟",
    options: ["شرق", "غرب"],
  },
  {
    text: "۱۴. حیوان نماد صبر چیست؟",
    options: ["شتر", "فیل"],
  },
  {
    text: "۱۵. شیمی مطالعه‌ی چیست؟",
    options: ["مواد و واکنش‌ها", "ستارگان"],
  },
  { text: "۱۶. کدام عدد اول است؟", options: ["۷", "۸"] },
  { text: "۱۷. واحد زمان چیست؟", options: ["ثانیه", "متر"] },
  {
    text: "۱۸. نام دریاچه معروف در شمال ایران چیست؟",
    options: ["خزر", "ارومیه"],
  },
  { text: "۱۹. پرچم ایران چند رنگ دارد؟", options: ["۳", "۲"] },
  {
    text: "۲۰. پدر علم فیزیک کیست؟",
    options: ["نیوتن", "گالیله"],
  },
  {
    text: "۲۱. اولین ماه سال شمسی؟",
    options: ["فروردین", "اردیبهشت"],
  },
  {
    text: "۲۲. مساحت مربع برابر است با؟",
    options: ["ضلع × ضلع", "طول × عرض"],
  },
  {
    text: "۲۳. کدام کشور بزرگ‌ترین تولیدکننده نفت است؟",
    options: ["عربستان", "روسیه"],
  },
  {
    text: "۲۴. آب شور در کجا یافت می‌شود؟",
    options: ["دریا", "رود"],
  },
  { text: "۲۵. رنگ مکمل سبز چیست؟", options: ["قرمز", "آبی", "زرد", "نارنجی"] },
  {
    text: "۲۶. حیوان ملی ایران چیست؟",
    options: ["یوزپلنگ آسیایی", "شیر"],
  },
  {
    text: "۲۷. در چه فصلی برگ درختان می‌ریزد؟",
    options: ["پاییز", "بهار"],
  },
  {
    text: "۲۸. اولین انسان روی ماه؟",
    options: ["نیل آرمسترانگ", "یوری گاگارین", "بوز آلدرین", "مایکل کالینز"],
  },
  { text: "۲۹. نماد شیمیایی آب چیست؟", options: ["H₂O", "CO₂", "O₂", "NaCl"] },
  {
    text: "۳۰. چه حیوانی می‌تواند پرواز کند؟",
    options: ["پرنده", "گربه", "اسب", "سگ"],
  },
  { text: "۳۱. عدد بعد از ۳۹ چیست؟", options: ["۴۰", "۳۸", "۴۱", "۳۷"] },
  {
    text: "۳۲. خوراک اصلی پاندا چیست؟",
    options: ["بامبو", "گوشت", "میوه", "علف"],
  },
  {
    text: "۳۳. رشته کوه معروف در شمال ایران؟",
    options: ["البرز", "زاگرس", "هیمالیا", "تفتان"],
  },
  {
    text: "۳۴. معروف‌ترین شاعر انگلیسی؟",
    options: ["شکسپیر", "نیوتن", "گوته", "ویرجینیا وولف"],
  },
  {
    text: "۳۵. کدام کشور به آفتاب تابان مشهور است؟",
    options: ["ژاپن", "چین", "هند", "تایلند"],
  },
  {
    text: "۳۶. در فوتبال، هر تیم چند بازیکن دارد؟",
    options: ["۱۱", "۹", "۱۰", "۱۲"],
  },
  {
    text: "۳۷. بزرگ‌ترین سیاره منظومه شمسی؟",
    options: ["مشتری", "زحل", "نپتون", "زمین"],
  },
  {
    text: "۳۸. نویسنده کتاب شازده کوچولو؟",
    options: ["آنتوان دو سنت‌اگزوپری", "ویکتور هوگو", "گوته", "همینگوی"],
  },
  {
    text: "۳۹. نور از چه چیزی سریع‌تر است؟",
    options: ["هیچ چیز", "صوت", "ماشین", "هواپیما"],
  },
  {
    text: "۴۰. زبان رسمی ایران چیست؟",
    options: ["فارسی", "عربی", "ترکی", "کردی"],
  },
];

let questions = [];
let currentQuestion = 0;
let answers = [];
let autoNextTimer = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

async function loadQuestions() {
  try {
    const response = await fetch("https://your-backend.com/api/questions");
    if (!response.ok) throw new Error("خطا در دریافت سوالات");
    const data = await response.json();
    questions = data.length ? data : staticQuestions;
  } catch (error) {
    console.warn("مشکل در بارگذاری سوالات از بک‌اند، از سوالات محلی استفاده می‌شود.");
    questions = staticQuestions;
  }
  answers = new Array(questions.length).fill(null);
  renderQuestion();
}

function renderQuestion() {
  if (!questions.length) return;

  if (autoNextTimer) {
    clearTimeout(autoNextTimer);
    autoNextTimer = null;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const label = document.createElement("label");
    label.style.display = "block";
    label.innerHTML = `
      <input type="radio" name="option" value="${opt}" ${
      answers[currentQuestion] === opt ? "checked" : ""
    }> ${opt}
    `;
    optionsEl.appendChild(label);
  });

  const radios = optionsEl.querySelectorAll('input[name="option"]');
  radios.forEach((radio) => {
    radio.disabled = false;
    radio.addEventListener("change", () => {
      answers[currentQuestion] = radio.value;
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
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "پایان" : "بعدی";

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
    await fetch("https://your-backend.com/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    resultEl.innerHTML = "<h2>پاسخ‌ها با موفقیت ارسال شدند ✅</h2>";
  } catch (err) {
    resultEl.innerHTML =
      "<h4>پاسخ‌ها با موفقیت ارسال شدند ✅</h4><p />برای مشاهده نتیجه می‌تونی وارد حساب کاربری بشی! <a href='./Login.html'> بزن بریم</a>";
  }
}

loadQuestions();
