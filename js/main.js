/* Voltra cinematic concept: interactions
   Plain JavaScript, no dependencies. Every feature checks for its own
   elements first, so each page only runs what it contains. */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Play each section's animations when it scrolls into view ---------- */
  // The class is only added here, so if this script fails nothing stays paused.
  if ("IntersectionObserver" in window && !reduced) {
    const sections = $$(".site > section, .site > .mq, .site main > section, .site main > .mq").filter((s) => !s.classList.contains("hero") && s.getBoundingClientRect().top > window.innerHeight * 0.9);
    sections.forEach((s) => s.classList.add("await"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove("await"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Header: subtle shrink once scrolled ---------- */
  const hdrNav = $(".hdr nav");
  if (hdrNav) {
    const onScroll = () => { hdrNav.style.background = window.scrollY > 40 ? "rgba(14,17,16,0.86)" : ""; };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------- Mobile menu (native dialog) ---------- */
  const menu = $("#menu"), openBtn = $("[data-menu-open]");
  if (menu && openBtn && typeof menu.showModal === "function") {
    openBtn.addEventListener("click", () => { menu.showModal(); openBtn.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; });
    menu.addEventListener("close", () => { openBtn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; openBtn.focus(); });
    $$("[data-menu-close], a", menu).forEach((el) => el.addEventListener("click", () => menu.close()));
  }

  /* ---------- Finish swatches (radio group) ---------- */
  $$("[data-swatches]").forEach((group) => {
    const sw = $$("[role='radio']", group);
    const label = $("[data-finish-name]");
    const pick = (s, focus) => {
      sw.forEach((x) => { const on = x === s; x.setAttribute("aria-checked", on); x.tabIndex = on ? 0 : -1; x.style.outline = on ? "2px solid var(--a)" : "1.5px solid rgba(238,242,232,0.25)"; x.style.outlineOffset = on ? "3px" : "0"; });
      if (label) label.textContent = s.dataset.name;
      if (focus) s.focus();
    };
    sw.forEach((s, i) => {
      s.addEventListener("click", () => pick(s));
      s.addEventListener("keydown", (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); pick(sw[(i + d + sw.length) % sw.length], true); });
    });
    pick(sw[0]);
  });

  /* ---------- AI assistant: prompt chips swap the answer (re-showing replays its animation) ---------- */
  const prompts = $$("[data-prompt]");
  if (prompts.length) {
    prompts.forEach((btn) => btn.addEventListener("click", () => {
      prompts.forEach((b) => { const on = b === btn; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
      $$("[data-answer]").forEach((a) => { a.hidden = a.dataset.answer !== btn.dataset.prompt; });
    }));
  }

  /* ---------- Bikes: filter chips ---------- */
  const filters = $$("[data-filter]");
  if (filters.length) {
    const cards = $$("[data-cats]"), status = $("[data-filter-status]");
    filters.forEach((btn) => btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => { const on = b === btn; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
      let shown = 0;
      cards.forEach((c) => { const show = f === "All" || c.dataset.cats.includes(f); c.hidden = !show; if (show) shown++; });
      if (status) status.textContent = `${shown} bikes shown`;
    }));
  }

  /* ---------- Contact: smart replies, validation, sent state ---------- */
  const form = $("[data-contact]");
  if (form) {
    const msg = $("#m", form);
    $$("[data-reply]", form).forEach((chip) => chip.addEventListener("click", () => {
      $$("[data-reply]", form).forEach((c) => c.classList.toggle("on", c === chip));
      msg.value = chip.dataset.reply; msg.focus();
    }));
    const rules = {
      n: (v) => (v.trim().length >= 2 ? "" : "Enter your name."),
      e: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email, like name@example.com."),
      m: (v) => (v.trim().length >= 10 ? "" : "Write a short message, or tap a smart reply."),
    };
    const check = (id) => {
      const el = $("#" + id, form), wrap = el.closest(".fl"); const text = rules[id](el.value);
      let p = $(".msg", wrap); if (!p) { p = document.createElement("p"); p.className = "msg"; p.id = id + "-msg"; wrap.appendChild(p); el.setAttribute("aria-describedby", p.id); }
      p.textContent = text; wrap.classList.toggle("err", !!text); el.setAttribute("aria-invalid", text ? "true" : "false");
      return !text;
    };
    Object.keys(rules).forEach((id) => $("#" + id, form).addEventListener("blur", (e) => { if (e.target.value) check(id); }));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = Object.keys(rules).map((id) => [id, check(id)]);
      const bad = results.find(([, ok]) => !ok);
      if (bad) { $("#" + bad[0], form).focus(); return; }
      // Concept only: hook this up to EmailJS, Formspree or your own endpoint.
      $("[data-send-label]", form).textContent = "Sent";
      $("[data-sent]", form).hidden = false;
      form.reset(); $$("[data-reply]", form).forEach((c) => c.classList.remove("on"));
    });
  }

  /* ---------- Footer newsletter (concept) ---------- */
  $$("[data-news]").forEach((f) => f.addEventListener("submit", (e) => e.preventDefault()));
})();
