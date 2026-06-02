<template>
  <div class="translator-container">
    <div class="translator-card">
      <h1>Translation Tool</h1>
      <p class="subtitle">Translate between Filipino and English</p>

      <div class="translator-wrapper">
        <div class="language-section">
          <div class="language-header">
            <select v-model="sourceLang" class="language-select">
              <option value="en">English</option>
              <option value="tl">Filipino</option>
            </select>
            <p class="char-count">{{ sourceText.length }} characters</p>
          </div>
          <textarea
            v-model="sourceText"
            placeholder="Enter text to translate..."
            class="translator-input"
            @input="translateText"
          ></textarea>
        </div>

        <button @click="swapLanguages" class="swap-button" title="Swap languages">
          <i class="fas fa-exchange-alt"></i>
        </button>

        <div class="language-section">
          <div class="language-header">
            <select v-model="targetLang" class="language-select" disabled>
              <option value="en">English</option>
              <option value="tl">Filipino</option>
            </select>
            <p class="char-count">{{ translatedText.length }} characters</p>
          </div>
          <textarea
            v-model="translatedText"
            placeholder="Translation will appear here..."
            class="translator-output"
            readonly
          ></textarea>
        </div>
      </div>

      <div class="button-group">
        <button @click="copyTranslation" class="btn btn-copy">
          <i class="fas fa-copy"></i> Copy Translation
        </button>
        <button @click="clearAll" class="btn btn-clear">
          <i class="fas fa-trash"></i> Clear All
        </button>
      </div>

      <div v-if="isLoading" class="loading-indicator">
        <p>Translating...</p>
      </div>

      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Translator',
  data() {
    return {
      sourceText: '',
      translatedText: '',
      sourceLang: 'en',
      targetLang: 'tl',
      isLoading: false,
      errorMessage: '',
    }
  },
  methods: {
    async translateText() {
      if (this.sourceText.trim() === '') {
        this.translatedText = ''
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        this.translatedText = await this.$translator.translateText(
          this.sourceText,
          this.sourceLang,
          this.targetLang
        )
      } catch (error) {
        console.error('Translation error:', error)
        this.errorMessage = 'Error connecting to translation service.'
        this.translatedText = ''
      } finally {
        this.isLoading = false
      }
    },
    swapLanguages() {
      const temp = this.sourceLang
      this.sourceLang = this.targetLang
      this.targetLang = temp

      const tempText = this.sourceText
      this.sourceText = this.translatedText
      this.translatedText = tempText

      if (this.sourceText.trim() !== '') {
        this.translateText()
      }
    },
    copyTranslation() {
      if (this.translatedText.trim() === '') {
        alert('No translation to copy!')
        return
      }

      navigator.clipboard.writeText(this.translatedText).then(() => {
        alert('Translation copied to clipboard!')
      })
    },
    clearAll() {
      this.sourceText = ''
      this.translatedText = ''
      this.errorMessage = ''
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.translator-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.translator-card {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  color: #333;
  font-size: 32px;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.translator-wrapper {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
}

.language-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.language-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.language-select {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.language-select:hover {
  border-color: #667eea;
}

.language-select:focus {
  outline: none;
  border-color: #667eea;
}

.language-select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

.char-count {
  color: #999;
  font-size: 12px;
}

.translator-input,
.translator-output {
  width: 100%;
  height: 250px;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.translator-input {
  color: #333;
}

.translator-input:focus {
  outline: none;
  border-color: #667eea;
}

.translator-input::placeholder {
  color: #ccc;
}

.translator-output {
  background: #f8f9ff;
  color: #333;
  border-color: #e0e0e0;
}

.translator-output:focus {
  outline: none;
  border-color: #667eea;
}

.swap-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.swap-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.swap-button:active {
  transform: translate(-50%, -50%) scale(0.95);
}

.button-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-copy {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-copy:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-clear {
  background: #f0f0f0;
  color: #333;
}

.btn-clear:hover {
  background: #e0e0e0;
}

.loading-indicator {
  text-align: center;
  color: #667eea;
  font-weight: 600;
  padding: 20px;
  background: #f8f9ff;
  border-radius: 8px;
  margin-top: 20px;
}

.error-message {
  text-align: center;
  color: #d32f2f;
  padding: 15px;
  background: #ffebee;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #d32f2f;
}

@media (max-width: 768px) {
  .translator-wrapper {
    flex-direction: column;
  }

  .swap-button {
    position: static;
    transform: none;
    margin: 15px 0;
    width: 100%;
    border-radius: 8px;
  }

  .translator-card {
    padding: 25px;
  }

  h1 {
    font-size: 24px;
  }

  .translator-input,
  .translator-output {
    height: 200px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>
