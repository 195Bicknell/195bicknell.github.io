/* ---- Edit captions here (one per slide, same order) ---- */
const captions = [
  ["Join 195 Bicknell", "Sea Cadets in Richmond, BC — ages 12 to 18"],
  ["Lest We Forget", "Remembrance Day parade"],
  ["Award-Winning Team", "3rd place finish"],
  ["Out on the Water", "Sailing and seamanship training"]
];
/* ---- Gallery strip: [image path, caption] ---- */
const gallery = [
  ["images/gallery1.jpg","Parade night"],["images/gallery2.jpg","Sail training"],
  ["images/gallery3.jpg","Annual Ceremonial Review"],["images/gallery4.jpg","Band"],
  ["images/gallery5.jpg","Community events"],["images/gallery6.jpg","Summer training"]
];
const INTERVAL = 6000;

// Slideshow
const slides=[...document.querySelectorAll('.slide')], dotsEl=document.querySelector('.dots'),
      bar=document.querySelector('.progress'), show=document.querySelector('.slideshow');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let i=0, timer, paused=false;
slides.forEach((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Photo '+(n+1));b.onclick=()=>go(n);dotsEl.appendChild(b)});
const dots=[...dotsEl.children];
function go(n){
  slides[i].classList.remove('active'); i=(n+slides.length)%slides.length; slides[i].classList.add('active');
  dots.forEach((d,k)=>d.classList.toggle('on',k===i));
  const c=captions[i]||["",""]; document.getElementById('cap-title').textContent=c[0]; document.getElementById('cap-sub').textContent=c[1];
  restart();
}
function restart(){
  clearTimeout(timer); bar.style.transition='none'; bar.style.width='0';
  if(paused||reduce) return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{bar.style.transition=`width ${INTERVAL}ms linear`;bar.style.width='100%'}));
  timer=setTimeout(()=>go(i+1),INTERVAL);
}
document.querySelector('.prev').onclick=()=>go(i-1);
document.querySelector('.next').onclick=()=>go(i+1);
show.addEventListener('mouseenter',()=>{paused=true;restart()});
show.addEventListener('mouseleave',()=>{paused=false;restart()});
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
let sx=null; show.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
show.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));sx=null});
go(0);

// Gallery strip (duplicated for a seamless loop)
const shades=['#13305a','#1c4a7a','#2a5d8f','#0b1f3a','#3b6e9e','#16406b'];
document.getElementById('track').innerHTML=[...gallery,...gallery].map(([src,cap],k)=>
  `<div class="tile" style="background-image:url('${src}'),linear-gradient(135deg,${shades[k%6]},#071529)"><span>${cap}</span></div>`).join('');

// Mobile menu
const mb=document.querySelector('.menu-btn'), links=document.getElementById('links');
mb.onclick=()=>{const o=links.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
links.querySelectorAll('a').forEach(a=>a.onclick=()=>{links.classList.remove('open');mb.setAttribute('aria-expanded',false)});
document.getElementById('yr').textContent=new Date().getFullYear();
