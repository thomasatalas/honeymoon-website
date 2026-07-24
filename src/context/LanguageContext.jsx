import { createContext, useContext, useMemo, useState } from 'react'
import { en } from '../translations/en.js'
import { zh } from '../translations/zh.js'

const LanguageContext = createContext(null)

const translations = { en, zh }

function resolveTranslation(dictionary, key) {
  const path = key.split('.')
  let result = dictionary

  for (const part of path) {
    result = result?.[part]

    if (result === undefined) {
      return undefined
    }
  }

  return result
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const value = useMemo(() => {
    const dictionary = translations[language] || translations.en

    return {
      language,
      setLanguage,
      t: (key) => {
        const localized = resolveTranslation(dictionary, key)

        if (localized !== undefined) {
          return localized
        }

        const fallback = resolveTranslation(translations.en, key)
        return fallback ?? key
      },
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
