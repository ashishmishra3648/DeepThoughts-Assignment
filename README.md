# DeepThought Frontend Optimization Internship Task

## 🚀 Project Overview
This project is a submission for the DeepThought Frontend Developer Internship (Task 1). The objective was to transform a static JSON data structure into a fully responsive, interactive, and aesthetically pleasing dashboard web application. 

The application closely mimics a "Technical Project Management" tool where users can navigate through different tasks (assets) involved in a project.

## 🌟 Features Implemented

### 1. Dynamic Content Rendering
- **JSON-Driven UI:** The entire content of the page—including the project title, description, task lists, and specific assets—is dynamically rendered from a local `data.json` file. This ensures the application is scalable and data-agnostic.

### 2. Interactive Sidebars
- **Journey Board (Left Sidebar):** 
  - A collapsible sidebar that lists the project's tasks.
  - **Functionality:** Clicking the arrow button collapses the menu into a compact view and expands it back, shifting the main content area smoothly to prevent overlap. Toggle state persists visually.
- **Notice Board (Right Sidebar):** 
  - A sliding overlay for notifications.
  - **Functionality:** Can be toggled by clicking the vertical "Notice Board" strip. Includes a distinct "close" button and smooth slide-in/slide-out animations.

### 3. Smart Asset Cards
Different types of assets are rendered with specific components:
- **Video Asset:** Embeds YouTube videos responsively.
- **ThreadBuilder:** A custom, interactive component allowing users to add multiple "Sub-threads" and "Sub-interpretations" dynamically. Features collapsible headers for cleaner UI.
- **Article/Text:** Displays distinct content areas with a mock rich-text editor toolbar.

### 4. Polish & UX Enhancements
- **Toast Notifications:** A "Submit Task" button triggers a custom toast notification with a fade-out animation.
- **Animations:** Elements fade in upon loading (`fadeInUp`) for a premium feel.
- **Tooltips:** Hovering over icons provides helpful context (e.g., "Collapse Sidebar", "Help").
- **Responsive Design:** The layout adapts gracefully to different screen sizes, stacking grids on mobile devices.

## 🛠️ Technical Implementation
- **HTML5:** Semantic structure for better accessibility.
- **CSS3:** Custom variables for color themes (DeepThought Blue), Flexbox/Grid for layout, and CSS Transitions/Keyframes for animations. No external CSS frameworks were used, ensuring a lightweight and custom build.
- **JavaScript (Vanilla):** 
  - Used `fetch` API to load JSON data.
  - DOM manipulation for dynamic element creation.
  - Event listeners for all interactive toggles and dynamic inputs.

## 📂 Project Structure
```
/root
├── index.html        # Main entry point
├── style.css         # All styles and animations
├── script.js         # Logic for data fetching and UI interaction
├── README.md         # Project documentation
└── assets/
    └── data.json     # The source data file
```

## 🚀 How to Run
1. Clone the repository.
2. Open `index.html` in your browser.
   - *Note:* Due to CORS policies on some browsers, it is recommended to run a simple local server (e.g., `python -m http.server`) to fetch the JSON file correctly.
