import { useLanguage } from '../context/LanguageContext.jsx'

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher" aria-label="Language switcher">
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="Use English"
      >
        EN
      </button>
      <button
        type="button"
        className={language === 'zh' ? 'is-active' : ''}
        onClick={() => setLanguage('zh')}
        aria-pressed={language === 'zh'}
        aria-label="使用简体中文"
      >
        中文
      </button>
    </div>
  )
}

export default LanguageSwitcher
