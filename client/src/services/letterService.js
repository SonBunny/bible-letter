const API_URL = import.meta.env.VITE_API_URL

export const createLetter = (letter) => {
  return fetch(`${API_URL}/api/letters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(letter)
  })
    .then(async (response) => {
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to create letter")
        }

        return data
        })
}

export const getLetterById = (id) => {
  return fetch(`${API_URL}/api/letters/${id}`)
    .then(async (response) => {
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to load letter")
        }

        return data
        })
}