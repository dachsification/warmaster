export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeName = ref('customLightTheme');

    function changeTheme() {
      if (themeName.value === 'customDarkTheme') {
        themeName.value = 'customLightTheme';
      } else {
        themeName.value = 'customDarkTheme';
      }
      return themeName.value;
    }

    return { themeName, changeTheme };
  },
  { persist: true },
);
