import React,{useState,useRef,useEffect} from 'react'
import './EnvelopeScreen.css'

export default function EnvelopeScreen({onOpen}){
  const videoRef=useRef(null)
  const [playing,setPlaying]=useState(false)
  const [loaded,setLoaded]=useState(false)
  const [exiting,setExiting]=useState(false)

  useEffect(()=>{
    const v=videoRef.current; if(!v) return
    v.load()
    const ok=()=>setLoaded(true)
    v.addEventListener('canplaythrough',ok)
    v.addEventListener('loadeddata',ok)
    return()=>{v.removeEventListener('canplaythrough',ok);v.removeEventListener('loadeddata',ok)}
  },[])

  const handleTap=()=>{
    if(exiting||playing) return
    videoRef.current?.play().catch(()=>{})
    setPlaying(true)
  }

  const handleEnded=()=>{
    setExiting(true)
    setTimeout(()=>onOpen(),700)
  }

  return(
    <div className={`env-screen${exiting?' exit':''}`} onClick={handleTap}>
      <video ref={videoRef} src="/video.mp4" playsInline muted preload="auto" webkit-playsinline="true" className="env-video" onEnded={handleEnded}/>
      {!loaded&&<div className="env-spinner-wrap"><div className="env-spinner"/></div>}
      <div className="env-hint">
        <span className="env-orn">✿</span>
        <span>{loaded?(playing?'':'Ekrana Toxunun'):'Yüklənir...'}</span>
        <span className="env-orn">✿</span>
      </div>
    </div>
  )
}
