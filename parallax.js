(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var targets = [];
  document.querySelectorAll('.hero-bg').forEach(function(el){
    targets.push({ el: el, container: el.closest('.hero'), factor: 0.25 });
  });
  document.querySelectorAll('.section-image-bg').forEach(function(el){
    targets.push({ el: el, container: el.closest('.section-image'), factor: 0.2 });
  });
  if (!targets.length) return;
  var ticking = false;
  function update(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < targets.length; i++) {
      var t = targets[i];
      if (!t.container) continue;
      var rect = t.container.getBoundingClientRect();
      if (rect.bottom > -200 && rect.top < vh + 200) {
        var sectionCenter = rect.top + rect.height / 2;
        var viewportCenter = vh / 2;
        var offset = (viewportCenter - sectionCenter) * t.factor;
        t.el.style.setProperty('--parallax-y', offset + 'px');
      }
    }
    ticking = false;
  }
  function onScroll(){
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
