import { useEffect, useRef, useState } from "react"

import FormField from "../FormField"
import backgroundMusic from "../../data/backgroundMusic"

import "./MusicStep.css"


function MusicStep({
  backgroundMusicId,
  setBackgroundMusicId,
  spotifyUrl,
  setSpotifyUrl
}) {
  const audioRef = useRef(null)

  const [previewTrackId, setPreviewTrackId] = useState(null)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)


  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setPreviewTrackId(null)
    setIsPreviewPlaying(false)
  }


  const previewMusic = (track) => {

    // If the same track is currently playing,
    // pressing the button pauses it.
    if (
      previewTrackId === track.id &&
      isPreviewPlaying
    ) {
      audioRef.current.pause()

      setIsPreviewPlaying(false)

      return
    }


    // If the same track is paused,
    // continue playing it.
    if (
      previewTrackId === track.id &&
      !isPreviewPlaying &&
      audioRef.current
    ) {
      audioRef.current
        .play()
        .then(() => {
          setIsPreviewPlaying(true)
        })
        .catch((error) => {
          console.error(
            "Unable to play music preview:",
            error
          )
        })

      return
    }


    // Stop the previous preview before
    // starting another track.
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }


    const audio = new Audio(track.file)

    audio.volume = 0.6

    audioRef.current = audio

    setPreviewTrackId(track.id)


    audio
      .play()
      .then(() => {
        setIsPreviewPlaying(true)
      })
      .catch((error) => {
        console.error(
          "Unable to play music preview:",
          error
        )

        setPreviewTrackId(null)
        setIsPreviewPlaying(false)
      })


    audio.addEventListener(
      "ended",
      () => {
        setPreviewTrackId(null)
        setIsPreviewPlaying(false)
      },
      { once: true }
    )
  }


  const selectMusic = (trackId) => {
    setBackgroundMusicId(trackId)
  }


  const chooseNoMusic = () => {
    setBackgroundMusicId("")

    stopPreview()
  }


  /*
    If the user leaves the Music Step while
    preview music is playing, stop it.
  */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])


  return (
    <section className="music-step">

      <div className="music-step-paper">

        <p className="music-step-kicker">
          STEP 04
        </p>


        <div className="music-step-symbols">
          <span>♫</span>
          <span>♡</span>
        </div>


        <h2>
          Choose the music
        </h2>


        <p className="music-step-description">
          Pick background music to play while
          they read the letter. You can also
          add a Spotify song or playlist to share.
        </p>


        {/* =================================
            BACKGROUND MUSIC
        ================================= */}

        <div className="background-music-section">

          <div className="music-section-heading">

            <p>
              BACKGROUND MUSIC
            </p>

            <span>
              Select one track for the reading experience.
            </span>

          </div>


          {/* Scrollable area */}

          <div className="music-list">

            {backgroundMusic.map((track) => {

              const isSelected =
                backgroundMusicId === track.id

              const isThisPreview =
                previewTrackId === track.id

              const isPlaying =
                isThisPreview && isPreviewPlaying


              return (
                <div
                  key={track.id}
                  className={`music-option ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                >

                  <div className="music-option-info">

                    <div className="music-option-icon">
                      ♫
                    </div>


                    <div>

                      <h3>
                        {track.title}
                      </h3>

                      <p>
                        {track.mood}
                      </p>

                    </div>

                  </div>


                  <div className="music-option-actions">

                    <button
                      type="button"
                      className="preview-button"
                      onClick={() =>
                        previewMusic(track)
                      }
                    >
                      {isPlaying
                        ? "Pause"
                        : isThisPreview
                          ? "Play"
                          : "Preview"}
                    </button>


                    <button
                      type="button"
                      className="select-button"
                      onClick={() =>
                        selectMusic(track.id)
                      }
                    >
                      {isSelected
                        ? "✓ Selected"
                        : "Select"}
                    </button>

                  </div>

                </div>
              )
            })}

          </div>

        </div>


        {/* =================================
            NO BACKGROUND MUSIC
        ================================= */}

        <div className="music-none">

          <label>

            <input
              type="radio"
              name="backgroundMusic"
              checked={backgroundMusicId === ""}
              onChange={chooseNoMusic}
            />

            <span>
              No background music
            </span>

          </label>

        </div>


        {/* =================================
            SPOTIFY
        ================================= */}

        <div className="spotify-section">

          <div className="spotify-heading">

            <p className="spotify-section-label">
              OPTIONAL SONG DEDICATION
            </p>

            <span>
              Share a Spotify song or playlist
              separately from the background music.
            </span>

          </div>


          <FormField
            id="spotifyUrl"
            label="Spotify Song or Playlist Link"
            value={spotifyUrl}
            onChange={(event) =>
              setSpotifyUrl(event.target.value)
            }
          />

        </div>

      </div>

    </section>
  )
}

export default MusicStep