const BIBLE_API_URL = "https://bible-api.com"


export async function searchScripture(reference) {
  const encodedReference =
    encodeURIComponent(reference.trim())

  const response = await fetch(
    `${BIBLE_API_URL}/${encodedReference}?translation=kjv`
  )


  if (!response.ok) {
    throw new Error(
      "Scripture could not be found."
    )
  }


  const data = await response.json()

  return data
}