import { useI18n } from 'vue-i18n';

export const useLanguageStore = defineStore(
  'language',
  () => {
    const language = ref('en');
    const languageLabel = ref('Deutsch');
    const { setLocale } = useI18n();

    function changeLanguage() {
      if (language.value === 'de') {
        language.value = 'en';
        languageLabel.value = 'Deutsch';
        setLocale(language.value);
      } else {
        language.value = 'de';
        languageLabel.value = 'Englisch';
        setLocale(language.value);
      }
      return { language, languageLabel, setLocale };
    }

    return { language, languageLabel, changeLanguage, setLocale };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        maxAge: 31536000,
      }),
    },
  },
);
