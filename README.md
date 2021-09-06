# PubMed Browser

## Build

Use pip or pipenv to set up python virtual environment using the supplied Pipfile.

`python ./init-db.py`
`cd frontend`
`npm install`
`npm run build`

## Run

`flask run`

## Things I would add if continuing to develop this:
- PropTypes (or typescript, or both).
- Proper sanitisation of user input.
- Storing search results in session storage (or at least throttling the PubMed api call).
- Likewise, storing reading list in session storage.
- Throttle my reading list endpoint.
- Clean up file structure. Split Flask code between db and views. Add index.js files to component folders.
- Error handling for the reading list api.
