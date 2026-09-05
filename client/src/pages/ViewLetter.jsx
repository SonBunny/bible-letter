import { useEffect, useRef, useState } from "react"
import {
  useNavigate,
  useParams
} from "react-router-dom"

import backgroundMusic from "../data/backgroundMusic"
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
  const navigate = useNavigate()

  const [letter, setLetter] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const audioRef = useRef(null)


  /* ========================================
     GET LETTER
  ======================================== */

  useEffect(() => {
    getLetterById(id)
      .then((data) => {
        setLetter(data)
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
  }, [id])


  /* ========================================
     ERROR / LOADING
  ======================================== */

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }


  if (!letter) {
    return <p>Loading...</p>
  }


  /* ========================================
     OPTIONAL SPOTIFY STEP
  ======================================== */

  const hasSpotify =
    Boolean(letter.spotifyUrl?.trim())


  const totalSteps =
    hasSpotify
      ? 7
      : 6


  const lastStep =
    totalSteps - 1


  /* ========================================
     FIND SELECTED BACKGROUND MUSIC
  ======================================== */

  const selectedMusic =
    backgroundMusic.find(
      (track) =>
        track.id === letter.backgroundMusicId
    )


  /* ========================================
     BACKGROUND MUSIC FADE IN
  ======================================== */

  const fadeInMusic = (audio) => {
    let volume = 0

    const fadeInterval =
      setInterval(() => {
        volume += 0.05

        if (volume >= 0.35) {
          audio.volume = 0.35

          clearInterval(
            fadeInterval
          )

          return
        }

        audio.volume =
          volume

      }, 150)
  }


  /* ========================================
     ENVELOPE OPEN
  ======================================== */

  const handleEnvelopeOpen = () => {
    const audio =
      audioRef.current


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


  /* ========================================
     PLAY / PAUSE BACKGROUND MUSIC
  ======================================== */

  const toggleBackgroundMusic = () => {
    const audio =
      audioRef.current


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


  /* ========================================
     BASIC NAVIGATION
  ======================================== */

  const goBack = () => {
    if (isTransitioning) {
      return
    }


    setCurrentStep(
      (previousStep) =>
        Math.max(
          previousStep - 1,
          0
        )
    )
  }


  const goNext = () => {
    if (isTransitioning) {
      return
    }


    setCurrentStep(
      (previousStep) =>
        Math.min(
          previousStep + 1,
          lastStep
        )
    )
  }


  /* ========================================
     PERSONAL → SCRIPTURE
  ======================================== */

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


  /* ========================================
     SCRIPTURE → REFLECTION
  ======================================== */

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


  /* ========================================
     READ AGAIN
  ======================================== */

  const handleReadAgain = () => {
    setCurrentStep(0)

    setIsTransitioning(false)


    const audio =
      audioRef.current


    if (audio) {
      audio.pause()

      audio.currentTime = 0

      audio.volume = 0
    }


    setIsMusicPlaying(false)
  }


  /* ========================================
     CREATE OWN LETTER
  ======================================== */

  const handleCreateOwnLetter = () => {
    navigate("/")
  }


  /* ========================================
     STACK CLASS
  ======================================== */

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


  /* ========================================
     RENDER CURRENT STEP
  ======================================== */

  const renderStep = () => {

    /* =====================================
       STEP 0 — ENVELOPE
    ===================================== */

    if (currentStep === 0) {
      return (
        <Envelope
          recipientName={
            letter.recipientName
          }
          onOpen={
            handleEnvelopeOpen
          }
        />
      )
    }


    /* =====================================
       STEPS 1–3
    ===================================== */

    if (
      currentStep >= 1 &&
      currentStep <= 3
    ) {
      return (
        <div
          className={
            `stationery-stage ${getStackClass()}`
          }
        >

          <div className="reflection-stack-layer">

            <ReflectionPage
              reflection={
                letter.reflection
              }
            />

          </div>


          <div className="scripture-stack-layer">

            <ScripturePage
              bibleVerse={
                letter.bibleVerse
              }
            />

          </div>


          <div className="message-stack-layer">

            <PersonalMessage
              message={
                letter.personalMessage
              }
              recipientName={
                letter.recipientName
              }
            />

          </div>

        </div>
      )
    }


    /* =====================================
       STEP 4
    ===================================== */

    if (currentStep === 4) {

      if (hasSpotify) {
        return (
          <div className="stationery-stage">

            <div className="active-card-layer">

              <MusicPage
                spotifyUrl={
                  letter.spotifyUrl
                }
              />

            </div>

          </div>
        )
      }


      return (
        <div className="stationery-stage">

          <div className="active-card-layer">

            <ClosingPage
              closingMessage={
                letter.closingMessage
              }
            />

          </div>

        </div>
      )
    }


    /* =====================================
       STEP 5
    ===================================== */

    if (currentStep === 5) {

      if (hasSpotify) {
        return (
          <div className="stationery-stage">

            <div className="active-card-layer">

              <ClosingPage
                closingMessage={
                  letter.closingMessage
                }
              />

            </div>

          </div>
        )
      }


      return (
        <div className="stationery-stage">

          <div className="active-card-layer">

            <EndingPage
              onReadAgain={
                handleReadAgain
              }
              onCreateLetter={
                handleCreateOwnLetter
              }
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

          <EndingPage
            onReadAgain={
              handleReadAgain
            }
            onCreateLetter={
              handleCreateOwnLetter
            }
          />

        </div>

      </div>
    )
  }


  /* ========================================
     PAGE
  ======================================== */

  return (
    <div className="letter-page">


      {/* ====================================
          BACKGROUND AUDIO
      ==================================== */}

      {selectedMusic && (
        <audio
          ref={audioRef}
          src={selectedMusic.file}
          loop
          preload="auto"
        />
      )}


      {/* ====================================
          MUSIC CONTROL
      ==================================== */}

      {currentStep > 0 && (
        <BackgroundMusicControl
          selectedMusic={
            selectedMusic
          }
          isPlaying={
            isMusicPlaying
          }
          onToggle={
            toggleBackgroundMusic
          }
        />
      )}


      {/* ====================================
          PROGRESS BAR
      ==================================== */}

      <div className="progress-bar">

        <div
          className="progress-bar-fill"
          style={{
            width:
              `${(
                (currentStep + 1) /
                totalSteps
              ) * 100}%`
          }}
        />

      </div>


      {/* ====================================
          CURRENT LETTER SCREEN
      ==================================== */}

      <div className="letter-screen">

        {renderStep()}

      </div>


      {/* ====================================
          STEP INDICATOR
      ==================================== */}

      <p className="step-indicator">

        {currentStep + 1} / {totalSteps}

      </p>


      {/* ====================================
          PERSONAL → SCRIPTURE
      ==================================== */}

      {currentStep === 1 && (
        <div className="letter-navigation">

          <button
            type="button"
            className="letter-back-button"
            onClick={goBack}
            disabled={isTransitioning}
            aria-label="Previous page"
          >
            ←
          </button>


          <button
            type="button"
            className="letter-next-button"
            onClick={goToScripture}
            disabled={isTransitioning}
            aria-label="Next page"
          >
            →
          </button>

        </div>
      )}


      {/* ====================================
          SCRIPTURE → REFLECTION
      ==================================== */}

      {currentStep === 2 && (
        <div className="letter-navigation">

          <button
            type="button"
            className="letter-back-button"
            onClick={goBack}
            disabled={isTransitioning}
            aria-label="Previous page"
          >
            ←
          </button>


          <button
            type="button"
            className="letter-next-button"
            onClick={goToReflection}
            disabled={isTransitioning}
            aria-label="Next page"
          >
            →
          </button>

        </div>
      )}


      {/* ====================================
          REFLECTION ONWARD
      ==================================== */}

      {currentStep >= 3 &&
        currentStep < lastStep && (

        <div className="letter-navigation">

          <button
            type="button"
            className="letter-back-button"
            onClick={goBack}
            disabled={isTransitioning}
            aria-label="Previous page"
          >
            ←
          </button>


          <button
            type="button"
            className="letter-next-button"
            onClick={goNext}
            disabled={isTransitioning}
            aria-label="Next page"
          >
            →
          </button>

        </div>

      )}

    </div>
  )
}


export default ViewLetter