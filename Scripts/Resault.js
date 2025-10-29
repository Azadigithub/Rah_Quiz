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
const phone = JSON.parse(localStorage.getItem("mobile"));
const payload = { mobile: String(phone) };
console.log(phone);

let Ress = {};
async function loadData() {
  try {
    const res = await fetch("https://raah.work/api/mbti/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("no endpoint or non-200");

    const result = await res.json();
    console.log(" API:", result);
    Ress = result;
    console.log("res:", Ress);

    Object.assign(Response, result);

    return result;
  } catch (e) {
    console.warn("بارگذاری از API ممکن نیست، استفاده از نمونه محلی.", e);

    Object.assign(Response, SAMPLE);

    return SAMPLE;
  }
}

(async function init() {
  const data = await loadData();
  render(data);
})();

console.log("دیتای ذخیره شده:", Response);

function clearChildren(el) {
  if (!el) return;
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
  const content = data.text ? data.text : data;

  // MBTI type
  const mbtiEl = document.getElementById("mbtiType");
  if (mbtiEl) mbtiEl.textContent = data.mbti || "نامشخص";

  // overview
  const overviewEl = document.getElementById("overviewShort");
  if (overviewEl) {
    overviewEl.textContent =
      (content.overview ? content.overview.slice(0, 72) : "") +
      (content.overview && content.overview.length > 72 ? "…" : "");
  }

  // general characteristics
  const headlineEl = document.getElementById("headline");
  if (headlineEl) {
    headlineEl.textContent =
      (content.general_characteristics && content.general_characteristics[0]) ||
      "تیپ شخصیتی";
  }

  const taglineEl = document.getElementById("tagline");
  if (taglineEl) {
    taglineEl.textContent =
      (content.general_characteristics && content.general_characteristics[1]) ||
      "";
  }

  // self care hint
  const selfCareHintEl = document.getElementById("selfCareHint");
  if (selfCareHintEl)
    selfCareHintEl.textContent =
      (content.self_care && content.self_care[0]) || "";

  // avatar
  const avatarEl = document.getElementById("avatar");
  if (avatarEl) avatarEl.textContent = data.mbti || "";

  // strengths
  const sC = document.getElementById("strengthsContainer");
  clearChildren(sC);
  if (Array.isArray(content.strengths) && sC) {
    content.strengths.forEach((s, i) => {
      const card = createCard("قدرت #" + (i + 1), s);
      card.classList.add("strength");
      sC.appendChild(card);
    });
  }

  // weaknesses
  const wC = document.getElementById("weaknessesContainer");
  clearChildren(wC);
  if (Array.isArray(content.weaknesses) && wC) {
    content.weaknesses.forEach((w, i) => {
      const li = document.createElement("div");
      li.className = "list-item weak";
      li.innerHTML = `<b>ضعف ${i + 1}</b><div class="hint">${w}</div>`;
      wC.appendChild(li);
    });
  }

  // career strategies
  const cC = document.getElementById("careerContainer");
  clearChildren(cC);
  if (Array.isArray(content.career_strategies) && cC) {
    content.career_strategies.forEach((c, i) => {
      const card = createCard("استراتژی " + (i + 1), c);
      card.classList.add("career");
      cC.appendChild(card);
    });
  }

  // work relations
  const rC = document.getElementById("relationsContainer");
  clearChildren(rC);
  if (Array.isArray(content.work_relations) && rC) {
    content.work_relations.forEach((r, i) => {
      const key = Object.keys(r)[0] || "ارتباط " + (i + 1);
      const item = document.createElement("div");
      item.className = "list-item";
      item.innerHTML = `<b>${key.replace(/_/g, " ")}</b><div class="hint">${
        r[key]
      }</div>`;
      rC.appendChild(item);
    });
  }

  // self care
  const selfCareTextEl = document.getElementById("selfCareText");
  if (selfCareTextEl) {
    selfCareTextEl.innerHTML = (content.self_care || [])
      .map((s) => `• ${s}`)
      .join("<br>");
  }

  // raw JSON
  const rawJSONEl = document.getElementById("rawJSON");
  if (rawJSONEl) rawJSONEl.textContent = JSON.stringify(content, null, 2);

  // ✅ درصدها
  const percContainer = document.getElementById("percentagesContainer");
  clearChildren(percContainer);
  if (data.percentages && percContainer) {
    const labels = {
      EI: "برون‌گرایی (E) ↔ درون‌گرایی (I)",
      SN: "حسی (S) ↔ شهودی (N)",
      TF: "تفکری (T) ↔ احساسی (F)",
      JP: "قضاوتی (J) ↔ ادراکی (P)",
    };

    Object.keys(data.percentages).forEach((key) => {
      const { percent, type } = data.percentages[key]; // فرض: {percent: 65, type: "E"}
      const row = document.createElement("div");
      row.className = "mbti-bar";
      row.innerHTML = `
        <div class="bar-label">${labels[key] || key}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${percent}%;"></div>
        </div>
        <div class="bar-value">${type} (${percent}%)</div>
      `;
      percContainer.appendChild(row);
    });
  }
}

// --- small UX features ---
const refreshBtn = document.getElementById("refreshBtn");
if (refreshBtn) {
  refreshBtn.addEventListener("click", async () => {
    refreshBtn.textContent = "در حال بارگذاری…";
    const data = await loadData();
    render(data);
    refreshBtn.textContent = "بارگذاری";
  });
}

const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const txt = document.getElementById("rawJSON")?.textContent;
    if (!txt) return;
    navigator.clipboard
      ?.writeText(txt)
      .then(() => {
        const old = copyBtn.textContent;
        copyBtn.textContent = "کپی شد";
        setTimeout(() => (copyBtn.textContent = old), 1400);
      })
      .catch(() => alert("مرورگر شما اجازه‌ی کپی ندارد."));
  });
}

function toggleAccordion(id) {
  const node = document.getElementById(id);
  if (node) node.classList.toggle("open");
}

// --- اجرا هنگام لود ---
(async function init() {
  const data = await loadData();
  render(data);

  if (window.innerWidth < 520) {
    const rawAccordion = document.getElementById("rawAccordion");
    if (rawAccordion) rawAccordion.classList.add("open");
  }
})();

// امکان شخصی‌سازی: اگر بک‌اند داده را با window.PROFILE_DATA ارائه دهد، از آن استفاده می‌کنیم
if (window.PROFILE_DATA) {
  render(window.PROFILE_DATA);
}
