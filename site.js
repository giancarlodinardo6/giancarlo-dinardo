// Shared site script — nav active state, mobile menu, reveal-on-scroll
(function(){
  // active nav link by path segment
  var path = location.pathname;
  document.querySelectorAll('[data-section]').forEach(function(a){
    var s = a.getAttribute('data-section');
    if(!s) return;
    if(path.indexOf(s) !== -1 || (s==='lifecycle' && path.indexOf('creative-lifecycle-hub')!==-1)) a.classList.add('active');
  });
  // mobile menu
  var b = document.getElementById('burger'), m = document.getElementById('mobile-menu');
  if(b && m){
    b.addEventListener('click', function(){ b.classList.toggle('open'); m.classList.toggle('open'); });
    m.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ b.classList.remove('open'); m.classList.remove('open'); }); });
  }
  // reveal on scroll
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduce || !Element.prototype.animate) return;
  var els = [].slice.call(document.querySelectorAll('.r')), seen = new WeakSet();
  function check(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function(el){
      if(seen.has(el)) return;
      var r = el.getBoundingClientRect();
      if(r.top < vh*0.92 && r.bottom > 0){
        seen.add(el);
        el.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:720,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
      }
    });
  }
  check(); requestAnimationFrame(check);
  window.addEventListener('scroll', check, {passive:true});
  window.addEventListener('resize', check);
})();
