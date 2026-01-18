# Inventory Management Web App

This is a lightweight, front-end web application for basic inventory management. It allows users to view, add, edit, delete, filter, and sort inventory items. The application is built with a focus on modern web standards, a clean user interface, and a robust user experience, without relying on any external frameworks.

---

## Setup and Running Locally

This project is built with vanilla HTML, CSS, and JavaScript and has no external dependencies or build steps (no `npm install` or `npm start` is required).

1.  **Clone the repository or download the files.**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory and open the `index.html` file directly in your web browser.**

### Resetting Local Storage

To reset the application's data to its default state, you can clear the stored data from your browser's developer console:

1.  Open the application in your browser.
2.  Open the Developer Tools (F12 or `Ctrl+Shift+I`).
3.  Go to the **Console** tab.
4.  Run the following command:
    ```javascript
    localStorage.removeItem('inventoryApp.inventory');
    ```
5.  Reload the page.

---

## Framework & Stack

The application was built using the "vanilla" web stack, prioritizing simplicity, performance, and zero dependencies.

- **HTML5:** Provides the semantic structure for the application, including the form, controls, table, and modal dialog.
- **CSS3:** Handles all styling and layout. It leverages modern features for a maintainable and professional design:
    - **CSS Custom Properties (Variables):** A full theming system is implemented in the `:root` selector, allowing for easy updates to the color palette, spacing, and shadows. This ensures visual consistency across all components.
    - **Flexbox & Grid:** Used for creating robust, responsive layouts for the main form and control bar.
    - **Transitions & Animations:** Subtle effects are used to provide smooth feedback for user interactions, such as the appearance of the confirmation modal.
- **Vanilla JavaScript (ES6+):** Powers all the application's logic and interactivity. No external frameworks like React, Vue, or Angular were used. All DOM manipulation, event handling, state management, and data persistence are handled with standard browser APIs.
- **Font Awesome:** Integrated via a CDN to provide clear, intuitive icons for actions like adding, editing, and deleting items, enhancing the overall user experience.

---

## Trade-offs & Design Decisions

Several key decisions were made during development to balance simplicity with a high-quality user experience, reflecting modern industry standards.

### 1. Data Persistence

- **Decision:** Use the browser's `localStorage` to persist inventory data.
- **Trade-off:** The initial approach was to use a simple in-memory array, which would reset on every page refresh. I opted for `localStorage` to provide a better user experience by saving the user's data between sessions. This was a suitable compromise given the project constraint of not requiring a real backend. While not a solution for multi-user or production systems, it perfectly fits the scope of this front-end-only application.

### 2. User Experience (UX) & UI Refinements

- **Custom Delete Confirmation Form (Modal):**
    - **Decision:** Replace the native `window.confirm()` browser alert with a proper UI form, implemented as a custom-built modal dialog.
    - **Trade-off:** While this required more complex HTML, CSS, and JavaScript, it was a critical decision to elevate the user experience. The native alert is blocking, cannot be styled, and feels disconnected from the application. The custom modal provides a seamless, non-blocking, and visually cohesive confirmation step that aligns with modern web standards.

- **Layout Shift Prevention:**
    - **Decision:** Proactively address and fix all instances of "layout shift."
    - **Reasoning:** I identified that elements like the "Sort" button and table columns would change size during user interaction, causing a jarring visual shift. By setting a `min-width` on these components, I ensured a stable and predictable layout, which is a hallmark of a professionally built UI.

- **"Cancel" Button in Edit Mode:**
    - **Decision:** Add a "Cancel" button alongside the "Save" button when an item is being edited.
    - **Reasoning:** The initial implementation provided no way to exit edit mode without saving or reloading the page. The "Cancel" button provides a clear and safe exit path, preventing accidental data changes and improving the editing workflow's usability.

- **Icon-Based Actions:**
    - **Decision:** Use icons for in-table actions (Edit, Delete, Save, Cancel) instead of text labels.
    - **Trade-off:** The previous version used text-based buttons ("Edit", "Delete"), which are arguably more explicit for new users. I opted for icons to create a cleaner, more modern UI that saves valuable horizontal space within the table, a common pattern in data-dense applications. The use of `aria-label` attributes ensures the buttons remain fully accessible to screen reader users.

### 3. Code Quality & Robustness

- **Dynamic ID Generation:**
    - **Decision:** Implement a robust function (`Math.max(...ids) + 1`) to generate unique IDs for new items.
    - **Reasoning:** A simple incrementing counter can become unreliable if items are deleted. This method ensures that new IDs will never conflict with existing ones, preventing potential bugs.

- **Inline & Toast-Based Validation:**
    - **Decision:** Replace all `alert()`-based validation with a non-blocking, contextual UI.
    - **Reasoning:** The initial use of `alert()` was disruptive. The "Add Item" form now displays a clear error message directly below the form. For in-table edits, invalid fields receive a red border, and a "toast" notification appears to provide immediate, non-intrusive feedback. This aligns with modern UX best practices.