import React from 'react'
import './VenueSection.css'
export default function VenueSection({venueImg}){
  return(
    <section className="vs-sec">
      <p className="vs-head">Mərasim Yeri</p>
      <div className="vs-img-wrap">
        <img src={venueImg} alt="Planet Şadlıq Sarayı" className="vs-img"/>
        <div className="vs-fade"/>
      </div>
      <div className="vs-info">
        <p className="vs-name">Planet Şadlıq Sarayı</p>
        <p className="vs-addr">✿ Bakı şəhəri</p>
        <div className="vs-btns">
          <a href="https://maps.google.com/?q=Planet+Şadlıq+Sarayı+Bakı" target="_blank" rel="noopener noreferrer" className="vbtn primary">🗺 Google Maps</a>
          <a href="https://waze.com/ul?q=Planet+Bakı" target="_blank" rel="noopener noreferrer" className="vbtn outline">🧭 Waze</a>
          <a href="https://bolt.eu/" target="_blank" rel="noopener noreferrer" className="vbtn gold">⚡ Bolt</a>
          <a href="https://taxi.yango.com/" target="_blank" rel="noopener noreferrer" className="vbtn outline">🚖 Yango</a>
        </div>
      </div>
    </section>
  )
}
