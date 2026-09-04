import { useState } from "react"

function CreateLetter() {
    const [recipientName, setRecipientName] = useState("");
    const [personalMessage, setPersonalMessage] = useState("");
    const [bibleVerse, setBibleVerse] = useState("");
    const [reflection, setReflection] = useState("");
    const [closingMessage, setClosingMessage] = useState("");
    const [createdLetterId, setCreatedLetterId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (event) => {
      
        event.preventDefault();

        setErrorMessage("")
        setSuccessMessage("")

        const letter = {
            recipientName: recipientName,
            personalMessage: personalMessage,
            bibleVerse: bibleVerse,
            reflection: reflection,
            closingMessage: closingMessage
        };

        fetch("http://localhost:5000/api/letters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(letter)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create letter")
            }

            return response.json()
          })
          .then((data) => {
            setCreatedLetterId(data.id)
            setSuccessMessage("Bible Letter created successfully!")

            setRecipientName("")
            setPersonalMessage("")
            setBibleVerse("")
            setReflection("")
            setClosingMessage("")
          })
          .catch((error) => {
            console.error(error)
            setErrorMessage(error.message)
          });
    }

  return (
    <div>
    <h1>Create a Bible Letter</h1>
    {errorMessage && <p>{errorMessage}</p>}
    {successMessage && <p>{successMessage}</p>}
    <p>Recipient: {recipientName}</p>
    <p>Personal Message: {personalMessage}</p>
    <p>Bible Verse: {bibleVerse}</p>
    <p>Created Letter ID: {createdLetterId}</p>
        

      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            />
        </div>

        <div>
          <label>Personal Message</label>
            <textarea
            value={personalMessage}
            onChange={(event) => setPersonalMessage(event.target.value)}
            />
        </div>

        <div>
          <label>Bible Verse</label>
          <input
            type="text"
            value={bibleVerse}
            onChange={(event) => setBibleVerse(event.target.value)}
            />
        </div>

        <div>
          <label>Reflection</label>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
          />
        </div>

        <div>
          <label>Closing Message</label>
          <textarea
            value={closingMessage}
            onChange={(event) => setClosingMessage(event.target.value)}
          />
        </div>

        <button type="submit">Create Letter</button>
      </form>
    </div>
  )
}

export default CreateLetter