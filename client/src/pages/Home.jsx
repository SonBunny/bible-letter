import Navbar from "../components/home/Navbar"
import HeroSection from "../components/home/HeroSection"
import HowItWorks from "../components/home/HowItWorks"
import FinalCTA from "../components/home/FinalCTA"

import "./Home.css"

function Home() {
  return (
    <main className="home-page">

      <Navbar />

      <HeroSection />

      <HowItWorks />

      <FinalCTA />

    </main>
  )
}

export default Home