
document.addEventListener("DOMContentLoaded",()=>{
 const nav=document.querySelector(".navbar");
 const top=document.querySelector(".back");
 const set=()=>{if(nav)nav.classList.toggle("scrolled",scrollY>60);if(top)top.style.display=scrollY>500?"grid":"none"};
 set();addEventListener("scroll",set,{passive:true});
 if(top)top.onclick=e=>{e.preventDefault();scrollTo({top:0,behavior:"smooth"})};
 const current=location.pathname.split("/").pop()||"index.html";
 document.querySelectorAll(".nav-link").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active")});
 const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(e=>obs.observe(e));
 document.querySelectorAll(".search-tabs button").forEach(b=>b.addEventListener("click",()=>{
   b.parentElement.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 }));
 document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{
   e.preventDefault();let b=f.querySelector("button[type=submit]");if(b){let t=b.textContent;b.textContent="Request received";setTimeout(()=>b.textContent=t,1800)}
 }));
 document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
});
