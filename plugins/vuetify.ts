import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { useThemeStore } from '../store/theme';

const customLightTheme = {
  dark: false,
  colors: {
    background: '#f2f2f2',
    surface: '#f2f2f2',
    primary: '#f2f2f2',
    text: '#212121',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#a8b648',
  },
};

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    text: '#DADCE0',
    primary: '#212121',
    secondary: '#799cbf',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#ff0800',
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
