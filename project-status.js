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
  var $sumHallSpec = document.getElementById('calc-sum-hall-spec');
  var $sumHall = document.getElementById('calc-sum-hall');
  var $sumTop40 = document.getElementById('calc-sum-top40');
  var $sumTotal = document.getElementById('calc-sum-total');
  var $printBtn = document.querySelector('.calc-print');

  // Top 40 piece — fixed dimensions
  var TOP40_W = 15;
  var TOP40_H = 20;

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
    var hallTotal = each * 2;
    var top40 = TOP40_W * TOP40_H * p;
    var grand = hallTotal + top40;

    var sqinTxt = num.format(sqin);
    var eachTxt = dollar.format(each);
    var hallTxt = dollar.format(hallTotal);
    var top40Txt = dollar.format(top40);
    var grandTxt = dollar.format(grand);

    if ($sqin) $sqin.textContent = sqinTxt;
    if ($each) $each.textContent = eachTxt;
    if ($total) $total.textContent = hallTxt;
    if ($diaW) $diaW.textContent = num.format(w);
    if ($diaH) $diaH.textContent = num.format(h);
    if ($diaSqin) $diaSqin.textContent = sqinTxt;
    if ($diaEach) $diaEach.textContent = eachTxt;
    if ($sumHallSpec) $sumHallSpec.textContent = num.format(w) + ' × ' + num.format(h);
    if ($sumHall) $sumHall.textContent = hallTxt;
    if ($sumTop40) $sumTop40.textContent = top40Txt;
    if ($sumTotal) $sumTotal.textContent = grandTxt;
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
