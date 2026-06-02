export default function ({ app }, inject) {
  const translator = {
    async translateText(text, sourceLang = 'en', targetLang = 'tl') {
      if (!text || text.trim() === '') {
        return ''
      }

      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
        )

        const data = await response.json()

        if (data && data[0] && data[0][0]) {
          return data[0].map(chunk => chunk[0]).join('')
        } else {
          throw new Error('Translation service error')
        }
      } catch (error) {
        console.error('Translation error:', error)
        throw error
      }
    },

    async translateBatch(texts, sourceLang = 'en', targetLang = 'tl') {
      try {
        const translations = await Promise.all(
          texts.map(text => this.translateText(text, sourceLang, targetLang))
        )
        return translations
      } catch (error) {
        console.error('Batch translation error:', error)
        throw error
      }
    },

    getAvailableLanguages() {
      return [
        { code: 'en', name: 'English' },
        { code: 'tl', name: 'Filipino' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese (Simplified)' },
        { code: 'zh-TW', name: 'Chinese (Traditional)' },
        { code: 'ar', name: 'Arabic' },
        { code: 'ru', name: 'Russian' },
        { code: 'hi', name: 'Hindi' },
        { code: 'vi', name: 'Vietnamese' },
        { code: 'th', name: 'Thai' },
        { code: 'id', name: 'Indonesian' },
        { code: 'tr', name: 'Turkish' },
      ]
    },
  }

  app.$translator = translator
  inject('translator', translator)
}
