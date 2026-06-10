(function(){
  function initAndroidNav(){
    try{
      const links = document.querySelectorAll('.nav-links a');
      links.forEach(link => {
        link.addEventListener('click', function(e){
          const href = this.getAttribute('href');
          const target = document.querySelector(href);
          if(!target) return;
          e.preventDefault();
          e.stopPropagation();

          // Close the mobile menu if helper exists
          if(typeof setMenuOpen === 'function'){
            setMenuOpen(false);
          } else {
            const nav = document.getElementById('siteNav');
            const navToggle = document.getElementById('navToggle');
            const navBackdrop = document.getElementById('navBackdrop');
            if(nav) nav.classList.remove('open');
            if(navToggle) { navToggle.setAttribute('aria-expanded','false'); navToggle.textContent = '☰'; }
            if(navBackdrop) navBackdrop.classList.remove('show');
          }

          // Smooth scroll to target
          if(typeof scrollToTarget === 'function'){
            scrollToTarget(target);
          } else {
            try{ target.scrollIntoView({behavior:'smooth', block:'start'}); window.scrollBy(0, -92); }catch(err){}
          }
        }, { passive: false });

        // Also ensure touchend triggers the same behaviour on some Android browsers
        link.addEventListener('touchend', function(e){
          // Let the click handler handle it; prevent duplicate events
        }, { passive: true });
      });
    }catch(err){ /* ignore */ }
  }

  if(window.isAndroid){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', initAndroidNav);
    } else {
      initAndroidNav();
    }
  } else {
    window.addEventListener('platform:detected', (ev) => {
      if(ev && ev.detail && ev.detail.isAndroid){
        initAndroidNav();
      }
    });
  }
})();
