const SAMPLE = {
  overview:
    "شما هنرمند عملی هستید. توانایی خارق‌العاده در درک موقعیت‌های عملی و حل مسائل پیچیده با بهره‌گیری از مهارت‌های فنی و حسی دارید.",
  general_characteristics: [
    "عنوان: صنعتگر ماهر",
    "کارکردهای غالب: درونگرایی (I)، حسی (S)، تفکری (T)، ادراکی (P)",
  ],
  strengths: [
    "عملگرایی و مهارت‌های فنی: درک سریع ابزارها و سیستم‌ها و ارائه راهکارهای عملی. راهکار شخصی: انجام یک پروژه عملی کوچک هر ماه برای تقویت مهارت‌ها.",
    "انعطاف‌پذیری و سازگاری: واکنش سریع در شرایط غیرمنتظره و ارائه راه‌حل عملی. راهکار شخصی: مسئولیت مدیریت بحران در پروژه‌ها را بر عهده بگیرید.",
    "تمرکز بر واقعیت‌های ملموس: تمرکز بر آنچه در لحظه اتفاق می‌افتد. راهکار شخصی: استفاده از این توانایی برای شناسایی گلوگاه‌ها در فرآیندها.",
    "استقلال و خودکفایی: ترجیح کار انفرادی و تصمیم‌گیری مستقل. راهکار شخصی: انتخاب پروژه‌هایی که نیاز به کار انفرادی دارند.",
  ],
  weaknesses: [
    "بی‌حوصلگی در کارهای تکراری: خستگی از وظایف روزمره یا جلسات طولانی. راهکار شخصی: تقسیم کارهای تکراری به بازه‌های کوتاه و افزودن فعالیت جذاب پس از هر بازه.",
    "عدم علاقه به برنامه‌ریزی بلندمدت: ترجیح کار در لحظه و اجتناب از برنامه‌ریزی طولانی. راهکار شخصی: استفاده از چک‌لیست ساده و پیشرفت روزانه در پروژه‌ها.",
    "بی‌علاقگی به تعاملات اجتماعی: ناراحتی در محیط‌های اجتماعی یا اجتناب از تعاملات غیرضروری. راهکار شخصی: انتخاب فعالیت‌های عملی به جای جلسات رسمی برای شبکه‌سازی.",
    "انتقادپذیری پایین: واکنش دفاعی در مواجهه با نقد. راهکار شخصی: هنگام دریافت بازخورد، ابتدا نفس عمیق بکشید و دلیل پیشنهاد را جویا شوید.",
  ],
  career_strategies: [
    "انتخاب شغل مناسب: نقش‌های فنی مانند مهندسی مکانیک، تعمیرات تخصصی، تحلیل داده و مشاغل مرتبط با فناوری.",
    "بهبود رهبری: درگیر کردن تیم در چالش‌های عملی و گنجاندن اهداف شخصی اعضا در برنامه‌ریزی کلان.",
    'مدیریت زمان: استفاده از تکنیک "زمان بلوکه‌شده" برای تمرکز بر کارهای فکری سنگین و محدود کردن جلسات بعدازظهر.',
  ],
  work_relations: [
    {
      with_feelings_types:
        "ابراز درک اهمیت موضوعات عاطفی برای ایجاد ارتباط بهتر با تیپ‌های احساسی (مثل INFP یا ESFJ).",
    },
    {
      with_practical_types:
        "ارائه ایده‌ها با مثال‌های عملی و نتایج ملموس برای همکاری با تیپ‌های عملگرا (مثل ESTP یا ISTJ).",
    },
  ],
  self_care: [
    "تعادل بین ذهن و بدن: هر روز ۲۰ دقیقه ورزش هوازی برای افزایش انرژی ذهنی.",
    "پرهیز از فرسودگی: یک فعالیت غیرفکری در هفته انتخاب کنید، مثل آشپزی یا ساخت ماکت.",
    "تغذیه کنجکاوی: هر شش ماه یک مهارت جدید یاد بگیرید، مثل زبان برنامه‌نویسی یا اصول بورس.",
  ],
};

// --- تابعی که داده را بارگذاری می‌کند ---
async function loadData() {
  // سعی می‌کنیم از بک‌اند JSON بگیریم؛ اگر failed شد از SAMPLE استفاده می‌کنیم
  try {
    const res = await fetch("/api/profile", { cache: "no-store" });
    if (!res.ok) throw new Error("no endpoint or non-200");
    const json = await res.json();
    return json;
  } catch (e) {
    console.warn("بارگذاری از API ممکن نیست، استفاده از نمونه محلی.", e);
    return SAMPLE;
  }
}

