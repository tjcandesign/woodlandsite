(function(){
  var cards = document.querySelectorAll('.process-mini-card');
  var arrows = document.querySelectorAll('.process-mini-arrow');
  if (!cards.length || !arrows.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Still highlight when cards come into view, but no transition.
  }
  var activated = [];
  var ticking = false;
  function update(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var triggerLine = vh * 0.72; // activate as a card rises past ~72% of viewport
    cards.forEach(function(card, i){
      var rect = card.getBoundingClientRect();
      var visible = rect.top < triggerLine;
      // When card i (index >= 1) is visible, activate arrow i-1
      if (i > 0 && visible) {
        var arrow = arrows[i - 1];
        if (arrow && !arrow.classList.contains('is-active')) {
          arrow.classList.add('is-active');
        }
      }
      // Reverse: if card is below the trigger, de-activate the arrow leading to it
      if (i > 0 && !visible) {
        var arrow2 = arrows[i - 1];
        if (arrow2 && arrow2.classList.contains('is-active')) {
          arrow2.classList.remove('is-active');
        }
      }
    });
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
