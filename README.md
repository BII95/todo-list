# To-Do List

## Description

This project is a React application created with Vite. It is a full-stack to-do list application. It features, authentication, sorting,filtering and client-side validation in a dark theme-UI.

## Features

-**Add,edit,complete,update, and delete todos**-The Optmistic UI allows you to add a Todo instance instantly and rolls back if request fails. Editing can be done by clicking on the todo and hitting update.Clicking the checkbox completes the todo. A red button at the end of each todo allows to delete it if desired.
- **Sort and filter** — sort by creation date or title (ascending/descending), filter by status (all/active/completed), and search by title with debounced input to avoid excessive API calls.
- **User authentication** — email/password login with protected routes using useAuth hook; unauthenticated users are redirected to `/login` and returned to their intended page after signing in.
- **Profile dashboard** — displays account info and live todo statistics (total, completed, active, completion percentage) with a visual progress bar.
- **Client-side validation** — required-field checks, maximum length limits, and basic email format validation on all text inputs before data is sent to the API.
- **Safe error handling** — user-facing error messages are generic and non-technical; raw errors are logged to the console for debugging instead of being exposed in the UI.
- **Responsive-in-progress UI** —layouts (About, Profile, 404) adapt to smaller screens.


## Technologies Used

- **React 19** — component architecture, hooks (`useState`, `useEffect`, `useReducer`, `useRef`)
- **React Router 8** — client-side routing, protected routes, and search-param-based filtering
- **Vite 8** — dev server and build tooling
- **CSS Modules** — scoped, component-level styling with a shared design token system (CSS custom properties for color, spacing, and typography)
- **`useReducer` + Context API** — centralized state management for todos and authentication, without an external state library

## Screenshots
-**Login Page**-
![Login page](./assests/Login_page_screenshot.png)
![About page](./assests/About_screenshot.png)
![Todos Page](./assests/Todos_screenshot.png)
![Profile Page](./assests/Profile_screenshot.png)
![Not Found Page](./assests/NF_screenshot.png)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BII95/todo-list
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-list
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal in your web browser (typically):

   ```
   http://localhost:5173
   ```

## Design Decisions

- **Dark, focused theme** — a dark navy blue background keeps the interface calm and puts emphasis on active states (hover, focus, completion) rather than decorative color. The chosen styling reflects a professional straight-forward user interface.

- **Layered typography** — Arial is the base font for body text and default UI elements, defined once globally. On top of that, headings use a serif typeface (Georgia), and small data labels (stats, section eyebrows, feature lists) use a monospace stack to visually separate system-style information from regular content.

- **CSS Modules per component** — each component owns its own scoped stylesheet, avoiding global class name collisions while sharing a common set of CSS custom properties (`--bg-primary`, `--accent`, `--border`, etc.) defined once at the root.


- **Hover-revealed delete** — delete buttons stay visually quiet (invisible until the card is hovered or focused) to avoid cluttering the interface with destructive actions the user isn't actively engaging with, while still remaining keyboard-accessible via `:focus-visible`.

## Future Improvements

- Pagination or infinite scroll for accounts with a large number of todos, rather than a fixed request limit.
- A confirmation step before deleting a todo (e.g. undo toast) to prevent accidental data loss.
- Automated testing (unit tests for reducers/validation, integration tests for key user flows).
-Consolidate the current per-component CSS module files into a theme system for easier styling consistency. (Learn Tailwind)

## Contact
Bryan Iturbide
[GitHub](https://github.com/BII95)
[Email](mailto:bryaniturbide1@gmail.com)


