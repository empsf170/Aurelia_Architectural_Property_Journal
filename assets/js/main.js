
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
 initResponsiveSelects();
});


function initResponsiveSelects(){
  const isResponsive=()=>window.matchMedia('(max-width: 991.98px)').matches;
  const selects=[...document.querySelectorAll('select.form-select')];
  selects.forEach(select=>{
    if(select.dataset.aureliaEnhanced==='true') return;
    select.dataset.aureliaEnhanced='true';
    const wrap=document.createElement('div');
    wrap.className='aurelia-select-wrap';
    select.parentNode.insertBefore(wrap,select);
    wrap.appendChild(select);
    select.classList.add('aurelia-select-native');

    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='aurelia-select-toggle';
    toggle.setAttribute('aria-haspopup','listbox');
    toggle.setAttribute('aria-expanded','false');

    const menu=document.createElement('div');
    menu.className='aurelia-select-menu';
    menu.setAttribute('role','listbox');

    const refresh=()=>{
      const selected=select.options[select.selectedIndex];
      toggle.firstChild.textContent=selected ? selected.text : '';
      menu.querySelectorAll('.aurelia-select-option').forEach((item,i)=>{
        const active=i===select.selectedIndex;
        item.classList.toggle('selected',active);
        item.setAttribute('aria-selected',active?'true':'false');
      });
    };

    [...select.options].forEach((option,index)=>{
      const item=document.createElement('button');
      item.type='button';
      item.className='aurelia-select-option';
      item.textContent=option.text;
      item.setAttribute('role','option');
      item.dataset.index=index;
      item.addEventListener('click',()=>{
        select.selectedIndex=index;
        select.dispatchEvent(new Event('change',{bubbles:true}));
        refresh();
        wrap.classList.remove('open','open-up');
        toggle.setAttribute('aria-expanded','false');
      });
      menu.appendChild(item);
    });

    toggle.appendChild(document.createTextNode(''));
    wrap.appendChild(toggle);
    wrap.appendChild(menu);
    refresh();

    toggle.addEventListener('click',e=>{
      if(!isResponsive()) return;
      e.preventDefault();
      document.querySelectorAll('.aurelia-select-wrap.open').forEach(other=>{
        if(other!==wrap){other.classList.remove('open');other.querySelector('.aurelia-select-toggle')?.setAttribute('aria-expanded','false');}
      });
      const open=!wrap.classList.contains('open');
      if(open){
        const rect=wrap.getBoundingClientRect();
        const estimatedMenuHeight=Math.min(260,Math.max(120,select.options.length*45));
        const spaceBelow=window.innerHeight-rect.bottom-12;
        const spaceAbove=rect.top-12;
        wrap.classList.toggle('open-up',spaceBelow<estimatedMenuHeight && spaceAbove>spaceBelow);
      }else{
        wrap.classList.remove('open-up');
      }
      wrap.classList.toggle('open',open);
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });

    select.addEventListener('change',refresh);
  });

  const syncMode=()=>{
    const responsive=isResponsive();
    document.querySelectorAll('.aurelia-select-wrap').forEach(w=>{
      w.classList.remove('open');
      const native=w.querySelector('select');
      const custom=w.querySelector('.aurelia-select-toggle');
      if(native) native.disabled=false;
      if(custom) custom.style.display=responsive?'flex':'none';
    });
  };
  syncMode();
  window.addEventListener('resize',syncMode,{passive:true});
  document.addEventListener('click',e=>{
    if(!e.target.closest('.aurelia-select-wrap')){
      document.querySelectorAll('.aurelia-select-wrap.open').forEach(w=>{
        w.classList.remove('open','open-up');
        w.querySelector('.aurelia-select-toggle')?.setAttribute('aria-expanded','false');
      });
    }
  });
}
