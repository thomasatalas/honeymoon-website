import { useLanguage } from '../context/LanguageContext.jsx'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-title">{t('footer.title')}</p>
        <p className="footer-subtitle">{t('footer.subtitle')}</p>
        <p className="footer-destinations">{t('footer.route')}</p>
        <p className="footer-note">{t('footer.note')}</p>
      </div>
    </footer>
  )
}

export default Footer