// --- توابع کمکی برای رندر کردن ---
function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function createCard(title, text, cls = "card") {
  const wrap = document.createElement("div");
  wrap.className = cls;
  const h = document.createElement("div");
  h.innerHTML = `<b>${title}</b>`;
  const p = document.createElement("p");
  p.textContent = text;
  wrap.appendChild(h);
  wrap.appendChild(p);
  return wrap;
}

function render(data) {
  // Header / sidebar
  document.getElementById("overviewShort").textContent =
    data.overview.slice(0, 72) + (data.overview.length > 72 ? "…" : "");
  document.getElementById("headline").textContent =
    (data.general_characteristics && data.general_characteristics[0]) ||
    "صنعتگر ماهر";
  document.getElementById("tagline").textContent =
    (data.general_characteristics && data.general_characteristics[1]) || "";
  document.getElementById("selfCareHint").textContent =
    (data.self_care && data.self_care[0]) || "";

  // avatar letters (take initials)
  const avatar = document.getElementById("avatar");
  const initials = (document.getElementById("headline").textContent || "")
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0] || "")
    .join("");
  //   avatar.textContent = initials || "";

  // strengths
  const sC = document.getElementById("strengthsContainer");
  clearChildren(sC);
  if (Array.isArray(data.strengths)) {
    data.strengths.forEach((s, i) => {
      const card = createCard("قدرت #" + (i + 1), s);
      card.classList.add("strength");
      sC.appendChild(card);
    });
  }

  // weaknesses
  const wC = document.getElementById("weaknessesContainer");
  clearChildren(wC);
  if (Array.isArray(data.weaknesses)) {
    data.weaknesses.forEach((w, i) => {
      const li = document.createElement("div");
      li.className = "list-item weak";
      li.innerHTML = `<div style="min-width:40px"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 2v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/></svg></div>
                          <div><b>ضعف ${i + 1}</b>
                          <div class="hint">${w}</div>
                          </div>`;
      wC.appendChild(li);
    });
  }

  // career strategies
  const cC = document.getElementById("careerContainer");
  clearChildren(cC);
  if (Array.isArray(data.career_strategies)) {
    data.career_strategies.forEach((c, i) => {
      const card = createCard("استراتژی " + (i + 1), c);
      card.classList.add("career");
      cC.appendChild(card);
    });
  }

  // work relations
  const rC = document.getElementById("relationsContainer");
  clearChildren(rC);
  if (Array.isArray(data.work_relations)) {
    data.work_relations.forEach((r, i) => {
      const key = Object.keys(r)[0] || "rel" + i;
      const item = document.createElement("div");
      item.className = "list-item";
      item.innerHTML = `<div style="min-width:40px"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" opacity="0.7"/></svg></div>
                            <div><b>${key.replace(
                              /_/g,
                              " "
                            )}</b><div class="hint">${r[key]}</div></div>`;
      rC.appendChild(item);
    });
  }

  // self care
  document.getElementById("selfCareText").innerHTML = (data.self_care || [])
    .map((s, i) => `• ${s}`)
    .join("<br>");

  // raw JSON
  document.getElementById("rawJSON").textContent = JSON.stringify(
    data,
    null,
    2
  );
}

// --- small UX features ---
document.getElementById("refreshBtn").addEventListener("click", async () => {
  document.getElementById("refreshBtn").textContent = "در حال بارگذاری…";
  const data = await loadData();
  render(data);
  document.getElementById("refreshBtn").textContent = "بارگذاری";
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const txt = document.getElementById("rawJSON").textContent;
  navigator.clipboard
    ?.writeText(txt)
    .then(() => {
      const old = document.getElementById("copyBtn").textContent;
      document.getElementById("copyBtn").textContent = "کپی شد";
      setTimeout(
        () => (document.getElementById("copyBtn").textContent = old),
        1400
      );
    })
    .catch(() => alert("مرورگر شما اجازه‌ی کپی ندارد."));
});

function toggleAccordion(id) {
  const node = document.getElementById(id);
  node.classList.toggle("open");
}

// --- اجرا هنگام لود ---
(async function init() {
  const data = await loadData();
  render(data);

  // باز شدن خودکار raw در موبایل اگر لازم باشد
  if (window.innerWidth < 520) {
    document.getElementById("rawAccordion").classList.add("open");
  }
})();

// امکان شخصی‌سازی: اگر بک‌اند داده را با window.PROFILE_DATA ارائه دهد، از آن استفاده می‌کنیم
if (window.PROFILE_DATA) {
  render(window.PROFILE_DATA);
}
