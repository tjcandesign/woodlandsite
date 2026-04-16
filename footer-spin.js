(function(){
  var ring = document.querySelector('.footer-logo-ring');
  if(!ring) return;
  var ticking = false;
  function update(){
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    // 0.25 deg per px scrolled
    ring.style.setProperty('--spin', (y * 0.25) + 'deg');
    ticking = false;
  }
  function onScroll(){
    if(!ticking){
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();
