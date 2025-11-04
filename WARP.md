# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Schulnoten-Manager is a vanilla JavaScript web application for German students to track, weight, and export their grades. It's a single-page application (SPA) with no build process or dependencies—everything runs directly in the browser.

**Key characteristics:**
- No build tooling or package managers required
- Pure HTML/CSS/JS with ES6 modules
- Single external dependency: jsPDF (loaded via CDN)
- Data persistence via localStorage
- German language throughout (UI, comments, variables)

## Getting Started

Open `index.html` directly in a browser. That's it. No installation, build, or server required.

**For local development with live reload:**
```bash
python -m http.server 8000
# or
npx serve
```

Then navigate to `http://localhost:8000`

## Architecture

The application follows a simple modular architecture with clear separation of concerns:

### Core Modules (src/js/)

**state.js** - Central state management
- Single source of truth for all application data
- Handles localStorage persistence automatically on every mutation
- Exposes pure functions for state modification (addSubject, addWrittenGrade, addOralGrade, setGrading)
- State shape: `{ grading: 'classic'|'points', subjects: [...], goals: [...] }`

**grades.js** - Grade calculation logic
- Converts between German grading systems: 1-6 with +/- modifiers OR 0-15 points (Oberstufe)
- `classicToNumber()`: Converts '1+', '2-', etc. to numeric values
- `pointsToNumber()`: Converts 0-15 point scale to 1.0-6.0 scale
- `averageForSubject()`: Calculates weighted average (written/oral) for a subject

**ui.js** - UI rendering and view management
- Pure rendering functions that read from state (renderSubjects, renderOverview, renderTrends, renderGoals)
- `switchView()` handles tab navigation
- Uses event delegation for dynamic elements
- Simple prompt()-based input (no complex forms yet)

**export.js** - Data export functionality
- Generates JSON, CSV, PDF (via jsPDF), and PNG exports
- PDF and image exports are **actively rendered** (not screenshots)—draws content programmatically using canvas/jsPDF APIs
- All exports trigger direct downloads via blob URLs

**app.js** - Application entry point
- Wires up event listeners for navigation and user actions
- Coordinates between state, UI, and export modules
- Initial render on page load

### Data Flow

1. User action (click button, change setting)
2. Event handler in ui.js or app.js
3. Call state mutation function (state.js)
4. State automatically persists to localStorage
5. Re-render affected UI components

### Styling

Single minified CSS file (`src/css/styles.css`) with:
- CSS custom properties for theming (dark mode by default)
- Mobile-first responsive grid (4→3→2→1 columns)
- No CSS framework or preprocessor

## Common Development Patterns

### Adding a new view/section
1. Add `<section id="view-name" class="view">` in index.html
2. Add tab button with `data-view="name"` attribute
3. Create render function in ui.js
4. Call render function in app.js initial render
5. Add case in switchView() if special logic needed

### Modifying state structure
1. Update state initialization in state.js
2. Add/modify mutation functions
3. Update dependent render functions in ui.js
4. Update export functions if needed (export.js)

### Working with grades
- Always use conversion functions from grades.js—never do numeric conversions inline
- Remember: lower numeric values = better grades (1.0 is best, 6.0 is worst)
- Both grading systems map to 1.0-6.0 internal scale for comparison

## Testing

Currently no automated tests. To verify changes:
1. Open index.html in browser
2. Test each tab/view manually
3. Add subjects, add grades (both written/oral), check calculations
4. Test both grading systems (classic 1-6, points 0-15)
5. Verify exports work (JSON, CSV, PDF, PNG)
6. Check localStorage persistence (refresh page)
7. Test responsive behavior at different screen sizes

## Code Style

- German language for user-facing text, comments, and domain-specific variable names
- Compact, terse code style (minimal whitespace)
- Arrow functions preferred
- Optional chaining and nullish coalescing used throughout
- No semicolons (except where required)
- Template literals for HTML generation

## PWA Configuration

- **manifest.json**: Defines app metadata, icons, theme colors
- **sw.js**: Service Worker for offline functionality and caching
- **IndexedDB**: Persistent storage that survives cache clears
- Installable on iOS/iPadOS, Android, and desktop platforms

## Key Features Implemented

### Data Persistence
- IndexedDB for robust, persistent storage
- Automatic backups with timestamp
- Restore from backup functionality
- Export/Import: JSON, CSV, PDF (jsPDF), PNG (Canvas)

### UI/UX
- iOS 26 Liquid Glass design with frosted glass effects
- Modal dialogs for all data entry (no more prompt())
- Toast notifications for user feedback
- Form validation with error messages
- Responsive design (mobile-first)

### Grade Management
- Add/Edit/Delete subjects with color coding
- Add/Delete grades (written/oral) with type and date
- Real-time average calculation with weighting
- Validation for grade inputs (1-6 with +/-, or 0-15 points)

### Goals System
- Create goals with target grade and deadline
- Visual progress tracking with progress bars
- Mark goals as achieved/not achieved
- Subject-specific goals with current average comparison

### Trends/Charts
- Real historical grade progression charts using Canvas
- Multiple subjects on same chart with color coding
- Grade axis (1-6) with grid lines
- Chronological ordering of all grades

### Internationalization
- German and English language support
- Language switcher in settings (structure ready)
- Translation keys for all UI text

## Future Enhancements

- CSV import (structure ready, needs implementation)
- Language switcher UI in settings
- Backup restoration UI (backend ready)
- Undo/redo functionality
- More chart types (bar, pie)
- Grade statistics (min, max, median)
- Notification system for goal deadlines
