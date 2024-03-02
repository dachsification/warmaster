export const useCookieBannerStore = defineStore(
  'cookieBanner',
  () => {
    const cookieBanner = ref(true);

    function acceptCookie(cookieValue: boolean) {
      if (cookieValue === true) {
        cookieValue = false;
      }
      return cookieValue;
    }
    return { cookieBanner, acceptCookie };
  },
  {
    persist: true,
  },
);
