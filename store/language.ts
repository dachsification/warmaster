export const useLanguageStore = defineStore(
  'language',
  () => {
    const language = ref('en');

    function changeLanguage() {
      if (language.value === 'de') {
        language.value = 'en';
      } else {
        language.value = 'de';
      }
      return language.value;
    }

    return { language, changeLanguage };
  },
  {
    persist: true,
  },
);
