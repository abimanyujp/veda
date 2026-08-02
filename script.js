(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- hero resonance curve draw-in ----
  var curve = document.querySelector('#resonance-chart .curve');
  if (curve) {
    if (reduceMotion) {
      curve.style.strokeDasharray = 'none';
    } else {
      var len = curve.getTotalLength();
      curve.style.strokeDasharray = len;
      curve.style.strokeDashoffset = len;
      curve.getBoundingClientRect(); // force reflow
      curve.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)';
      requestAnimationFrame(function () {
        curve.style.strokeDashoffset = '0';
      });
    }
  }

  // ---- resonance dots pulse gently once the curve has drawn ----
  var dots = document.querySelectorAll('#resonance-chart .dot');
  if (!reduceMotion) {
    setTimeout(function () {
      dots.forEach(function (d) { d.setAttribute('r', '5'); });
    }, 1700);
  }

  // ---- footer stamp ----
  var stamp = document.getElementById('year-mono');
  if (stamp) {
    var y = new Date().getFullYear();
    stamp.textContent = 'BUILD ' + y;
  }
})();
