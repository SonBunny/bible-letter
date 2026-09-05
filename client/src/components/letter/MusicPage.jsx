import "./MusicPage.css"

const getSpotifyEmbedUrl = (spotifyUrl) => {
  if (!spotifyUrl) {
    return null
  }

  if (spotifyUrl.includes("open.spotify.com/track/")) {
    return spotifyUrl.replace(
      "open.spotify.com/track/",
      "open.spotify.com/embed/track/"
    )
  }

  if (spotifyUrl.includes("open.spotify.com/playlist/")) {
    return spotifyUrl.replace(
      "open.spotify.com/playlist/",
      "open.spotify.com/embed/playlist/"
    )
  }

  return null
}

function MusicPage({ spotifyUrl }) {
  const embedUrl = getSpotifyEmbedUrl(spotifyUrl)

  if (!spotifyUrl) {
    return (
      <div className="music-page">
        <h2>A Quiet Moment</h2>
        <p>No song was added to this Bible Letter.</p>
      </div>
    )
  }

  if (!embedUrl) {
    return (
      <div className="music-page">
        <h2>A Song for You</h2>
        <p>Invalid Spotify link.</p>
      </div>
    )
  }

  return (
    <div className="music-page">
      <h2>A Song for You</h2>

      <iframe
        src={embedUrl}
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      />
    </div>
  )
}

export default MusicPage