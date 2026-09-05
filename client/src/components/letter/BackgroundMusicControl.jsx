import "./BackgroundMusicControl.css"

function BackgroundMusicControl({
  selectedMusic,
  isPlaying,
  onToggle
}) {
  if (!selectedMusic) {
    return null
  }

  return (
    <div className="background-music-control">

      <div className="background-music-info">
        <span className="background-music-icon">
          ♫
        </span>

        <div>
          <p className="background-music-label">
            NOW PLAYING
          </p>

          <p className="background-music-title">
            {selectedMusic.title}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="background-music-toggle"
        onClick={onToggle}
        aria-label={
          isPlaying
            ? "Pause background music"
            : "Play background music"
        }
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

    </div>
  )
}

export default BackgroundMusicControl