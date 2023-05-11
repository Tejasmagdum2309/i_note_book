import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Navbar() {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  const location = useLocation();

  // to know location check again no problem.....

  // useEffect(()=>{
  //   console.log(location)

  // },[location])

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">i-NoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* to get link brite after click on home*/}
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                {/* to get link brite after click on about link*/}
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">about</Link>
              </li>

            </ul>


          </div>
          {!localStorage.getItem("token") ? <form className="d-flex">
            <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form> : <button onClick={handleLogout} className="btn.btn-primary">Logout</button>}

        </div>
      </nav>

    </div>
  )
}
