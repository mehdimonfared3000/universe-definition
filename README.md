# Universe Definition Table

A React-based table UI for managing Universe Definitions lists of instruments or services.

## Running the Project

```bash
npm install
npm run dev
```

This starts both the Express API server (port 3001) and the Vite dev server (port 5173) concurrently.

Open [http://localhost:5173](http://localhost:5173) in your browser.

You can also run them individually:

```bash
npm run dev:server   # API server only (port 3001)
npm run dev:client   # Vite dev server only (port 5173)
```

## Tech Stack

- **React 19** + TypeScript
- **Vite 8**
- **Tailwind CSS v4**
- **shadcn/ui-style components**
- **Lucide React**
- **Express**
- **PapaParse**

## API

The backend is a lightweight Express server (`server/index.js`) that persists data to a local JSON file (`server/data.json`). It comes pre-seeded with 25 entries.

### Endpoints

| Method   | Path               | Description                          |
| -------- | ------------------ | ------------------------------------ |
| `GET`    | `/api/entries`     | List entries (paginated, searchable) |
| `GET`    | `/api/entries/:id` | Get a single entry                   |
| `POST`   | `/api/entries`     | Create a new entry                   |
| `DELETE` | `/api/entries/:id` | Delete a single entry                |
| `DELETE` | `/api/entries`     | Bulk delete (body: `{ ids: [...] }`) |

### Query Parameters (GET /api/entries)

| Param      | Default | Description                                                      |
| ---------- | ------- | ---------------------------------------------------------------- |
| `page`     | `1`     | Page number                                                      |
| `pageSize` | `20`    | Items per page (max 100)                                         |
| `q`        | —       | Search term (matches against service, region, submittedBy, date) |

### Response Format

```json
{
  "data": [
    /* array of UniverseEntry objects */
  ],
  "page": 1,
  "pageSize": 20,
  "total": 25,
  "totalPages": 2
}
```

## Technical Choices

The table fetches one page at a time from the backend. The search input in the filter bar debounces (300ms) and triggers a server-side filtered query

State is kept local to the components that need it. As the feature grows I would look to add global state management such as redux toolkit, zustand, and middleware layer for data fetching if needed

Instead of installing the full shadcn/ui CLI, individual components were created following the same patterns ( CVA variants, cn utility)

Folder structure is kept minimal with top level folders being api, components, hooks and libs. THe components folder has a flat flat structure where possibe, once a component grows, it is placed inside its own folder along with any of its specific atom components. And index file is then used to export the main component from that folder helping developers quickly indentify what is exposed.

## What I Would Improve With More Time

- The filter buttons are currently visual-only; would implement actual dropdown menus with filter logic
- Id add arrow key navigation within the table and Shift+Click for range selection
- Add React Testing Library tests for the table selection logic and loading states
- Implement the file upload flow with drag-and-drop
- Replace the JSON file store with a database
- Prettier configuation
- React Router
- Localisation and internationalisation of language and date/times
- Add Zod for runtime data schema validation
- Enviroment variables for configuation of different enviroments
- Implement Storybook for component visulation and snapshot testing
- E2E testing for a small number of key flows such as add and delete
- Better breakdown of components as some a little too big for my liking.
- When the table logic becomes more involved I would look to bring in a third party table library such as tanstack table.
