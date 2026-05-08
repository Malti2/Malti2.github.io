# Poke Message Sender

Simple GitHub Pages site for sending messages to Poke.

## Features
- API key input with local browser storage
- Message textarea
- One-click send button
- Clean static UI suitable for GitHub Pages

## API
The page posts to:

https://poke.com/api/v1/inbound/api-message

with:

- Authorization: Bearer <api-key>
- JSON body: { "message": "..." }
