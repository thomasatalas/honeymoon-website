import JournalEntry from '../components/JournalEntry.jsx'
import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { journalEntries } from '../data/journal.js'

function Journal() {
  const { t } = useLanguage()

  return (
    <PageLayout
      eyebrow={t('pages.journal.eyebrow')}
      title={t('pages.journal.title')}
      intro={t('pages.journal.intro')}
    >
      <section className="journal-page" aria-label="Daily honeymoon journal">
        <div className="journal-page__line" aria-hidden="true" />
        {journalEntries.map((entry, index) => (
          <JournalEntry key={entry.date} entry={entry} day={index + 1} />
        ))}
      </section>
    </PageLayout>
  )
}

export default Journal
