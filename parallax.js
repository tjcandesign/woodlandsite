(function(){
  var bg = document.querySelector('.section-image-bg');
  var section = document.querySelector('.section-image');
  if(!bg || !section) return;
  // Respect reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var ticking = false;
  var factor = 0.2;
  function update(){
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom > -200 && rect.top < vh + 200) {
      var sectionCenter = rect.top + rect.height / 2;
      var viewportCenter = vh / 2;
      var offset = (viewportCenter - sectionCenter) * factor;
      bg.style.setProperty('--parallax-y', offset + 'px');
    }
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
