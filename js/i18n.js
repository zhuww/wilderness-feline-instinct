/* ==========================================================================
   Wilderness Feline Instinct — i18n.js
   多语言基础设施（IIFE 挂 window.Game）

   对外 API（其他模块按此约定调用，签名稳定勿改）：
     Game.i18n.t(key, vars)    翻译：dicts[当前语言][key] ?? dicts.zh[key] ?? key；
                               vars 做 {name}/{n}/{dmg} 等占位替换
     Game.i18n.setLang(lang)   切换语言，持久化 localStorage('wfi_lang')，
                               调用 Game.ui 重绘（若存在）并 applyPage()
     Game.i18n.getLang()       返回 'zh'|'en'|'fr'|'es'|'de'|'ja'|'ko'|'ru'
     Game.i18n.cycleLang()     按 zh→en→fr→es→de→ja→ko→ru→zh 循环切换（供 HUD 按钮使用）
     Game.i18n.langName(lang)  语言显示名：中文 / English / Français / Español / Deutsch
                               / 日本語 / 한국어 / Русский
     Game.i18n.dicts           { zh:{}, en:{}, fr:{}, es:{}, de:{}, ja:{}, ko:{}, ru:{} }
                               （由 lang/ 文件填充）
     Game.i18n.applyPage()     扫描 document 所有 [data-i18n]（文本）与
                               [data-i18n-html]（innerHTML）元素并填充；
                               扩展支持 [data-i18n-title]（title 属性）
     Game.i18n.updateLangButton()  刷新 #btn-lang 按钮文案（main.js 接线用）
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});

  /* 支持的语言顺序（cycleLang 按此循环） */
  const LANGS = ['zh', 'en', 'fr', 'es', 'de', 'ja', 'ko', 'ru'];
  const STORE_KEY = 'wfi_lang';
  /* 语言显示名（langName 用） */
  const NAMES = {
    zh: '中文',
    en: 'English',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語',
    ko: '한국어',
    ru: 'Русский',
  };

  /* 字典容器：zh 为基准语言，其余由 lang/ 文件填充 */
  const dicts = { zh: {}, en: {}, fr: {}, es: {}, de: {}, ja: {}, ko: {}, ru: {} };

  /* 当前语言：从 localStorage 恢复，非法值或读取失败回退 zh */
  let lang = 'zh';
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved && LANGS.indexOf(saved) !== -1) lang = saved;
  } catch (e) { /* storage unavailable */ }

  /* --------------------------------------------------------------- 翻译 */
  /* 查找顺序：当前语言 → 中文（基准兜底）→ 原 key 本身 */
  function t(key, vars) {
    const dict = dicts[lang] || {};
    let s = (dict[key] !== undefined && dict[key] !== null)
      ? dict[key]
      : (dicts.zh && dicts.zh[key] !== undefined && dicts.zh[key] !== null)
        ? dicts.zh[key]
        : key;
    s = String(s);
    if (vars) {
      for (const k in vars) {
        s = s.split('{' + k + '}').join(String(vars[k]));
      }
    }
    return s;
  }

  /* ----------------------------------------------------------- 语言切换 */
  function setLang(newLang) {
    if (LANGS.indexOf(newLang) === -1) return false;
    lang = newLang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
    /* 动态 UI 重绘：Game.ui 已加载时刷新面板 / HUD / 徽标（各自内部有兜底） */
    if (Game.ui) {
      if (typeof Game.ui.refreshModals === 'function') Game.ui.refreshModals();
      if (typeof Game.ui.updateHUD === 'function') Game.ui.updateHUD();
      if (typeof Game.ui.refreshBadges === 'function') Game.ui.refreshBadges();
    }
    /* 静态页面文本 */
    applyPage();
    return true;
  }

  function getLang() { return lang; }

  function cycleLang() {
    const idx = LANGS.indexOf(lang);
    const next = LANGS[(idx + 1) % LANGS.length];
    setLang(next);
    return next;
  }

  function langName(l) {
    return NAMES[l] || NAMES.zh;
  }

  /* --------------------------------------------------------- 页面填充 */
  /* 扫描 [data-i18n]（textContent）、[data-i18n-html]（innerHTML）、
     [data-i18n-title]（title 属性）三类元素并填充当前语言 */
  function applyPage() {
    try {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        el.textContent = t(key);
      });
      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (!key) return;
        el.innerHTML = t(key);
      });
      document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        const key = el.getAttribute('data-i18n-title');
        if (!key) return;
        el.title = t(key);
      });
    } catch (e) { /* DOM 尚未就绪时静默跳过 */ }
  }

  /* 语言按钮文案：'🌐 中文' / '🌐 English' ...（main.js 初始化与点击后调用） */
  function updateLangButton() {
    try {
      const btn = document.getElementById('btn-lang');
      if (btn) btn.textContent = '🌐 ' + langName(lang);
    } catch (e) { /* ignore */ }
  }

  Game.i18n = {
    t, setLang, getLang, cycleLang, langName,
    dicts, applyPage, updateLangButton,
    LANGS,
  };
})();
