import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getLetterById } from "../services/letterService"
import LetterSection from "../components/LetterSection"
import "./ViewLetter.css"
import LetterCover from "../components/letter/LetterCover"
import PersonalMessage from "../components/letter/PersonalMessage"
import ScripturePage from "../components/letter/ScripturePage"
import ReflectionPage from "../components/letter/ReflectionPage"
import ClosingPage from "../components/letter/ClosingPage"
import EndingPage from "../components/letter/EndingPage"
import MusicPage from "../components/letter/MusicPage"
import Envelope from "../components/letter/Envelope"


function ViewLetter() {
    const { id } = useParams()
    const [letter, setLetter] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [currentStep, setCurrentStep] = useState(0)

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


    const goNext = () => {
        setCurrentStep((previousStep) =>
            Math.min(previousStep + 1, 6)
        )
    }

    const goBack = () => {
        setCurrentStep((previousStep) =>
            Math.max(previousStep - 1, 0)
        )
    }

    const renderStep = () => {
        if (currentStep === 0) {
        return (
            <Envelope
            recipientName={letter.recipientName}
            onOpen={goNext}
            />
        )
        }

        if (currentStep === 1) {
        return (
            <PersonalMessage
            message={letter.personalMessage}
            />
        )
        }

        if (currentStep === 2) {
            return (
                <ScripturePage
                bibleVerse={letter.bibleVerse}
                />
            )
        }

        if (currentStep === 3) {
            return (
                <ReflectionPage
                reflection={letter.reflection}
                />
            )
        }

        if (currentStep === 4) {
            return (
                <MusicPage
                spotifyUrl={letter.spotifyUrl}
                />
            )
        }

        if (currentStep === 5) {
            return (
                <ClosingPage
                closingMessage={letter.closingMessage}
                />
            )
        }

        return <EndingPage />

        }
            


        return (

            
            <div className="letter-page">

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

                <div className="letter-navigation">

                    {currentStep > 0 && currentStep < 6 && (
                    <div className="letter-navigation">
                        <button onClick={goBack}>
                        Back
                        </button>

                        <button onClick={goNext}>
                        Next
                        </button>
                    </div>
                    )}
                </div>
            </div>
)
    


}

export default ViewLetter