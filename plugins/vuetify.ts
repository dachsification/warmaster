import { createVuetify, type ThemeDefinition } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { useThemeStore } from '../store/theme';

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f1f3f2',
    surface: '#D9DCD8',
    primary: '#272424',
    secondary: '#5D5C61',
    //
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#a8b648',
  },
};

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#282828',
    primary: '#66fcf1',
    secondary: '#C5C6C7',
    //
    primaryDarken: '#45A29E',
    error: '#950740',
    info: '#950740',
    success: '#950740',
    warning: '#950740',
  },
};

export default defineNuxtPlugin((app) => {
  const themeStore = useThemeStore();
  const { themeName } = storeToRefs(themeStore);
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: themeName.value,
      themes: { customLightTheme, customDarkTheme },
    },
  });
  app.vueApp.use(vuetify);
});
