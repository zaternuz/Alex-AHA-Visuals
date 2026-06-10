// platform.js — added by GitHub Copilot Chat
// Detect Android explicitly and expose platform information for site scripts/CSS
(function () {
  try {
    const ua = navigator.userAgent || '';
    let isAndroid = false;
    if (navigator.userAgentData && navigator.userAgentData.platform) {
      try {
        isAndroid = String(navigator.userAgentData.platform).toLowerCase().includes('android');
      } catch (e) {
        /* ignore */
      }
    } else {
      isAndroid = /android/i.test(ua);
    }

    window.isAndroid = !!isAndroid;
    document.documentElement.setAttribute('data-platform', isAndroid ? 'android' : 'desktop');

    // Add theme-color meta if not present (helps some Android browsers/native UI)
    try {
      const existing = document.querySelector('meta[name="theme-color"]');
      if (!existing) {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#08040d';
        document.head.appendChild(meta);
      }
    } catch (e) {
      /* ignore */
    }

    // Small adjustments for Android to improve perf/compat
    if (isAndroid) {
      // reduce animations intensity by adding a class — CSS rules can target [data-platform="android"]
      document.documentElement.classList.add('platform-android');

      // For existing scripts that check window.isAndroid or data-platform, this is sufficient.
      // Dispatch an event so inline scripts can react if they already ran
      try {
        window.dispatchEvent(new CustomEvent('platform:detected', { detail: { isAndroid: true } }));
      } catch (e) {
        // ignore
      }
    }

    // Load platform-specific CSS if available
    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/assets/css/platform.css';
      link.media = 'all';
      document.head.appendChild(link);
    } catch (e) {
      // ignore
    }
  } catch (err) {
    window.isAndroid = false;
  }
})();
