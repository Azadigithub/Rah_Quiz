// ====== تنظیمات: آدرس API را اینجا قرار بده ======
const API_REGISTER_URL = "https://your-backend.com/api/register"; // <-- آدرس خودت را بگذار

// ====== کمک‌رسان‌های اعتبارسنجی ======
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordScore(pw) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[a-z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  return score; // 0..5
}

// ====== المان‌ها ======
// توجه: در HTMLی که فرستادی فیلد "firstName" وجود نداشت؛ از فیلد lastName به عنوان "نام کامل" استفاده می‌کنیم.
const form = document.getElementById("registerForm");
const nameField = document.getElementById("lastName"); // نام کامل در HTMLتو
const email = document.getElementById("email");
const team = document.getElementById("team");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

const err = {
  name: document.getElementById("err-lastName"),
  email: document.getElementById("err-email"),
  team: document.getElementById("err-team"),
  password: document.getElementById("err-password"),
};

const pwBar = document.getElementById("pwBar");

// ====== به‌روزرسانی نوار قدرت رمز عبور (اگر وجود داشته باشد) ======
if (password && pwBar) {
  password.addEventListener("input", () => {
    const s = passwordScore(password.value);
    const pct = Math.min(100, (s / 5) * 100);
    pwBar.style.width = pct + "%";
    pwBar.className = ""; // reset کلاس‌ها
    if (s <= 2) pwBar.classList.add("pw-weak");
    else if (s <= 4) pwBar.classList.add("pw-medium");
    else pwBar.classList.add("pw-strong");
  });
}

// ====== پاک‌سازی خطاها ======
function clearErrors() {
  Object.values(err).forEach((el) => {
    if (el) el.textContent = "";
  });
  formStatus.textContent = "";
  formStatus.className = "status";
}

// ====== اعتبارسنجی فرم قبل از ارسال ======
function validateForm() {
  clearErrors();
  let ok = true;

  // نام کامل (از فیلد lastName در HTML استفاده می‌کنیم)
  if (!nameField || !nameField.value.trim()) {
    if (err.name) err.name.textContent = "لطفاً نام و نام خانوادگی را وارد کنید.";
    ok = false;
  }

  if (!email || !email.value.trim() || !isValidEmail(email.value.trim())) {
    if (err.email) err.email.textContent = "ایمیل معتبر نیست.";
    ok = false;
  }

  if (!team || !team.value.trim()) {
    if (err.team) err.team.textContent = "لطفاً نام تیم یا شرکت را وارد کنید.";
    ok = false;
  }

  const pw = (password && password.value) || "";
  const score = passwordScore(pw);
  if (pw.length < 8 || score < 3) {
    if (err.password) err.password.textContent = "رمز عبور ضعیف است. شرایط را رعایت کنید.";
    ok = false;
  }

  return ok;
}

// ====== ارسال فرم ======
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm()) {
      // formStatus.textContent = "لطفاً خطاها را اصلاح کنید.";
      formStatus.classList.add("error");
      return;
    }

    const payload = {
      name: nameField ? nameField.value.trim() : "",
      email: email ? email.value.trim() : "",
      team: team ? team.value.trim() : "",
      password: password ? password.value : "",
    };

    // وضعیت ارسال
    submitBtn.disabled = true;
    submitBtn.textContent = "در حال ارسال...";
    formStatus.textContent = "";
    formStatus.className = "status";

    try {
      const res = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.";
        try {
          const j = await res.json();
          if (j && j.message) msg = j.message;
        } catch (parseErr) {
          // ignore
        }

        formStatus.textContent = msg;
        formStatus.classList.add("error");
        submitBtn.disabled = false;
        submitBtn.textContent = "ثبت نام";
        return;
      }

      // موفقیت
      formStatus.textContent = "ثبت‌نام با موفقیت انجام شد ✅";
      formStatus.classList.add("success");
      submitBtn.textContent = "انجام شد";
      form.reset();
      if (pwBar) pwBar.style.width = "0%";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "ثبت نام";
      }, 1500);
    } catch (networkErr) {
      formStatus.textContent = "خطا در ارتباط با سرور. اتصال اینترنت را بررسی کنید.";
      formStatus.classList.add("error");
      submitBtn.disabled = false;
      submitBtn.textContent = "ثبت نام";
    }
  });
}

// ====== پاک کردن خطا هنگام تایپ ======
const inputList = [nameField, email, team, password].filter(Boolean);
inputList.forEach((el) => {
  el.addEventListener("input", () => {
    // map از قبل با کلیدهای name,email,team,password تعریف شده
    if (el.id === "lastName" && err.name) err.name.textContent = "";
    if (el.id === "email" && err.email) err.email.textContent = "";
    if (el.id === "team" && err.team) err.team.textContent = "";
    if (el.id === "password" && err.password) err.password.textContent = "";
  });
});
