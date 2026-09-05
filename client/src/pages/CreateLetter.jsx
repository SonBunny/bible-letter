import { useState } from "react"
import { createLetter } from "../services/letterService"
import FormField from "../components/FormField"
import TextAreaField from "../components/TextAreaField"
import ShareLetter from "../components/ShareLetter"
import "./CreateLetter.css"
import MusicStep from "../components/create/MusicStep"
import LetterFormSection from "../components/create/LetterFormSection"




function CreateLetter() {
  const [isLoading, setIsLoading] = useState(false)
    const [recipientName, setRecipientName] = useState("");
    const [personalMessage, setPersonalMessage] = useState("");
    const [bibleVerse, setBibleVerse] = useState("");
    const [reflection, setReflection] = useState("");
    const [closingMessage, setClosingMessage] = useState("");
    const [createdLetterId, setCreatedLetterId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [currentStep, setCurrentStep] = useState(0)
    const [backgroundMusicId, setBackgroundMusicId] = useState("")

    const [spotifyUrl, setSpotifyUrl] = useState("")

    const goNext = () => {
      setCurrentStep((previousStep) =>
        Math.min(previousStep + 1, 4)
      )
    }


    const goBack = () => {
      setCurrentStep((previousStep) =>
        Math.max(previousStep - 1, 0)
      )
    }


    const handleSubmit = (event) => {
      
        event.preventDefault();

        setErrorMessage("")
        setSuccessMessage("")
    
        setIsLoading(true)

        const letter = {
          recipientName,
          personalMessage,
          bibleVerse,
          reflection,
          closingMessage,
          spotifyUrl,
          backgroundMusicId
        }

        createLetter(letter)
          .then((data) => {
            setCreatedLetterId(data._id)
            setSuccessMessage("Bible Letter created successfully!")
            
            

            setRecipientName("")
            setPersonalMessage("")
            setBibleVerse("")
            setReflection("")
            setClosingMessage("")
            setSpotifyUrl("")
            setBackgroundMusicId("")

            setIsLoading(false)
            
            
          })
          .catch((error) => {
            console.error(error)
            setErrorMessage(error.message)
            setIsLoading(false)
          })
    }
    

const renderStep = () => {
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
            setRecipientName(event.target.value)
          }
        />
      </LetterFormSection>
    )
  }

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
            setPersonalMessage(event.target.value)
          }
        />
      </LetterFormSection>
    )
  }

  if (currentStep === 2) {
    return (
      <LetterFormSection
        number="03"
        title="Scripture & Reflection"
        description="Share a verse and what you want the recipient to take from it."
      >
        <FormField
          id="bibleVerse"
          label="Bible Verse"
          value={bibleVerse}
          onChange={(event) =>
            setBibleVerse(event.target.value)
          }
        />

        <TextAreaField
          id="reflection"
          label="Reflection"
          value={reflection}
          onChange={(event) =>
            setReflection(event.target.value)
          }
        />
      </LetterFormSection>
    )
  }

    if (currentStep === 3) {
      return (
        <MusicStep
          backgroundMusicId={backgroundMusicId}
          setBackgroundMusicId={setBackgroundMusicId}
          spotifyUrl={spotifyUrl}
          setSpotifyUrl={setSpotifyUrl}
        />
      )
    }

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
          setClosingMessage(event.target.value)
        }
      />
    </LetterFormSection>
  )
}

return (
  <main className="create-letter-page">

    <div className="create-progress">

      <div className="create-progress-bar">
        <div
          className="create-progress-fill"
          style={{
            width: `${((currentStep + 1) / 5) * 100}%`
          }}
        />
      </div>

      <p>
        {currentStep + 1} / 5
      </p>

    </div>


    {errorMessage && (
      <p className="create-error">
        {errorMessage}
      </p>
    )}


    {successMessage && (
      <p className="create-success">
        {successMessage}
      </p>
    )}


    {createdLetterId ? (

      <ShareLetter
        letterId={createdLetterId}
      />

    ) : (

      <form
        className="create-letter-wizard"
        onSubmit={handleSubmit}
      >

        <div className="create-step-screen">
          {renderStep()}
        </div>


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