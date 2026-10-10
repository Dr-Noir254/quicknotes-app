# QuickNotes

QuickNotes is a lightweight, responsive note-taking web app that helps you capture short thoughts and organise them into Personal, Work, and Study categories. Notes are displayed as readable cards, can be searched instantly, and remain available after refreshing the page because the app saves them in your browser's local storage.

## Features

- Add notes with Personal, Work, or Study categories.
- Validate blank notes and enforce a 200-character limit.
- View each note's category and creation date/time.
- Delete individual notes.
- Search note text without case sensitivity.
- See an accurate count of all saved notes.
- Keep notes between visits with `localStorage`.
- Use a responsive layout on desktop, tablet, and mobile screens.
- Render user-entered note text safely with `textContent`.

## Run locally

1. Download or clone this repository.
2. Keep `index.html`, `style.css`, `script.js`, and `README.md` together in the same folder.
3. Open `index.html` in a modern web browser. No build tools or dependencies are required.
4. Add a note, choose its category, and use the search field to filter your notes.

Notes are stored in the browser's local storage for the current site origin. Clearing browser storage or using a different browser/profile will not carry the notes across.

## What I learned

- How semantic HTML and correctly associated labels improve page structure and accessibility.
- How Flexbox, reusable CSS classes, and media queries create a responsive interface.
- How to manage an array of note objects and update the DOM with `createElement` and `textContent`.
- How to validate form input, filter data, and handle individual delete actions with JavaScript.
- How `JSON.stringify`, `JSON.parse`, and `localStorage` make data persist across page refreshes.
- How small, focused Git commits make project progress easier to understand and review.
