export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeName = ref('customLightTheme');
    const themeIcon = ref('mdi-weather-night');
    const themeLabel = ref('Darkmode');

    function changeTheme() {
      if (themeName.value === 'customDarkTheme') {
        themeName.value = 'customLightTheme';
        themeIcon.value = 'mdi-weather-night';
        themeLabel.value = 'Darkmode';
      } else {
        themeName.value = 'customDarkTheme';
        themeIcon.value = 'mdi-weather-sunny';
        themeLabel.value = 'Lightmode';
      }
      return { themeName, themeIcon, themeLabel };
    }

    return { themeName, themeIcon, themeLabel, changeTheme };
  },
  { persist: true },
);
