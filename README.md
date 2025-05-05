# Dashboard Application

A simple React application that allows you to manage launchers and notes in a clean, modern interface.

## Features

- **Launchers**: Quick access to your favorite applications
- **Notes**: Create and manage simple notes with titles and content
- **Dark Theme**: Beautiful dark mode interface
- **Modal Forms**: Clean overlay forms for adding new items

## How It Works

### Project Structure

```
src/
├── App.jsx              # Main application component
├── pages/
│   └── Dashboard.jsx    # Main dashboard page
├── components/
│   ├── Launcher/
│   │   ├── AddLauncher.jsx  # Form for adding new launchers
│   │   └── LauncherList.jsx # List of launcher buttons
│   └── Notes/
│       ├── AddNote.jsx      # Form for adding new notes
│       └── NoteList.jsx     # List of notes with delete functionality
```

### Components Explained

1. **Dashboard.jsx**
   - The main container component
   - Manages state for both launchers and notes
   - Handles all CRUD operations
   - Renders both launcher and note sections

2. **AddLauncher.jsx**
   - Modal form for adding new launchers
   - Validates input before submission
   - Uses a clean overlay design
   - Matches the dark theme

3. **LauncherList.jsx**
   - Displays list of launcher buttons
   - Each button triggers the launch function
   - Clean, full-width button design

4. **AddNote.jsx**
   - Modal form for adding new notes
   - Validates input before submission
   - Supports both title and content
   - Matches the dark theme

5. **NoteList.jsx**
   - Displays notes in a card layout
   - Each note shows title and content
   - Includes delete functionality
   - Responsive design with proper spacing

### State Management

The application uses React's `useState` hook to manage:
- List of launchers
- List of notes
- Form visibility
- Form input values
- Error messages

### Styling

- Uses inline styles for simplicity
- Follows a consistent dark theme
- Responsive design
- Clean, modern look
- Proper spacing and typography

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Adding a Launcher
1. Click "Add New Launcher"
2. Enter the launcher name
3. Enter the path to the application
4. Click "Add Launcher"

### Adding a Note
1. Click "Add New Note"
2. Enter a title (optional)
3. Enter the note content
4. Click "Add Note"

### Managing Notes
- Click the "Delete" button on any note to remove it
- Notes are displayed in a clean card layout
- Content preserves whitespace and formatting

### Using Launchers
- Click any launcher button to trigger the launch function
- Launchers are displayed as full-width buttons
- Clean, minimal design

## Dependencies

- React
- Vite
- React DOM

## Future Improvements

- Add launcher editing functionality
- Add note editing functionality
- Add categories for notes
- Add search functionality
- Add sorting options
- Add drag-and-drop reordering
