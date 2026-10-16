"use strict";

/* ==========================================================================
   የአሜን ጥምቀት — የግብዣ ድረ ገጽ
   ------------------------------------------------------------------------
   እዚህ ግን ብቻ ያስተካክሉ! / EDIT THE EVENT DETAILS HERE ONLY.
   Everything on the page reads from this CONFIG object.
   ========================================================================== */
const CONFIG = {

  /** የሕፃኑ ስም */
  childName: "አሜን",

  /** የጥምቀቱ ቀንና ሰዓት — በኢትዮጵያ ሰዓት (Africa/Addis_Ababa = UTC+3, ሁልጊዜ)
   *  ቅርጸት / format: "YYYY-MM-DDTHH:MM"   ለምሳሌ: "2026-02-15T09:00"
   *  ቀኑን እስካላስገቡ ድረስ ባዶ ("") ይተዉት — ቆጠራው "በቅርቡ ይገለጻል" ይላል */
  eventDateTime: "2026-10-26T06:00",

  /** የሚታዩ ጽሑፎች / display texts */
  dateText:         "ኦክቶበር 26፣ 2026",
  ceremonyTimeText: "ከጠዋቱ 6:00",
  churchName:       "ቦሌ መድኃኔዓለም ቤተ ክርስቲያን",

  /** የቤተ ክርስቲያኑ Google Maps ሊንክ (በትክክለኛው አድራሻ ይተኩት) */
  churchMapUrl: "https://www.google.com/maps/search/?api=1&query=Bole+Medhanealem+Church+Addis+Ababa",

  lunchDateText: "ኦክቶበር 26፣ 2026",
  lunchTimeText: "ከሰዓቱ 1:00",
  homeAddress:   "ላፍቶ ኮንዶሚኒየም",

  /** የቤቱ Google Maps ሊንክ። ሲያስገቡት "የቤቱን አቅጣጫ ይመልከቱ" ቁልፍ ይታያል።
   *  ባዶ ("") ከሆነ ቁልፉ አይታይም። */
  homeMapUrl: "https://www.google.com/maps/search/?api=1&query=Laphto+Condominium+Addis+Ababa",

  /** የአሜን ፎቶ — እውነተኛውን ፎቶ በዚህ ስም ይተኩ / place the real photo here */
  photo: "assets/images/amen.jpg",

  /** ተጨማሪ ፎቶዎች (ካልያዙ ባዶ []) */
  gallery: [
    // "assets/images/amen2.jpg",
    // "assets/images/amen3.jpg",
  ],

  /** የጀርባ ሙዚቃ (optional) — ፋይሉ ከሌለ የሙዚቃው ቁልፍ አይታይም */
  audio: "assets/audio/baptism.mp3",
};

/* ========================================================================== */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
 * 1) Apply the editable CONFIG to the page
 * ------------------------------------------------------------------------ */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
}

function applyConfig() {
  setText("cfg-date", CONFIG.dateText);
  setText("cfg-ceremony-time", CONFIG.ceremonyTimeText);
  setText("cfg-church-name", CONFIG.churchName);
  setText("cfg-church-name2", CONFIG.churchName);
  setText("cfg-lunch-date", CONFIG.lunchDateText);
  setText("cfg-lunch-time", CONFIG.lunchTimeText);
  setText("cfg-home-address", CONFIG.homeAddress);

  const churchBtn = $("#churchMapBtn");
  if (churchBtn && CONFIG.churchMapUrl) churchBtn.href = CONFIG.churchMapUrl;

  // "የቤቱን አቅጣጫ ይመልከቱ" — only when a home map link has been supplied
  const homeBtn = $("#homeMapBtn");
  if (homeBtn && CONFIG.homeMapUrl) {
    homeBtn.href = CONFIG.homeMapUrl;
    homeBtn.hidden = false;
  }

  // Extra gallery photos
  const grid = $("#galleryGrid");
  if (grid && Array.isArray(CONFIG.gallery)) {
    CONFIG.gallery.forEach((src) => {
      const fig = document.createElement("figure");
      fig.className = "g-item reveal";
      const img = new Image();
      img.loading = "lazy";
      img.alt = "የ" + CONFIG.childName + " ተጨማሪ ፎቶ";
      img.src = src;
      img.addEventListener("error", () => fig.remove()); // hide if file missing
      fig.appendChild(img);
      grid.appendChild(fig);
    });
  }
}

/* --------------------------------------------------------------------------
 * 2) Floating gold particles for the opening screen
 * ------------------------------------------------------------------------ */
