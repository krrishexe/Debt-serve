import React from 'react'
import logo from "../Media/download.png"
function Navbar() {
  return (
    <div>
      <header className="flex" style={{background: "linear-gradient(to right, #28147e, #8677b2)",
            padding:" 20px 50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#ffffff",
            boxShadow:" 0 4px 6px rgba(0, 0, 0, 0.15)"}}>
        <img src={logo} alt="DEBT_SERVE Logo" style={{height:"50px"}} />
        <h1 style={{marginRight:"500px",color:"white"}} className="text-4xl ubuntu-regular">Debt Serve Balance Enquiry</h1>
    </header>
    </div>
  )
}

export default Navbar
