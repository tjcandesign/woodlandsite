(function(){
  var $w = document.getElementById('calc-width');
  var $h = document.getElementById('calc-height');
  var $p = document.getElementById('calc-price');
  if (!$w || !$h || !$p) return;

  var $sqin = document.getElementById('calc-sqin');
  var $each = document.getElementById('calc-each');
  var $total = document.getElementById('calc-total');
  var $diaW = document.getElementById('calc-diagram-w');
  var $diaH = document.getElementById('calc-diagram-h');
  var $diaSqin = document.getElementById('calc-diagram-sqin');
  var $diaEach = document.getElementById('calc-diagram-each');
  var $printBtn = document.querySelector('.calc-print');

  var dollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  var num = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

  function n(el, fallback){
    var v = parseFloat(el.value);
    return (isFinite(v) && v >= 0) ? v : fallback;
  }

  function update(){
    var w = n($w, 0);
    var h = n($h, 0);
    var p = n($p, 0);
    var sqin = w * h;
    var each = sqin * p;
    var total = each * 2;

    var sqinTxt = num.format(sqin);
    var eachTxt = dollar.format(each);
    var totalTxt = dollar.format(total);

    if ($sqin) $sqin.textContent = sqinTxt;
    if ($each) $each.textContent = eachTxt;
    if ($total) $total.textContent = totalTxt;
    if ($diaW) $diaW.textContent = num.format(w);
    if ($diaH) $diaH.textContent = num.format(h);
    if ($diaSqin) $diaSqin.textContent = sqinTxt;
    if ($diaEach) $diaEach.textContent = eachTxt;
  }

  ['input', 'change'].forEach(function(evt){
    $w.addEventListener(evt, update);
    $h.addEventListener(evt, update);
    $p.addEventListener(evt, update);
  });

  if ($printBtn) {
    $printBtn.addEventListener('click', function(){
      window.print();
    });
  }

  update();
})();
