(function(){
  var hero = document.querySelector('.hero');
  if(!hero) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var ticking = false;
  function update(){
    var rect = hero.getBoundingClientRect();
    var h = rect.height || 1;
    // 0 when hero top is at viewport top, 1 when hero has scrolled fully out
    var ratio = Math.min(Math.max(-rect.top / h, 0), 1);
    document.documentElement.style.setProperty('--hero-scroll', ratio.toFixed(3));
    ticking = false;
  }
  function onScroll(){
    if(!ticking){
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
