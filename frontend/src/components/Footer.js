import React from 'react'

export default function Footer() {
  let d = new Date();
  let year = d.getFullYear();

  return (
    <div className='text-center mt-4 ' style={{
      backgroundcolor: "black",
      color : "white",
      padding : "1%",
      position : "absolute",
      left : "0",
      bottom: "0",
      right: "0",
      fontsize: "25px",}}>
       <p>Its {year}</p>
    </div>
  )
}
