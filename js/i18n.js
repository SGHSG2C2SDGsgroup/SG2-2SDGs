// /js/i18n.js

/**
 * 現在のページパスから対応する別言語ページのURLを生成
 */
function getAlternateUrl(targetLang) {
  const path = window.location.pathname; // 例: "/ja/about.html"
  
  // 現在の言語を判定（URLの最初のディレクトリ名）
  const pathParts = path.split('/').filter(Boolean);
  const currentLang = pathParts[0]; // "ja" または "en"
  
  // 残りのパスを取得
  const subPath = pathParts.slice(1).join('/'); // "about.html"
  
  return '/' + targetLang + '/' + subPath + window.location.search + window.location.hash;
}

/**
 * 言語を切り替えて保存
 */
function switchLanguage(lang) {
  localStorage.setItem('preferredLang', lang);
  const newUrl = getAlternateUrl(lang);
  window.location.href = newUrl;
}

/**
 * 言語切り替えUIの現在の言語をハイライト
 */
function initLangSwitcher() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const currentLang = pathParts[0] || 'ja';
  
  const jaBtn = document.getElementById('lang-ja');
  const enBtn = document.getElementById('lang-en');
  
  if (jaBtn && enBtn) {
    if (currentLang === 'ja') {
      jaBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      jaBtn.classList.remove('active');
      enBtn.classList.add('active');
    }
    
    jaBtn.addEventListener('click', () => switchLanguage('ja'));
    enBtn.addEventListener('click', () => switchLanguage('en'));
  }
}

// DOM構築後に初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLangSwitcher);
} else {
  initLangSwitcher();
}