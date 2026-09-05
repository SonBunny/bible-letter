import { useEffect, useRef, useState } from "react"
import backgroundMusic from "../data/backgroundMusic"
import { useParams } from "react-router-dom"

import { getLetterById } from "../services/letterService"

import "./ViewLetter.css"

import Envelope from "../components/letter/Envelope"
import PersonalMessage from "../components/letter/PersonalMessage"
import ScripturePage from "../components/letter/ScripturePage"
import ReflectionPage from "../components/letter/ReflectionPage"
import MusicPage from "../components/letter/MusicPage"
import ClosingPage from "../components/letter/ClosingPage"
import EndingPage from "../components/letter/EndingPage"
import BackgroundMusicControl from "../components/letter/BackgroundMusicControl"


function ViewLetter() {
  const { id } = useParams()

  const [letter, setLetter] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const audioRef = useRef(null)
  


  useEffect(() => {
    getLetterById(id)
      .then((data) => {
        setLetter(data)
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
  }, [id])


  if (errorMessage) {
    return <p>{errorMessage}</p>
  }


  if (!letter) {
    return <p>Loading...</p>
  }

  const selectedMusic = backgroundMusic.find(
  (track) =>
    track.id === letter.backgroundMusicId
)

const fadeInMusic = (audio) => {
  let volume = 0

  const fadeInterval = setInterval(() => {
    volume += 0.05

    if (volume >= 0.35) {
      audio.volume = 0.35

      clearInterval(fadeInterval)

      return
    }

    audio.volume = volume
  }, 150)
}

const handleEnvelopeOpen = () => {
  const audio = audioRef.current

  if (audio) {
    audio.volume = 0

    audio
    .play()
    .then(() => {
      setIsMusicPlaying(true)
    })
    .catch((error) => {
      console.error(
        "Background music could not start:",
        error
      )
  })

    setTimeout(() => {
      fadeInMusic(audio)
    }, 1500)
  }

  goNext()
}

const toggleBackgroundMusic = () => {
  const audio = audioRef.current

  if (!audio) {
    return
  }

  if (audio.paused) {
    audio
      .play()
      .then(() => {
        setIsMusicPlaying(true)
      })
      .catch((error) => {
        console.error(
          "Background music could not play:",
          error
        )
      })

    return
  }

  audio.pause()

  setIsMusicPlaying(false)
}


  const goBack = () => {
    if (isTransitioning) {
      return
    }

    setCurrentStep((previousStep) =>
      Math.max(previousStep - 1, 0)
    )
  }


  const goNext = () => {
    if (isTransitioning) {
      return
    }

    setCurrentStep((previousStep) =>
      Math.min(previousStep + 1, 6)
    )
  }


  const goToScripture = () => {
    if (isTransitioning) {
      return
    }

    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentStep(2)
      setIsTransitioning(false)
    }, 750)
  }


  const goToReflection = () => {
    if (isTransitioning) {
      return
    }

    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentStep(3)
      setIsTransitioning(false)
    }, 750)
  }


  const getStackClass = () => {
    if (
      currentStep === 1 &&
      isTransitioning
    ) {
      return "to-scripture"
    }

    if (
      currentStep === 2 &&
      isTransitioning
    ) {
      return "to-reflection"
    }

    return `stack-step-${currentStep}`
  }


  const renderStep = () => {

    /* =====================================
       STEP 0 — ENVELOPE
    ===================================== */

    if (currentStep === 0) {
      return (
        <Envelope
          recipientName={letter.recipientName}
          onOpen={handleEnvelopeOpen}
        />
      )
    }


    /* =====================================
       STEPS 1–3

       IMPORTANT:
       All three cards stay mounted.

       Reflection and Scripture are already
       physically behind the current card.
    ===================================== */

    if (
      currentStep >= 1 &&
      currentStep <= 3
    ) {
      return (
        <div
          className={`stationery-stage ${getStackClass()}`}
        >

          {/* Reflection — deepest card */}
          <div className="reflection-stack-layer">
            <ReflectionPage
              reflection={letter.reflection}
            />
          </div>


          {/* Scripture — middle card */}
          <div className="scripture-stack-layer">
            <ScripturePage
              bibleVerse={letter.bibleVerse}
            />
          </div>


          {/* Personal Message — front card */}
          <div className="message-stack-layer">
            <PersonalMessage
              message={letter.personalMessage}
              recipientName={letter.recipientName}
            />
          </div>

        </div>
      )
    }


    /* =====================================
       STEP 4 — MUSIC
    ===================================== */

    if (currentStep === 4) {
      return (
        <div className="stationery-stage">
          <div className="active-card-layer">
            <MusicPage
              spotifyUrl={letter.spotifyUrl}
            />
          </div>
        </div>
      )
    }


    /* =====================================
       STEP 5 — CLOSING
    ===================================== */

    if (currentStep === 5) {
      return (
        <div className="stationery-stage">
          <div className="active-card-layer">
            <ClosingPage
              closingMessage={letter.closingMessage}
            />
          </div>
        </div>
      )
    }


    /* =====================================
       STEP 6 — ENDING
    ===================================== */

    return (
      <div className="stationery-stage">
        <div className="active-card-layer">
          <EndingPage />
        </div>
      </div>
    )
  }


  return (
    <div className="letter-page">
      {selectedMusic && (
        <audio
          ref={audioRef}
          src={selectedMusic.file}
          loop
          preload="auto"
        />
      )}
      {currentStep > 0 && (
        <BackgroundMusicControl
          selectedMusic={selectedMusic}
          isPlaying={isMusicPlaying}
          onToggle={toggleBackgroundMusic}
        />
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${((currentStep + 1) / 7) * 100}%`
          }}
        />
      </div>


      <div className="letter-screen">
        {renderStep()}
      </div>


      <p className="step-indicator">
        {currentStep + 1} / 7
      </p>


      {/* PERSONAL → SCRIPTURE */}
      {currentStep === 1 && (
        <div className="letter-navigation">

          <button
            type="button"
            onClick={goBack}
            disabled={isTransitioning}
          >
            Back
          </button>

          <button
            type="button"
            onClick={goToScripture}
            disabled={isTransitioning}
          >
            Next
          </button>

        </div>
      )}


      {/* SCRIPTURE → REFLECTION */}
      {currentStep === 2 && (
        <div className="letter-navigation">

          <button
            type="button"
            onClick={goBack}
            disabled={isTransitioning}
          >
            Back
          </button>

          <button
            type="button"
            onClick={goToReflection}
            disabled={isTransitioning}
          >
            Next
          </button>

        </div>
      )}


      {/* REFLECTION ONWARD */}
      {currentStep >= 3 && currentStep < 6 && (
        <div className="letter-navigation">

          <button
            type="button"
            onClick={goBack}
          >
            Back
          </button>

          <button
            type="button"
            onClick={goNext}
          >
            Next
          </button>

        </div>
      )}

    </div>
  )
}

export default ViewLetter