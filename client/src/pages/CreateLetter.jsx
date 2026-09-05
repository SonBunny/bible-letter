import { useState } from "react"

import { createLetter } from "../services/letterService"

import FormField from "../components/FormField"
import TextAreaField from "../components/TextAreaField"
import ShareLetter from "../components/ShareLetter"

import MusicStep from "../components/create/MusicStep"
import LetterFormSection from "../components/create/LetterFormSection"
import ScriptureSearch from "../components/create/ScriptureSearch"

import "./CreateLetter.css"


function CreateLetter() {

  /* ========================================
     FORM STATE
  ======================================== */

  const [isLoading, setIsLoading] =
    useState(false)

  const [recipientName, setRecipientName] =
    useState("")

  const [personalMessage, setPersonalMessage] =
    useState("")

  const [bibleVerse, setBibleVerse] =
    useState("")

  const [reflection, setReflection] =
    useState("")

  const [closingMessage, setClosingMessage] =
    useState("")

  const [backgroundMusicId, setBackgroundMusicId] =
    useState("")

  const [spotifyUrl, setSpotifyUrl] =
    useState("")


  /* ========================================
     CREATED LETTER
  ======================================== */

  const [createdLetterId, setCreatedLetterId] =
    useState("")


  /* ========================================
     MESSAGES
  ======================================== */

  const [errorMessage, setErrorMessage] =
    useState("")

  const [successMessage, setSuccessMessage] =
    useState("")


  /* ========================================
     WIZARD
  ======================================== */

  const [currentStep, setCurrentStep] =
    useState(0)


  /*
    forward:
    new card enters from the right

    backward:
    new card enters from the left
  */

  const [
    transitionDirection,
    setTransitionDirection
  ] = useState("forward")


  /*
    Changing this key causes the
    transition wrapper to animate again.
  */

  const [
    transitionKey,
    setTransitionKey
  ] = useState(0)


  /* ========================================
     NEXT
  ======================================== */

  const goNext = () => {

    setErrorMessage("")


    /* ======================================
       STEP 01 VALIDATION
    ====================================== */

    if (
      currentStep === 0 &&
      !recipientName.trim()
    ) {

      setErrorMessage(
        "Please enter the recipient's name."
      )

      return
    }


    /* ======================================
       STEP 02 VALIDATION
    ====================================== */

    if (
      currentStep === 1 &&
      !personalMessage.trim()
    ) {

      setErrorMessage(
        "Please write a personal message."
      )

      return
    }


    /* ======================================
       STEP 03 VALIDATION

       This is important.

       If bibleVerse is empty here,
       ScriptureSearch did NOT save the
       selected Scripture into CreateLetter.
    ====================================== */

    if (
      currentStep === 2 &&
      !bibleVerse.trim()
    ) {

      setErrorMessage(
        "Please select a Scripture first."
      )

      return
    }


    if (
      currentStep === 2 &&
      !reflection.trim()
    ) {

      setErrorMessage(
        "Please write your reflection."
      )

      return
    }


    /* ======================================
       CONTINUE
    ====================================== */

    setTransitionDirection(
      "forward"
    )


    setCurrentStep(
      (previousStep) =>
        Math.min(
          previousStep + 1,
          4
        )
    )


    setTransitionKey(
      (previousKey) =>
        previousKey + 1
    )
  }


  /* ========================================
     BACK
  ======================================== */

  const goBack = () => {

    setErrorMessage("")


    setTransitionDirection(
      "backward"
    )


    setCurrentStep(
      (previousStep) =>
        Math.max(
          previousStep - 1,
          0
        )
    )


    setTransitionKey(
      (previousKey) =>
        previousKey + 1
    )
  }


  /* ========================================
     SUBMIT LETTER
  ======================================== */

  const handleSubmit =
    async (event) => {

      event.preventDefault()

      setErrorMessage("")
      setSuccessMessage("")


      /* ====================================
         FINAL VALIDATION
      ==================================== */

      if (!recipientName.trim()) {
        setErrorMessage(
          "Recipient name is required."
        )

        return
      }


      if (!personalMessage.trim()) {
        setErrorMessage(
          "Personal message is required."
        )

        return
      }


      if (!bibleVerse.trim()) {
        setErrorMessage(
          "Scripture is required."
        )

        return
      }


      if (!reflection.trim()) {
        setErrorMessage(
          "Reflection is required."
        )

        return
      }


      if (!closingMessage.trim()) {
        setErrorMessage(
          "Closing message is required."
        )

        return
      }


      setIsLoading(true)


      /* ====================================
         LETTER SENT TO BACKEND
      ==================================== */

      const letter = {

        recipientName:
          recipientName.trim(),

        personalMessage:
          personalMessage.trim(),

        /*
          Example value:

          John 3:16
          For God so loved the world...
        */

        bibleVerse,

        reflection:
          reflection.trim(),

        closingMessage:
          closingMessage.trim(),

        spotifyUrl:
          spotifyUrl.trim(),

        backgroundMusicId
      }


      try {

        const data =
          await createLetter(letter)


        setCreatedLetterId(
          data._id
        )


        setSuccessMessage(
          "Bible Letter created successfully!"
        )


        /* ==================================
           RESET FORM
        ================================== */

        setRecipientName("")

        setPersonalMessage("")

        setBibleVerse("")

        setReflection("")

        setClosingMessage("")

        setSpotifyUrl("")

        setBackgroundMusicId("")


      } catch (error) {

        console.error(error)

        setErrorMessage(
          error.message
        )

      } finally {

        setIsLoading(false)

      }
    }


  /* ========================================
     RENDER STEP
  ======================================== */

  const renderStep = () => {

    /* ======================================
       STEP 01
       RECIPIENT
    ====================================== */

    if (currentStep === 0) {

      return (
        <LetterFormSection
          number="01"
          title="Who is this letter for?"
          description="Start by telling us who will receive your Bible Letter."
        >

          <FormField
            id="recipientName"
            label="Recipient Name"
            value={recipientName}
            onChange={(event) =>
              setRecipientName(
                event.target.value
              )
            }
          />

        </LetterFormSection>
      )
    }


    /* ======================================
       STEP 02
       PERSONAL MESSAGE
    ====================================== */

    if (currentStep === 1) {

      return (
        <LetterFormSection
          number="02"
          title="Your Message"
          description="Write what you want to say to them."
        >

          <TextAreaField
            id="personalMessage"
            label="Personal Message"
            value={personalMessage}
            onChange={(event) =>
              setPersonalMessage(
                event.target.value
              )
            }
          />

        </LetterFormSection>
      )
    }


    /* ======================================
       STEP 03
       SCRIPTURE + REFLECTION
    ====================================== */

    if (currentStep === 2) {

      return (
        <LetterFormSection
          number="03"
          title="Scripture & Reflection"
          description="Share a verse and what you want the recipient to take from it."
          className="scripture-reflection-section"
        >

          <ScriptureSearch
            bibleVerse={bibleVerse}
            setBibleVerse={
              setBibleVerse
            }
          />


          <div className="reflection-input-area">

            <TextAreaField
              id="reflection"
              label="Reflection"
              value={reflection}
              onChange={(event) =>
                setReflection(
                  event.target.value
                )
              }
            />

          </div>

        </LetterFormSection>
      )
    }


    /* ======================================
       STEP 04
       MUSIC
    ====================================== */

    if (currentStep === 3) {

      return (
        <MusicStep
          backgroundMusicId={
            backgroundMusicId
          }
          setBackgroundMusicId={
            setBackgroundMusicId
          }
          spotifyUrl={
            spotifyUrl
          }
          setSpotifyUrl={
            setSpotifyUrl
          }
        />
      )
    }


    /* ======================================
       STEP 05
       CLOSING
    ====================================== */

    return (
      <LetterFormSection
        number="05"
        title="Closing Message"
        description="Finish the letter with one final message."
      >

        <TextAreaField
          id="closingMessage"
          label="Closing Message"
          value={closingMessage}
          onChange={(event) =>
            setClosingMessage(
              event.target.value
            )
          }
        />

      </LetterFormSection>
    )
  }


  /* ========================================
     PAGE
  ======================================== */

  return (
    <main className="create-letter-page">

      {/* ===================================
          PROGRESS
      =================================== */}

      <div className="create-progress">

        <div className="create-progress-bar">

          <div
            className="create-progress-fill"
            style={{
              width:
                `${
                  (
                    (currentStep + 1) /
                    5
                  ) * 100
                }%`
            }}
          />

        </div>


        <p>
          {currentStep + 1} / 5
        </p>

      </div>


      {/* ===================================
          ERROR
      =================================== */}

      {errorMessage && (
        <p className="create-error">
          {errorMessage}
        </p>
      )}


      {/* ===================================
          SUCCESS
      =================================== */}

      {successMessage && (
        <p className="create-success">
          {successMessage}
        </p>
      )}


      {/* ===================================
          CREATED / FORM
      =================================== */}

      {createdLetterId ? (

        <ShareLetter
          letterId={
            createdLetterId
          }
        />

      ) : (

        <form
          className="create-letter-wizard"
          onSubmit={handleSubmit}
        >

          {/* ===============================
              CURRENT STEP
          =============================== */}

          <div className="create-step-screen">

            <div
              key={transitionKey}
              className={`
                create-step-transition
                ${
                  transitionDirection ===
                  "forward"
                    ? "create-step-forward"
                    : "create-step-backward"
                }
              `}
            >

              {renderStep()}

            </div>

          </div>


          {/* ===============================
              NAVIGATION
          =============================== */}

          <div className="create-navigation">

            {currentStep > 0 && (

              <button
                type="button"
                onClick={goBack}
              >
                ← Back
              </button>

            )}


            {currentStep < 4 && (

              <button
                type="button"
                onClick={goNext}
              >
                Next →
              </button>

            )}


            {currentStep === 4 && (

              <button
                type="submit"
                disabled={isLoading}
              >

                {isLoading
                  ? "Creating..."
                  : "Create Letter"}

              </button>

            )}

          </div>

        </form>

      )}

    </main>
  )
}


export default CreateLetter