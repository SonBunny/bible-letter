import { useState } from "react"

import "./ScriptureSearch.css"

import bibleBooks from "../../data/bibleBooks"
import { searchScripture } from "../../services/bibleService"


function ScriptureSearch({
  bibleVerse,
  setBibleVerse
}) {

  /* ========================================
     SETTINGS
  ======================================== */

  const ITEMS_PER_PAGE = 10


  /* ========================================
     RESTORE SAVED SCRIPTURE
  ======================================== */

  const getSavedScripture = () => {

    if (!bibleVerse) {
      return {
        reference: "",
        text: ""
      }
    }


    const firstLineBreak =
      bibleVerse.indexOf("\n")


    if (firstLineBreak === -1) {
      return {
        reference: bibleVerse,
        text: ""
      }
    }


    return {
      reference:
        bibleVerse
          .slice(0, firstLineBreak)
          .trim(),

      text:
        bibleVerse
          .slice(firstLineBreak + 1)
          .trim()
    }
  }


  const savedScripture =
    getSavedScripture()


  /* ========================================
     RESTORE BOOK / CHAPTER / VERSE
  ======================================== */

  const getSavedSelection = () => {

    if (!savedScripture.reference) {
      return {
        book: null,
        chapter: null,
        verse: null,
        endVerse: null
      }
    }


    const match =
      savedScripture.reference.match(
        /^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/
      )


    if (!match) {
      return {
        book: null,
        chapter: null,
        verse: null,
        endVerse: null
      }
    }


    const bookName = match[1]

    const chapter =
      Number(match[2])

    const verse =
      Number(match[3])

    const endVerse =
      match[4]
        ? Number(match[4])
        : null


    const book =
      bibleBooks.find(
        (item) =>
          item.name.toLowerCase() ===
          bookName.toLowerCase()
      ) || null


    return {
      book,
      chapter,
      verse,
      endVerse
    }
  }


  const savedSelection =
    getSavedSelection()


  /* ========================================
     STATE
  ======================================== */

  const [searchInput, setSearchInput] =
    useState(savedScripture.reference)


  const [selectedBook, setSelectedBook] =
    useState(savedSelection.book)


  const [
    selectedChapter,
    setSelectedChapter
  ] = useState(
    savedSelection.chapter
  )


  const [
    selectedVerse,
    setSelectedVerse
  ] = useState(
    savedSelection.verse
  )


  const [
    selectedEndVerse,
    setSelectedEndVerse
  ] = useState(
    savedSelection.endVerse
  )


  const [
    isRangeMode,
    setIsRangeMode
  ] = useState(
    Boolean(savedSelection.endVerse)
  )


  const [
    scriptureResult,
    setScriptureResult
  ] = useState(
    savedScripture.reference &&
    savedScripture.text
      ? {
          reference:
            savedScripture.reference,

          text:
            savedScripture.text,

          translation_name: ""
        }
      : null
  )


  const [
    isSearching,
    setIsSearching
  ] = useState(false)


  const [
    searchError,
    setSearchError
  ] = useState("")


  /* ========================================
     PAGINATION STATE
  ======================================== */

  const [
    chapterPage,
    setChapterPage
  ] = useState(0)


  const [
    versePage,
    setVersePage
  ] = useState(0)


  const [
    endVersePage,
    setEndVersePage
  ] = useState(0)


  /* ========================================
     SEARCH MODE
  ======================================== */

  const getSearchMode = () => {

    if (!selectedBook) {
      return "book"
    }


    if (!selectedChapter) {
      return "chapter"
    }


    if (!selectedVerse) {
      return "verse"
    }


    if (
      isRangeMode &&
      !selectedEndVerse
    ) {
      return "endVerse"
    }


    return "complete"
  }


  const searchMode =
    getSearchMode()


  /* ========================================
     CURRENT SEARCH TEXT
  ======================================== */

  const getCurrentSearchText = () => {

    if (searchMode === "book") {
      return searchInput
    }


    if (searchMode === "chapter") {

      return searchInput
        .slice(
          selectedBook.name.length
        )
        .trim()
    }


    if (searchMode === "verse") {

      const colonIndex =
        searchInput.lastIndexOf(":")


      if (colonIndex === -1) {
        return ""
      }


      return searchInput
        .slice(colonIndex + 1)
        .trim()
    }


    if (searchMode === "endVerse") {

      const dashIndex =
        searchInput.lastIndexOf("-")


      if (dashIndex === -1) {
        return ""
      }


      return searchInput
        .slice(dashIndex + 1)
        .trim()
    }


    return ""
  }


  const currentSearchText =
    getCurrentSearchText()


  /* ========================================
     BOOK SUGGESTIONS

     Books stay at 5 because this is
     autocomplete, not number pagination.
  ======================================== */

  const bookSuggestions =
    searchMode === "book" &&
    currentSearchText.trim() !== ""
      ? bibleBooks
          .filter((book) =>
            book.name
              .toLowerCase()
              .includes(
                currentSearchText
                  .trim()
                  .toLowerCase()
              )
          )
          .slice(0, 5)
      : []


  /* ========================================
     ALL CHAPTER SUGGESTIONS
  ======================================== */

  const allChapterSuggestions =
    searchMode === "chapter"
      ? Array.from(
          {
            length:
              selectedBook.chapters.length
          },
          (_, index) =>
            index + 1
        )
          .filter((chapter) => {

            if (
              currentSearchText === ""
            ) {
              return true
            }


            return chapter
              .toString()
              .includes(
                currentSearchText
              )
          })
      : []


  /* ========================================
     CHAPTER PAGINATION
  ======================================== */

  const chapterStartIndex =
    chapterPage * ITEMS_PER_PAGE


  const chapterSuggestions =
    allChapterSuggestions.slice(
      chapterStartIndex,
      chapterStartIndex +
        ITEMS_PER_PAGE
    )


  const hasPreviousChapters =
    chapterPage > 0


  const hasMoreChapters =
    chapterStartIndex +
      ITEMS_PER_PAGE <
    allChapterSuggestions.length


  /* ========================================
     ALL VERSE SUGGESTIONS
  ======================================== */

  const allVerseSuggestions =
    searchMode === "verse"
      ? Array.from(
          {
            length:
              selectedBook.chapters[
                selectedChapter - 1
              ]
          },
          (_, index) =>
            index + 1
        )
          .filter((verse) => {

            if (
              currentSearchText === ""
            ) {
              return true
            }


            return verse
              .toString()
              .includes(
                currentSearchText
              )
          })
      : []


  /* ========================================
     VERSE PAGINATION
  ======================================== */

  const verseStartIndex =
    versePage * ITEMS_PER_PAGE


  const verseSuggestions =
    allVerseSuggestions.slice(
      verseStartIndex,
      verseStartIndex +
        ITEMS_PER_PAGE
    )


  const hasPreviousVerses =
    versePage > 0


  const hasMoreVerses =
    verseStartIndex +
      ITEMS_PER_PAGE <
    allVerseSuggestions.length


  /* ========================================
     ALL END VERSE SUGGESTIONS
  ======================================== */

  const allEndVerseSuggestions =
    searchMode === "endVerse"
      ? Array.from(
          {
            length:
              selectedBook.chapters[
                selectedChapter - 1
              ]
          },
          (_, index) =>
            index + 1
        )
          .filter((verse) => {

            /*
              Ending verse must come
              AFTER the starting verse.
            */

            if (
              verse <= selectedVerse
            ) {
              return false
            }


            if (
              currentSearchText === ""
            ) {
              return true
            }


            return verse
              .toString()
              .includes(
                currentSearchText
              )
          })
      : []


  /* ========================================
     END VERSE PAGINATION
  ======================================== */

  const endVerseStartIndex =
    endVersePage * ITEMS_PER_PAGE


  const endVerseSuggestions =
    allEndVerseSuggestions.slice(
      endVerseStartIndex,
      endVerseStartIndex +
        ITEMS_PER_PAGE
    )


  const hasPreviousEndVerses =
    endVersePage > 0


  const hasMoreEndVerses =
    endVerseStartIndex +
      ITEMS_PER_PAGE <
    allEndVerseSuggestions.length


  /* ========================================
     FETCH + SAVE SCRIPTURE
  ======================================== */

  const fetchScripture =
    async (reference) => {

      setIsSearching(true)
      setSearchError("")


      try {

        const data =
          await searchScripture(
            reference
          )


        setScriptureResult(data)


        const scriptureToSave =
          `${data.reference}\n${data.text.trim()}`


        /*
          Save the Scripture in CreateLetter.

          This is the value that eventually
          gets sent to the backend.
        */

        setBibleVerse(
          scriptureToSave
        )

      } catch (error) {

        setSearchError(
          error.message
        )

      } finally {

        setIsSearching(false)

      }
    }


  /* ========================================
     SELECT BOOK
  ======================================== */

  const selectBook = (book) => {

    setSelectedBook(book)

    setSelectedChapter(null)
    setSelectedVerse(null)
    setSelectedEndVerse(null)

    setIsRangeMode(false)


    /*
      Reset pagination because we're
      entering a different book.
    */

    setChapterPage(0)
    setVersePage(0)
    setEndVersePage(0)


    setSearchInput(
      `${book.name} `
    )

    setScriptureResult(null)
    setSearchError("")
  }


  /* ========================================
     SELECT CHAPTER
  ======================================== */

  const selectChapter = (chapter) => {

    setSelectedChapter(chapter)

    setSelectedVerse(null)
    setSelectedEndVerse(null)

    setIsRangeMode(false)


    /*
      We are entering a new chapter,
      so verse pagination starts again.
    */

    setVersePage(0)
    setEndVersePage(0)


    setSearchInput(
      `${selectedBook.name} ${chapter}:`
    )

    setScriptureResult(null)
    setSearchError("")
  }


  /* ========================================
     SELECT VERSE
  ======================================== */

  const selectVerse = (verse) => {

    const reference =
      `${selectedBook.name} ${selectedChapter}:${verse}`


    setSelectedVerse(verse)

    setSelectedEndVerse(null)

    setIsRangeMode(false)

    setEndVersePage(0)

    setSearchInput(reference)

    setScriptureResult(null)
    setSearchError("")


    /*
      Clicking the verse immediately
      fetches + saves Scripture.
    */

    fetchScripture(reference)
  }


  /* ========================================
     SELECT END VERSE
  ======================================== */

  const selectEndVerse = (verse) => {

    const reference =
      `${selectedBook.name} ${selectedChapter}:${selectedVerse}-${verse}`


    setSelectedEndVerse(verse)

    setSearchInput(reference)

    setSearchError("")


    fetchScripture(reference)
  }


  /* ========================================
     HANDLE INPUT CHANGE
  ======================================== */

  const handleInputChange = (event) => {

    const value =
      event.target.value


    setSearchInput(value)

    setSearchError("")


    /* ======================================
       NO BOOK SELECTED
    ====================================== */

    if (!selectedBook) {

      /*
        Search changed, so start from the
        first chapter page when a book is
        eventually selected.
      */

      setChapterPage(0)

      return
    }


    /* ======================================
       BOOK WAS CHANGED
    ====================================== */

    if (
      !value.startsWith(
        selectedBook.name
      )
    ) {

      setSelectedBook(null)

      setSelectedChapter(null)
      setSelectedVerse(null)
      setSelectedEndVerse(null)

      setIsRangeMode(false)

      setChapterPage(0)
      setVersePage(0)
      setEndVersePage(0)

      setScriptureResult(null)

      return
    }


    /* ======================================
       CHAPTER SEARCH CHANGED
    ====================================== */

    if (!selectedChapter) {

      /*
        Example:

        Genesis 1

        If the user changes what they're
        typing, start filtered results from
        the first page.
      */

      setChapterPage(0)

      return
    }


    /* ======================================
       CHAPTER WAS CHANGED
    ====================================== */

    if (selectedChapter) {

      const chapterPrefix =
        `${selectedBook.name} ${selectedChapter}:`


      if (
        selectedVerse &&
        !value.startsWith(
          chapterPrefix
        )
      ) {

        setSelectedChapter(null)

        setSelectedVerse(null)
        setSelectedEndVerse(null)

        setIsRangeMode(false)

        setChapterPage(0)
        setVersePage(0)
        setEndVersePage(0)

        setScriptureResult(null)

        return
      }
    }


    /* ======================================
       WAITING FOR VERSE
    ====================================== */

    if (
      selectedChapter &&
      !selectedVerse
    ) {

      setVersePage(0)

      return
    }


    /* ======================================
       VERSE ALREADY SELECTED
    ====================================== */

    if (selectedVerse) {

      const verseReference =
        `${selectedBook.name} ${selectedChapter}:${selectedVerse}`


      /* ====================================
         USER TYPES "-"

         John 3:16
              ↓
         John 3:16-
      ==================================== */

      if (
        value.startsWith(
          `${verseReference}-`
        )
      ) {

        setIsRangeMode(true)

        setSelectedEndVerse(null)

        setEndVersePage(0)

        return
      }


      /* ====================================
         USER REMOVES "-"
      ==================================== */

      if (
        value === verseReference
      ) {

        setIsRangeMode(false)

        setSelectedEndVerse(null)

        setEndVersePage(0)

        return
      }


      /* ====================================
         USER EDITS VERSE
      ==================================== */

      if (
        !value.startsWith(
          `${verseReference}-`
        ) &&
        value !== verseReference
      ) {

        setSelectedVerse(null)

        setSelectedEndVerse(null)

        setIsRangeMode(false)

        setVersePage(0)
        setEndVersePage(0)

        setScriptureResult(null)

        return
      }
    }
  }


  /* ========================================
     PLACEHOLDER
  ======================================== */

  const getPlaceholder = () => {

    if (
      searchMode === "book"
    ) {
      return "Search for a Bible book..."
    }


    if (
      searchMode === "chapter"
    ) {
      return "Choose a chapter..."
    }


    if (
      searchMode === "verse"
    ) {
      return "Choose a verse..."
    }


    if (
      searchMode === "endVerse"
    ) {
      return "Choose ending verse..."
    }


    return "Scripture selected"
  }


  /* ========================================
     UI
  ======================================== */

  return (
    <div className="scripture-search">

      <label htmlFor="scriptureSearch">
        Search Scripture
      </label>


      <div className="scripture-search-input">

        {/* =================================
            SEARCH INPUT
        ================================= */}

        <input
          id="scriptureSearch"
          type="text"
          value={searchInput}
          placeholder={getPlaceholder()}
          onChange={handleInputChange}
          autoComplete="off"
        />


        {/* =================================
            BOOK SUGGESTIONS
        ================================= */}

        {searchMode === "book" &&
          bookSuggestions.length > 0 && (

          <div className="scripture-suggestions">

            {bookSuggestions.map(
              (book) => (

                <button
                  key={book.name}
                  type="button"
                  onClick={() =>
                    selectBook(book)
                  }
                >
                  {book.name}
                </button>

              )
            )}

          </div>

        )}


        {/* =================================
            CHAPTER SUGGESTIONS
        ================================= */}

        {searchMode === "chapter" &&
          chapterSuggestions.length > 0 && (

          <div className="scripture-suggestions">

            {/* PREVIOUS 10 */}

            {hasPreviousChapters && (

              <button
                type="button"
                className="scripture-more-button"
                aria-label="Show previous chapters"
                onClick={() =>
                  setChapterPage(
                    (previousPage) =>
                      previousPage - 1
                  )
                }
              >
                [...]
              </button>

            )}


            {/* CHAPTER NUMBERS */}

            {chapterSuggestions.map(
              (chapter) => (

                <button
                  key={chapter}
                  type="button"
                  onClick={() =>
                    selectChapter(
                      chapter
                    )
                  }
                >
                  {chapter}
                </button>

              )
            )}


            {/* NEXT 10 */}

            {hasMoreChapters && (

              <button
                type="button"
                className="scripture-more-button"
                aria-label="Show more chapters"
                onClick={() =>
                  setChapterPage(
                    (previousPage) =>
                      previousPage + 1
                  )
                }
              >
                [...]
              </button>

            )}

          </div>

        )}


        {/* =================================
            VERSE SUGGESTIONS
        ================================= */}

        {searchMode === "verse" &&
          verseSuggestions.length > 0 && (

          <div className="scripture-suggestions">

            {/* PREVIOUS 10 */}

            {hasPreviousVerses && (

              <button
                type="button"
                className="scripture-more-button"
                aria-label="Show previous verses"
                onClick={() =>
                  setVersePage(
                    (previousPage) =>
                      previousPage - 1
                  )
                }
              >
                [...]
              </button>

            )}


            {/* VERSE NUMBERS */}

            {verseSuggestions.map(
              (verse) => (

                <button
                  key={verse}
                  type="button"
                  onClick={() =>
                    selectVerse(
                      verse
                    )
                  }
                >
                  {verse}
                </button>

              )
            )}


            {/* NEXT 10 */}

            {hasMoreVerses && (

              <button
                type="button"
                className="scripture-more-button"
                aria-label="Show more verses"
                onClick={() =>
                  setVersePage(
                    (previousPage) =>
                      previousPage + 1
                  )
                }
              >
                [...]
              </button>

            )}

          </div>

        )}


        {/* =================================
            END VERSE SUGGESTIONS
        ================================= */}

        {searchMode === "endVerse" &&
          endVerseSuggestions.length > 0 && (

          <div className="scripture-suggestions">

            {/* PREVIOUS 10 */}

            {hasPreviousEndVerses && (

              <button
                type="button"
                className="scripture-more-button"
                aria-label="Show previous ending verses"
                onClick={() =>
                  setEndVersePage(
                    (previousPage) =>
                      previousPage - 1
                  )
                }
              >
                [...]
              </button>

            )}


            {/* END VERSE NUMBERS */}

            {endVerseSuggestions.map(
              (verse) => (

                <button
                  key={verse}
                  type="button"
                  onClick={() =>
                    selectEndVerse(
                      verse
                    )
                  }
                >
                  {verse}
                </button>

              )
            )}


            {/* NEXT 10 */}

            {hasMoreEndVerses && (

              <button
                type="button"
                className="scripture-more-button"
                aria-label="Show more ending verses"
                onClick={() =>
                  setEndVersePage(
                    (previousPage) =>
                      previousPage + 1
                  )
                }
              >
                [...]
              </button>

            )}

          </div>

        )}

      </div>


      {/* ===================================
          LOADING
      =================================== */}

      {isSearching && (
        <p className="scripture-searching">
          Finding Scripture...
        </p>
      )}


      {/* ===================================
          ERROR
      =================================== */}

      {searchError && (
        <p className="scripture-search-error">
          {searchError}
        </p>
      )}


      {/* ===================================
          SCRIPTURE RESULT
      =================================== */}

      {scriptureResult && (

        <div className="scripture-search-result">

          <p className="scripture-result-reference">
            {scriptureResult.reference}
          </p>


          <p className="scripture-result-text">
            {scriptureResult.text}
          </p>


          {scriptureResult.translation_name && (

            <p className="scripture-result-translation">
              {scriptureResult.translation_name}
            </p>

          )}

        </div>

      )}

    </div>
  )
}


export default ScriptureSearch