import { useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="home-navbar">

      <button
        className="home-navbar-logo"
        onClick={() => navigate("/")}
      >
        Bible Letter <span>♡</span>
      </button>

      <div className="home-navbar-links">

        <a href="#how-it-works">
          How It Works
        </a>

        <button onClick={() => navigate("/create")}>
          Create a Letter
        </button>

      </div>

    </nav>
  )
}

export default Navbar