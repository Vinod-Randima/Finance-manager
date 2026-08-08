const AppUI={
  modal(html){$("#modal").innerHTML=html;$("#modalBackdrop").classList.remove("hidden")},
  closeModal(){$("#modalBackdrop").classList.add("hidden");$("#modal").innerHTML=""},
  toast(msg,type="success"){const el=document.createElement("div");el.className=`toast ${type}`;el.textContent=msg;$("#toastContainer").appendChild(el);setTimeout(()=>el.remove(),2600)},
  moneyInput(v=""){return `<input type="number" min="0" step="1" value="${esc(v)}">`},
  formModal(title,body,onSubmit){this.modal(`<div class="modal-title"><div><span class="eyebrow">Finance Manager</span><h2>${title}</h2></div><button class="icon-btn" data-close>×</button></div>${body}`); $("#modal").querySelector("[data-close]").onclick=()=>this.closeModal(); const form=$("#modal form"); if(form)form.onsubmit=e=>{e.preventDefault();onSubmit(new FormData(form));}},
  refresh(){renderCurrentView()}
};
$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")AppUI.closeModal()});