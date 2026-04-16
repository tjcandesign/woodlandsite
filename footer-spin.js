(function(){
  var ring = document.querySelector('.footer-logo-ring');
  if(!ring) return;
  var ticking = false;
  function update(){
    var doc = document.documentElement;
    var body = document.body;
    var y = window.pageYOffset || doc.scrollTop || 0;
    var max = Math.max(
      (doc.scrollHeight || body.scrollHeight) - window.innerHeight,
      1
    );
    var ratio = Math.min(Math.max(y / max, 0), 1);
    // One full rotation + 90° across the scrollable range so the
    // "Woodland" word sits at the top when the user reaches the bottom.
    ring.style.setProperty('--spin', (ratio * 450) + 'deg');
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
