import React,{useState,useEffect,useRef} from 'react'
import {dayImg,nightImg,coupleImg,dresscodeImg,venueImg} from '../assets'
import Countdown from './Countdown'
import RSVPCard from './RSVPCard'
import VenueSection from './VenueSection'
import './InviteScreen.css'

function useReveal(){
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal')
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
    }),{threshold:.1})
    els.forEach(el=>io.observe(el))
    return()=>io.disconnect()
  },[])
}

export default function InviteScreen(){
  const [dark,setDark]=useState(false)
  const [visible,setVisible]=useState(false)
  const [scratchDone,setScratchDone]=useState(false)
  const canvasRef=useRef(null)
  const drawing=useRef(false)
  const lastPos=useRef(null)
  const totalPx=useRef(0)

  useReveal()
  useEffect(()=>{setTimeout(()=>setVisible(true),200)},[])

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const ctx=canvas.getContext('2d',{willReadFrequently:true})
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight
    totalPx.current=canvas.width*canvas.height
    const g=ctx.createLinearGradient(0,0,canvas.width,canvas.height)
    g.addColorStop(0,'#d4a574'); g.addColorStop(.5,'#e8c89a'); g.addColorStop(1,'#b8943f')
    ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle='rgba(255,255,255,.2)'; ctx.font='italic 15px "Cormorant Garamond",serif'
    ctx.textAlign='center'
    ctx.fillText('✿  Cızaraq açın  ✿',canvas.width/2,canvas.height/2)
  },[])

  const getPos=(e,c)=>{
    const r=c.getBoundingClientRect(),t=e.touches?e.touches[0]:e
    return{x:(t.clientX-r.left)*(c.width/r.width),y:(t.clientY-r.top)*(c.height/r.height)}
  }
  const doScratch=e=>{
    e.preventDefault(); if(!drawing.current) return
    const c=canvasRef.current
    const ctx=c.getContext('2d',{willReadFrequently:true})
    const pos=getPos(e,c)
    ctx.globalCompositeOperation='destination-out'
    ctx.beginPath()
    if(lastPos.current) ctx.moveTo(lastPos.current.x,lastPos.current.y)
    else ctx.moveTo(pos.x,pos.y)
    ctx.lineTo(pos.x,pos.y)
    ctx.lineWidth=52; ctx.lineCap='round'; ctx.stroke()
    lastPos.current=pos
    const d=ctx.getImageData(0,0,c.width,c.height).data
    let t=0; for(let i=3;i<d.length;i+=4) if(d[i]<128)t++
    if(t/totalPx.current>.58) setScratchDone(true)
  }
  const startScratch=e=>{drawing.current=true;lastPos.current=null;doScratch(e)}
  const stopScratch=()=>{drawing.current=false;lastPos.current=null}

  useEffect(()=>{
    const c=canvasRef.current; if(!c) return
    const opts={passive:false}
    c.addEventListener('touchstart',startScratch,opts)
    c.addEventListener('touchmove',doScratch,opts)
    c.addEventListener('touchend',stopScratch,opts)
    return()=>{
      c.removeEventListener('touchstart',startScratch)
      c.removeEventListener('touchmove',doScratch)
      c.removeEventListener('touchend',stopScratch)
    }
  },[])

  return(
    <div className={`invite${visible?' inv-show':''}`}>
      <section className="hero">
        <div className="hero-img-wrap">
          <img src={dayImg} alt="" className={`hero-img${!dark?' active':''}`}/>
          <img src={nightImg} alt="" className={`hero-img night-img${dark?' active':''}`}/>
          <button className="toggle-btn" onClick={()=>setDark(d=>!d)}>{dark?'☀️':'🌙'}</button>
        </div>
        <div className="hero-text reveal">
          <p className="hero-pre">Toy Dəvətnaməsi</p>
          <h1 className="hero-names">
            <span>Nurlan</span>
            <span className="hero-amp">&amp;</span>
            <span>Kəmalə</span>
          </h1>
          <div className="g-divider"><div className="g-diamond"/></div>
          <p className="hero-date">11 İyun 2026 · Cümə Axşamı</p>
          <p className="hero-venue">Planet Şadlıq Sarayı</p>
        </div>
      </section>

      <div className="section reveal">
        <Countdown weddingDate="2026-06-11T17:00:00"/>
      </div>

      <div className="orn reveal">✿ · ✿ · ✿</div>

      <div className="section reveal">
        <p className="sec-lbl">Gəlin &amp; Bəy</p>
        <div className="scratch-wrap">
          <img src={coupleImg} alt="Nurlan & Kəmalə" className="scratch-bg"/>
          <canvas ref={canvasRef} className={`scratch-canvas${scratchDone?' done':''}`}
            onMouseDown={startScratch} onMouseMove={doScratch}
            onMouseUp={stopScratch} onMouseLeave={stopScratch}/>
          {scratchDone&&<div className="scratch-badge">✿ Xoşbəxt Günlər ✿</div>}
        </div>
      </div>

      <div className="orn reveal">✿ · ✿ · ✿</div>

      <div className="section reveal">
        <p className="sec-lbl">Geyim Kodu</p>
        <div className="dc-card">
          <img src={dresscodeImg} alt="Dress Code" className="dc-img"/>
          <div className="dc-info">
            <div className="dc-swatches">
              {['#f5e6d3','#d4b8a0','#e8c4a8','#c9a682','#1a1a1a','#fff'].map(c=>(
                <span key={c} className="dc-sw" style={{background:c}}/>
              ))}
            </div>
            <p className="dc-theme">Garden Elegance</p>
            <p className="dc-desc">
              Yay mövsümünün incəliyi <br/>
              Xanımlar üçün: yaz-yay libası, uzun və ya qısa geyimlər<br/>
              Cənablar üçün: klas kostyum və ya smart-casual
            </p>
          </div>
        </div>
      </div>

      <div className="orn reveal">✿ · ✿ · ✿</div>
      <div className="reveal"><RSVPCard/></div>
      <div className="orn reveal">✿ · ✿ · ✿</div>
      <div className="reveal"><VenueSection venueImg={venueImg}/></div>

      <footer className="footer reveal">
        <div className="g-divider"><div className="g-diamond"/></div>
        <p className="footer-names">Nurlan &amp; Kəmalə</p>
        <p className="footer-date">11 · VI · MMXXVI</p>
        <p className="footer-sub">Sizinlə bu xoşbəxt günü bölüşmək arzusundayıq</p>
        <div className="footer-orn">✿</div>
      </footer>
    </div>
  )
}
