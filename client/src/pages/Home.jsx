import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Bible Letter Gift</h1>
      <p>Create a meaningful Bible letter for someone.</p>

      <button onClick={() => navigate("/create")}>
        Create a Letter
      </button>
    </div>
  )
}

export default Home