function buildParticles() {
  if (reducedMotion) return;
  const wrap = $("#particles");
  if (!wrap) return;
  const COUNT = 26;
  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement("span");
    const size = (Math.random() * 4 + 2.5).toFixed(1);
    s.style.cssText =
      "left:" + (Math.random() * 100).toFixed(2) + "%;" +
      "width:" + size + "px;height:" + size + "px;" +
      "animation-duration:" + (Math.random() * 9 + 9).toFixed(1) + "s;" +
      "animation-delay:" + (-Math.random() * 16).toFixed(1) + "s;" +
      "--px:" + (Math.random() * 80 - 40).toFixed(0) + "px;" +
      "--po:" + (Math.random() * 0.45 + 0.3).toFixed(2) + ";";
    wrap.appendChild(s);
  }
}

/* --------------------------------------------------------------------------
 * 3) Scroll-reveal (Intersection Observer) — starts AFTER the card opens
 * ------------------------------------------------------------------------ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

function observeReveals() {
  $$(".reveal:not(.is-visible)").forEach((el) => {
    if (!el.dataset.io) {
      el.dataset.io = "1";
      revealObserver.observe(el);
    }
  });
}

/* --------------------------------------------------------------------------
 * 4) Opening card → open like a real invitation, then reveal the site
 * ------------------------------------------------------------------------ */
function initOpening() {
  const overlay = $("#opening");
  const card = $("#inviteCard");
  const main = $("#main");
  const openBtn = $("#openBtn");
  let opened = false;

  openBtn.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    card.classList.add("is-open");                 // 3D open from the left hinge
    document.body.classList.remove("no-scroll");   // allow scrolling
    main.removeAttribute("inert");
    main.classList.remove("main-hidden");          // fade the invitation in
    observeReveals();

    // after the card swings open, fade the cover away and remove it
    setTimeout(() => {
      overlay.classList.add("is-done");
      setTimeout(() => overlay.remove(), reducedMotion ? 60 : 900);
    }, reducedMotion ? 60 : 1450);
  });
}

/* --------------------------------------------------------------------------
 * 5) Countdown — computed in Africa/Addis_Ababa time (always UTC+3)
 * ------------------------------------------------------------------------ */
function parseEthiopiaTime(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(str.trim());
  if (!m) return null;
  // Ethiopia does not observe daylight saving: EAT = UTC+3 all year
  const d = new Date(m[1] + "-" + m[2] + "-" + m[3] + "T" + m[4] + ":" + m[5] + ":00+03:00");
  return isNaN(d.getTime()) ? null : d;
}

function initCountdown() {
  const cdD = $("#cd-d"), cdH = $("#cd-h"), cdM = $("#cd-m"), cdS = $("#cd-s");
  const msg = $("#cd-msg");
  const target = parseEthiopiaTime(CONFIG.eventDateTime);

  // Date not entered yet → show an editable placeholder, not a fake countdown
  if (!target) {
    msg.textContent = "የበዓሉ ቀንና ሰዓት በቅርቡ ይገለጻል።";
    msg.hidden = false;
    return;
  }

  const pad = (n) => String(n).padStart(2, "0");
  let timer = null;

  function finish() {
    [cdD, cdH, cdM, cdS].forEach((el) => (el.textContent = "00"));
    msg.textContent = "የአሜን የተባረከ ቀን ደርሷል!";
    msg.hidden = false;
    if (timer) clearInterval(timer);
  }

  function tick() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) { finish(); return; }     // never show negative numbers
    const s = Math.floor(diff / 1000);
    cdD.textContent = pad(Math.floor(s / 86400));
    cdH.textContent = pad(Math.floor((s % 86400) / 3600));
    cdM.textContent = pad(Math.floor((s % 3600) / 60));
    cdS.textContent = pad(s % 60);
  }

  tick();
  timer = setInterval(tick, 1000);
}

/* --------------------------------------------------------------------------
 * 6) Optional background music (no autoplay; starts only on user tap)
 * ------------------------------------------------------------------------ */
function initMusic() {
  const audio = $("#bgMusic");
  const btn = $("#musicToggle");
  const label = $("#musicLabel");
  if (!audio) return;

  audio.src = CONFIG.audio;

  // Show the control only if the file actually exists and can play
  audio.addEventListener("canplay", () => { btn.hidden = false; }, { once: true });
  audio.addEventListener("error", () => { btn.hidden = true; });
  audio.load();

  btn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        label.textContent = "ሙዚቃ ያጥፉ";
        btn.classList.add("playing");
        btn.setAttribute("aria-pressed", "true");
      } catch (e) {
        // playback blocked or file unusable — keep the site working silently
      }
    } else {
      audio.pause();
      label.textContent = "ሙዚቃ ያብሩ";
      btn.classList.remove("playing");
      btn.setAttribute("aria-pressed", "false");
    }
  });
}

/* -------------------------------------------------------------------------- */

applyConfig();
buildParticles();
initOpening();
initCountdown();
initMusic();
