import React, { useState } from 'react';
import LauncherList from '../components/Launcher/LauncherList';
import AddLauncher from '../components/Launcher/AddLauncher';
import NoteList from '../components/Notes/NoteList';
import AddNote from '../components/Notes/AddNote';

// Main dashboard component that manages the entire application state
export default function Dashboard() {
    // State for managing launchers (applications to launch)
    const [launchItems, setLaunchItems] = useState([
        { id: 1, name: 'VSCode', path: '/Applications/Visual Studio Code.app' },
        { id: 2, name: 'Chrome', path: '/Applications/Google Chrome.app' },
        { id: 3, name: 'Terminal', path: '/System/Applications/Utilities/Terminal.app' }
    ])

    // State for managing notes
    const [notes, setNotes] = useState([
        { id: 1, title: 'Welcome', content: 'This is your first note!' }
    ])

    // Function to handle launching applications
    const handleLaunch = (id) => {
        const item = launchItems.find(item => item.id === id)
        if (item) {
            // In a real application, this would use a system API to launch the app
            console.log(`Launching: ${item.path}`)
        }
    }

    // Function to add a new launcher
    const handleAddLauncher = (name, path) => {
        const newLauncher = {
            id: Date.now(), // Simple way to generate unique IDs
            name,
            path
        }
        setLaunchItems([...launchItems, newLauncher])
    }

    // Function to add a new note
    const handleAddNote = (title, content) => {
        const newNote = {
            id: Date.now(), // Simple way to generate unique IDs
            title,
            content
        }
        setNotes([...notes, newNote])
    }

    // Function to delete a note
    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <div style={{ 
            display: 'flex', 
            gap: '3rem',
            padding: '2rem 4rem',
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
            color: 'rgba(255, 255, 255, 0.87)',
            maxWidth: '1400px',
            margin: '0 auto'
        }}>
            {/* Left section for launchers */}
            <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ margin: 0 }}>Launchers</h2>
                    <AddLauncher onAdd={handleAddLauncher} />
                </div>
                <LauncherList launchItems={launchItems} onLaunch={handleLaunch} />
            </div>

            {/* Right section for notes */}
            <div style={{ 
                flex: 2, 
                minWidth: '500px',
                backgroundColor: '#1e1e1e',  // Slightly darker background
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #2a2a2a'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ margin: 0 }}>Notes</h2>
                    <AddNote onAdd={handleAddNote} />
                </div>
                <NoteList notes={notes} onDelete={handleDeleteNote} />
            </div>
        </div>
    )
}