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
