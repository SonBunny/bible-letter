import { useState } from "react"
import { createLetter } from "../services/letterService"
import FormField from "../components/FormField"
import TextAreaField from "../components/TextAreaField"
import ShareLetter from "../components/ShareLetter"




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

    const [spotifyUrl, setSpotifyUrl] = useState("")


    const handleSubmit = (event) => {
      
        event.preventDefault();

        setErrorMessage("")
        setSuccessMessage("")
    
        setIsLoading(true)

        const letter = {
            recipientName: recipientName,
            personalMessage: personalMessage,
            bibleVerse: bibleVerse,
            reflection: reflection,
            closingMessage: closingMessage,
            spotifyUrl: spotifyUrl
        };

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
            setIsLoading(false)
            
          })
          .catch((error) => {
            console.error(error)
            setErrorMessage(error.message)
            setIsLoading(false)
          })
    }

  return (
    <div>
    <h1>Create a Bible Letter</h1>
    {errorMessage && <p>{errorMessage}</p>}
    {successMessage && <p>{successMessage}</p>}

    {createdLetterId && (
      <ShareLetter letterId={createdLetterId} />
    )}
        

      <form onSubmit={handleSubmit}>
        <div>
          
          <FormField
            id="recipientName"
            label="Recipient Name"
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
          />
        </div>

        <div>
          
            <TextAreaField
              id="personalMessage"
              label="Personal Message"
              value={personalMessage}
              onChange={(event) => setPersonalMessage(event.target.value)}
            />
        </div>

        <div>
          
            <FormField
              id="bibleVerse"
              label="Bible Verse"
              value={bibleVerse}
              onChange={(event) => setBibleVerse(event.target.value)}
            />
        </div>

        <FormField
          id="spotifyUrl"
          label="Spotify Song or Playlist Link (Optional)"
          value={spotifyUrl}
          onChange={(event) => setSpotifyUrl(event.target.value)}
        />

        <div>
          
            <TextAreaField
              id="reflection"
              label="Reflection"
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
            />
        </div>

        <div>
          
            <TextAreaField
              id="closingMessage"
              label="Closing Message"
              value={closingMessage}
              onChange={(event) => setClosingMessage(event.target.value)}
            />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Letter"}
        </button>
      </form>
    </div>
  )
}

export default CreateLetter