# Rickverse — Backend

REST API built with Node.js and Express that serves as the backend for the Rickverse application. It proxies character data from the public [Rick and Morty API](https://rickandmortyapi.com/), handles authentication, and manages a per-session favorites list.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 16+ | Runtime |
| Express | 4 | HTTP server & routing |
| Axios | 1 | Proxy requests to the Rick and Morty API |
| Morgan | 1 | HTTP request logger |
| Jest + Supertest | — | Integration testing |
| Nodemon | 2 | Dev auto-restart |

---

## Project Structure

```
src/
├── index.js                  # Entry point — starts the server on the configured port
├── app.js                    # Express app setup: CORS headers, middleware, router mount
├── routes/
│   └── index.js              # All route definitions
├── controllers/
│   ├── getCharById.js        # Fetches and shapes a single character from the public API
│   ├── login.js              # Validates credentials against the local user list
│   └── handleFavorites.js    # In-memory favorites: add and remove
└── utils/
    └── users.js              # Registered user list (email + password)

test/
└── index.test.js             # Integration tests with Jest + Supertest
```

---

## Installation & Setup

**Prerequisites:** Node.js 16+.

```bash
# 1. Install dependencies
cd Server
npm install

# 2. Start the server (port 3001 by default)
npm start

# Development mode with auto-restart
npx nodemon src/index.js
```

The port can be overridden with the `PORT` environment variable:

```bash
PORT=4000 npm start
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Starts the server with `node` on port 3001 |
| `npm test` | Runs the integration test suite with Jest |

---

## API Reference

Base path: `/rickandmorty`

---

### GET `/rickandmorty/character/:id`

Fetches a character from the Rick and Morty API and returns a shaped object.

**Parameters**

| Name | In | Type | Description |
|---|---|---|---|
| `id` | path | number | Rick and Morty character ID |

**Responses**

| Status | Body | Description |
|---|---|---|
| 200 | Character object | Character found |
| 404 | Error message | ID not found in external API |
| 500 | Error message | Unexpected server / network error |

**Example response (200)**

```json
{
  "id": "1",
  "name": "Rick Sanchez",
  "species": "Human",
  "origin": { "name": "Earth (C-137)" },
  "gender": "Male",
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "status": "Alive",
  "location": { "name": "Citadel of Ricks" },
  "type": "",
  "episode": ["https://rickandmortyapi.com/api/episode/1", "..."]
}
```

---

### GET `/rickandmorty/login`

Validates a user's credentials.

**Query Parameters**

| Name | Type | Description |
|---|---|---|
| `email` | string | User email |
| `password` | string | User password |

**Responses**

| Status | Body | Description |
|---|---|---|
| 200 | `{ "access": true }` | Credentials are valid |
| 404 | `{ "access": false }` | Credentials not found |

**Example**

```
GET /rickandmorty/login?email=Thiagozambonini24@gmail.com&password=Thiago123
```

---

### POST `/rickandmorty/fav`

Adds a character to the in-memory favorites list. Rejects duplicates.

**Request body** (JSON)

```json
{
  "id": "1",
  "name": "Rick Sanchez",
  "image": "https://...",
  "species": "Human",
  "gender": "Male",
  "status": "Alive",
  "origin": { "name": "Earth (C-137)" }
}
```

**Responses**

| Status | Body | Description |
|---|---|---|
| 200 | Array of favorites | Character added, returns full list |
| 404 | Error message | Character already exists in favorites |

---

### DELETE `/rickandmorty/fav/:id`

Removes a character from the in-memory favorites list.

**Parameters**

| Name | In | Type | Description |
|---|---|---|---|
| `id` | path | string | Character ID to remove |

**Responses**

| Status | Body | Description |
|---|---|---|
| 200 | Array of favorites | Character removed, returns updated list |

> **Note:** The favorites list is stored in memory and resets when the server restarts.

---

## Testing

Tests are located in `test/index.test.js` and use Jest with Supertest.

```bash
npm test
```

Covered scenarios:

- `GET /rickandmorty/character/:id` — returns 200 with the expected properties for a valid ID; returns 500 for a malformed ID.
- `GET /rickandmorty/login` — returns `{ access: true }` for valid credentials; returns `{ access: false }` for invalid credentials.
- `POST /rickandmorty/fav` — returns 200 and the updated favorites array.
- `DELETE /rickandmorty/fav/:id` — returns 200 and the updated favorites array.

---

## Credentials (demo)

```
Email:    Thiagozambonini24@gmail.com
Password: Thiago123
```

---

## Links

- [Rick and Morty API](https://rickandmortyapi.com/)
- [LinkedIn — Thiago Zambonini](https://www.linkedin.com/in/thiago-zambonini-2a279a239/)
