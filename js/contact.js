/* ================================================================
   contact.js — Web3Forms + modal  (event-delegation: works with
   forms rendered dynamically by render.js)
   ================================================================ */
const Contact = (() => {

  /* ── Form via event delegation ────────────────────────────── */
  document.addEventListener('submit', async function(e) {
    if (!e.target.matches('#contact-form')) return;
    e.preventDefault();
    const form = e.target;
    const btn  = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="blink-dot"></span> Sending…';
    btn.disabled  = true;
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method:'POST', body:new FormData(form) });
      const json = await res.json();
      if (json.success) {
        form.style.display = 'none';
        const s = document.getElementById('form-success');
        if (s) s.classList.add('visible');
      } else throw new Error(json.message);
    } catch {
      btn.innerHTML = orig; btn.disabled = false;
      showToast('Something went wrong. Email: ' + (window.SiteData?.personal?.email || 'siraj.shaon.duet@gmail.com'), 'error');
    }
  });

  /* ── Contact modal ─────────────────────────────────────────── */
  const modal = document.getElementById('contact-modal');
  function openModal()  { if(modal){modal.classList.add('open');document.body.style.overflow='hidden';} }
  function closeModal() { if(modal){modal.classList.remove('open');document.body.style.overflow='';} }
  if (modal) modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape'&&modal?.classList.contains('open')) closeModal(); });
  window.openContactModal  = openModal;
  window.closeContactModal = closeModal;

  /* ── Toast ─────────────────────────────────────────────────── */
  function showToast(msg, type='info') {
    const t = document.createElement('div');
    Object.assign(t.style,{position:'fixed',bottom:'2rem',left:'50%',transform:'translateX(-50%) translateY(20px)',
      background:type==='error'?'rgba(180,30,60,.95)':'rgba(0,100,102,.95)',color:'#fff',padding:'.85rem 1.6rem',
      borderRadius:'10px',fontSize:'.875rem',zIndex:'9999',opacity:'0',transition:'all .35s ease',
      backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,.12)',maxWidth:'90vw',textAlign:'center',
      boxShadow:'0 8px 32px rgba(0,0,0,.4)'});
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(()=>{t.style.opacity='1';t.style.transform='translateX(-50%) translateY(0)';});
    setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(20px)';setTimeout(()=>t.remove(),400);},4500);
  }

  return { initForm: ()=>{} };
})();
