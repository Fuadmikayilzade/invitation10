import React,{useState} from 'react'
import './RSVPCard.css'
const WP='994554240861'
export default function RSVPCard(){
  const [form,setForm]=useState({name:'',guests:'1',attending:'yes',message:''})
  const [submitted,setSubmitted]=useState(false)
  const [nameErr,setNameErr]=useState(false)
  const set=(f,v)=>{setForm(p=>({...p,[f]:v}));if(f==='name')setNameErr(false)}

  const submit=()=>{
    if(!form.name.trim()){setNameErr(true);return}
    const msg=encodeURIComponent(`✿ TOY RSVP — Nurlan & Kəmalə\n\nAd: ${form.name}\nNəfər: ${form.guests}\nİştirak: ${form.attending==='yes'?'Bəli ✓':'Xeyr ✗'}\nMesaj: ${form.message||'—'}`)
    window.open(`https://wa.me/${WP}?text=${msg}`,'_blank')
    setSubmitted(true)
  }

  if(submitted) return(
    <section className="rsvp-sec">
      <div className="ty-card">
        <span className="ty-star">✿</span>
        <h2 className="ty-title">Təşəkkür edirik!</h2>
        <div className="g-divider"><div className="g-diamond"/></div>
        <p className="ty-text">Cavabınız göndərildi.<br/>Sizi görməyi səbirsizliklə gözləyirik.</p>
        <p className="ty-names">Nurlan &amp; Kəmalə</p>
        <p className="ty-date">11 İyun 2026</p>
      </div>
    </section>
  )

  return(
    <section className="rsvp-sec">
      <p className="rsvp-head">İştirak Blankı</p>
      <div className="rsvp-card">
        <div className="rsvp-f">
          <label className="rsvp-lbl">Ad Soyad *</label>
          <input className={`rsvp-inp${nameErr?' err':''}`} type="text" placeholder="Adınızı daxil edin" value={form.name} onChange={e=>set('name',e.target.value)}/>
          {nameErr&&<span className="rsvp-err">Ad mütləqdir</span>}
        </div>
        <div className="rsvp-f">
          <label className="rsvp-lbl">Nəfər sayı</label>
          <div className="stepper">
            <button className="step-btn" onClick={()=>set('guests',String(Math.max(1,+form.guests-1)))}>−</button>
            <span className="step-val">{form.guests}</span>
            <button className="step-btn" onClick={()=>set('guests',String(Math.min(10,+form.guests+1)))}>+</button>
          </div>
        </div>
        <div className="rsvp-f">
          <label className="rsvp-lbl">İştirak</label>
          <div className="radio-row">
            <button className={`radio-btn${form.attending==='yes'?' sel':''}`} onClick={()=>set('attending','yes')}>✓ Bəli, iştirak edəcəm</button>
            <button className={`radio-btn${form.attending==='no'?' sel':''}`} onClick={()=>set('attending','no')}>✗ Təəssüf, iştirak edə bilməyəcəm</button>
          </div>
        </div>
        <div className="rsvp-f">
          <label className="rsvp-lbl">Mesaj (istəyə görə)</label>
          <textarea className="rsvp-ta" rows={3} placeholder="Gəlin-bəyə xoş arzularınız..." value={form.message} onChange={e=>set('message',e.target.value)}/>
        </div>
        <button className="rsvp-submit" onClick={submit}>Göndər</button>
      </div>
    </section>
  )
}
