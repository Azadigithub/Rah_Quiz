// import { answers } from "./Data";

// import {answers} from './Data.js'

let enteredanswers = JSON.parse(localStorage.getItem("answers"));
// let Mobilenumber = JSON.parse(localStorage.getItem("answers"));
//  export let answers = [];
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

const form = document.getElementById("registerForm");
const nameField = document.getElementById("lastName");
const phonenumber = document.getElementById("number");
const email = document.getElementById("email");
const team = document.getElementById("team");
const submitBtn = document.getElementById("submitBtn");

const formStatus = document.getElementById("formStatus");

const err = {
  name: document.getElementById("err-lastName"),
  email: document.getElementById("err-email"),
  team: document.getElementById("err-team"),
  password: document.getElementById("err-password"),
};

const pwBar = document.getElementById("pwBar");

function clearErrors() {
  Object.values(err).forEach((el) => {
    if (el) el.textContent = "";
  });
  formStatus.textContent = "";
  formStatus.className = "status";
}

function validateForm() {
  clearErrors();
  let ok = true;

  if (!nameField || !nameField.value.trim()) {
    if (err.name)
      err.name.textContent = "لطفاً نام و نام خانوادگی را وارد کنید.";
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

  return ok;
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // console.log(enteredanswers.length);

    clearErrors();

    if (!validateForm()) {
      // formStatus.textContent = "لطفاً خطاها را اصلاح کنید.";
      formStatus.classList.add("error");
      return;
    }

    // const payload = {
    //   // name: nameField ? nameField.value.trim() : "",
    //   mobile: phonenumber ? phonenumber.value.trim() : "",
    //   email: email ? email.value.trim() : "",
    //   answers: enteredanswers,
    //   // password: password ? password.value : "",
    // };

    const payload = {
      mobile: phonenumber ? phonenumber.value.trim() : "",
      email: email ? email.value.trim() : "",
      answers: enteredanswers,
      // answers: [
      //   { question_id: 1, value: "E" },
      //   { question_id: 2, value: "I" },
      // ],
    };
    const phone = payload.mobile;
    // console.log(phone);
    // localStorage.setItem("mobile", JSON.stringify(phone))
    // console.log(payload);

    // وضعیت ارسال
    submitBtn.disabled = true;
    submitBtn.textContent = "در حال ارسال...";
    formStatus.textContent = "";
    formStatus.className = "status";

    try {
      const res = await fetch("https://raah.work/api/mbti/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Status:", res.status);
      const responseData = await res.json().catch(() => null);
      console.log("Response from server:", responseData);

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

      console.log(savedAnswers);
      console.log(payload);
      // localStorage.removeItem("answers");

      formStatus.textContent = "ثبت‌نام با موفقیت انجام شد ✅";
      formStatus.classList.add("success");
      submitBtn.textContent = "انجام شد";
      form.reset();
      if (pwBar) pwBar.style.width = "0%";
      localStorage.setItem("mobile", JSON.stringify(phone));
      setTimeout(() => {
        window.location.assign("/Resault.html");
      }, 5000);

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "ثبت نام";
      }, 1500);
    } catch (networkErr) {
      formStatus.textContent =
        // "خطا در ارتباط با سرور. اتصال اینترنت را بررسی کنید.";
        formStatus.classList.add("error");
      submitBtn.disabled = false;
      submitBtn.textContent = "ثبت نام";
    }
  });
}

const inputList = [nameField, email, team].filter(Boolean);
inputList.forEach((el) => {
  el.addEventListener("input", () => {
    if (el.id === "lastName" && err.name) err.name.textContent = "";
    if (el.id === "email" && err.email) err.email.textContent = "";
    if (el.id === "team" && err.team) err.team.textContent = "";
  });
});

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   // console.log(enteredanswers.length);

//   clearErrors();

//   if (!validateForm()) {
//     // formStatus.textContent = "لطفاً خطاها را اصلاح کنید.";
//     formStatus.classList.add("error");
//     return;
//   }

//   const payload = {
//     mobile: "0914453443444289",
//     email: "user@e44vdfvf.com",
//     answers: [
//       { question_id: 1, value: "E" },
//       { question_id: 2, value: "I" },
//       { question_id: 3, value: "E" },
//       { question_id: 4, value: "I" },
//       { question_id: 5, value: "E" },
//       { question_id: 6, value: "I" },
//       { question_id: 7, value: "E" },
//       { question_id: 8, value: "I" },
//       { question_id: 9, value: "E" },
//       { question_id: 10, value: "I" },
//     ],
//   };
//   console.log(enteredanswers);
//   console.log(payload);

//   // وضعیت ارسال
//   submitBtn.disabled = true;
//   submitBtn.textContent = "در حال ارسال...";
//   formStatus.textContent = "";
//   formStatus.className = "status";

//   try {
//     const res = await fetch("https://raah.work/api/mbti/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     console.log("Status:", res.status);
//     const responseData = await res.json().catch(() => null);
//     console.log("Response from server:", responseData);

//     if (!res.ok) {
//       let msg = "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.";
//       try {
//         const j = await res.json();
//         if (j && j.message) msg = j.message;
//       } catch (parseErr) {
//         // ignore
//       }

//       formStatus.textContent = msg;
//       formStatus.classList.add("error");
//       submitBtn.disabled = false;
//       submitBtn.textContent = "ثبت نام";
//       return;
//     }
//     console.log(savedAnswers);
//     console.log(payload);
//     // localStorage.removeItem("answers");

//     formStatus.textContent = "ثبت‌نام با موفقیت انجام شد ✅";
//     formStatus.classList.add("success");
//     submitBtn.textContent = "انجام شد";
//     form.reset();
//     if (pwBar) pwBar.style.width = "0%";

//     setTimeout(() => {
//       submitBtn.disabled = false;
//       submitBtn.textContent = "ثبت نام";
//     }, 1500);
//   } catch (networkErr) {
//     formStatus.textContent =
//       "خطا در ارتباط با سرور. اتصال اینترنت را بررسی کنید.";
//     formStatus.classList.add("error");
//     submitBtn.disabled = false;
//     submitBtn.textContent = "ثبت نام";
//   }
// });
