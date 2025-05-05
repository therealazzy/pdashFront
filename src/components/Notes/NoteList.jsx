import React from 'react';

// Component that displays a list of notes in a card layout
// Each note shows its title and content, with a delete button
export default function NoteList({ notes, onDelete }) {
    return (
        <ul style={{ 
            listStyle: 'none',  // Remove default list dots
            padding: 0, 
            minWidth: '300px'   // Set minimum width for better layout
        }}>
            {/* Map through each note and create a card */}
            {notes.map(note => (
                <li key={note.id} style={{ 
                    marginBottom: '1.5rem',  // Increased gap between notes
                    padding: '1rem',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    backgroundColor: '#242424'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        gap: '1rem'
                    }}>
                        {/* Note content section */}
                        <div>
                            <h3 style={{ 
                                margin: '0 0 0.5rem 0', 
                                color: 'rgba(255, 255, 255, 0.87)',
                                fontSize: '1.1rem'
                            }}>
                                {note.title}
                            </h3>
                            <p style={{ 
                                margin: 0, 
                                color: 'rgba(255, 255, 255, 0.7)',
                                whiteSpace: 'pre-wrap'  // Preserve whitespace and line breaks
                            }}>
                                {note.content}
                            </p>
                        </div>
                        {/* Delete button */}
                        <button 
                            onClick={() => onDelete(note.id)}
                            style={{
                                padding: '0.25rem 0.5rem',
                                backgroundColor: '#535bf2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                flexShrink: 0  // Prevent button from shrinking
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}