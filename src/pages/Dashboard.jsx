import React, { useState, useEffect } from 'react';
import LauncherList from '../components/Launcher/LauncherList';
import AddLauncher from '../components/Launcher/AddLauncher';
import NoteList from '../components/Notes/NoteList';
import AddNote from '../components/Notes/AddNote';
import { getLaunchItems, addLaunchItems, launchItemById } from '../services/launcherservice';
import { getNotes, addNote, deleteNote } from '../services/noteservice';

// Main dashboard component that manages the entire application state
export default function Dashboard() {
    // State for managing launchers (applications to launch)
    const [launchItems, setLaunchItems] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                console.log('Fetching initial data...');
                
                // Fetch data sequentially to better handle errors
                try {
                    console.log('Fetching launch items...');
                    const launchItemsData = await getLaunchItems();
                    console.log('Launch items fetched:', launchItemsData);
                    setLaunchItems(launchItemsData);
                } catch (launchError) {
                    console.error('Error fetching launch items:', launchError);
                    setLaunchItems([]); // Set empty array if fetch fails
                }

                try {
                    console.log('Fetching notes...');
                    const notesData = await getNotes();
                    console.log('Notes fetched:', notesData);
                    setNotes(notesData);
                } catch (notesError) {
                    console.error('Error fetching notes:', notesError);
                    setNotes([]); // Set empty array if fetch fails
                }

            } catch (error) {
                console.error('Error in fetchData:', error);
                setError('Failed to load data. Please check if the server is running and try refreshing the page.');
            } finally {
                console.log('Initial data fetch completed');
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to handle launching applications
    const handleLaunch = async (id) => {
        try {
            setError(null);
            await launchItemById(id);
        } catch (error) {
            console.error('Error launching item:', error);
            setError('Failed to launch application. Please try again.');
        }
    }

    // Function to add a new launcher
    const handleAddLauncher = async (name, path) => {
        try {
            setError(null);
            const newLauncher = {
                name,
                path
            };
            await addLaunchItems(newLauncher);
            const updatedItems = await getLaunchItems();
            setLaunchItems(updatedItems);
        } catch (error) {
            console.error('Error adding launcher:', error);
            setError('Failed to add launcher. Please try again.');
        }
    }

    // Function to add a new note
    const handleAddNote = async (title, content) => {
        try {
            setError(null);
            const newNote = {
                title,
                content
            };
            await addNote(newNote);
            const updatedNotes = await getNotes();
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error adding note:', error);
            setError('Failed to add note. Please try again.');
        }
    }

    // Function to delete a note
    const handleDeleteNote = async (id) => {
        try {
            setError(null);
            setIsLoading(true);
            await deleteNote(id);
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
            setError('Failed to delete note. Please try again.');
            // If there's an error, refresh the notes list to ensure consistency
            try {
                const updatedNotes = await getNotes();
                setNotes(updatedNotes);
            } catch (refreshError) {
                console.error('Error refreshing notes after delete:', refreshError);
                setError('Failed to refresh notes. Please try refreshing the page.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#1a1a1a',
                color: 'rgba(255, 255, 255, 0.87)'
            }}>
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#1a1a1a',
                color: 'rgba(255, 255, 255, 0.87)',
                gap: '1rem'
            }}>
                <div style={{ color: '#ff6b6b' }}>{error}</div>
                <button 
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2a2a2a',
                        border: '1px solid #3a3a3a',
                        borderRadius: '4px',
                        color: 'rgba(255, 255, 255, 0.87)',
                        cursor: 'pointer'
                    }}
                >
                    Refresh Page
                </button>
            </div>
        );
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
            margin: '0 auto',
            userSelect: 'none'  // Prevent text selection globally
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
                border: '1px solid #2a2a2a',
                position: 'relative'  // Added for empty state positioning
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
                {notes.length === 0 ? (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'rgba(255, 255, 255, 0.3)',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }}>
                        No notes yet. Add your first note!
                    </div>
                ) : (
                    <NoteList notes={notes} onDelete={handleDeleteNote} />
                )}
            </div>
        </div>
    )
}