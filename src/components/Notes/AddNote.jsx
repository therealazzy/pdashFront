import React, { useState } from 'react';

// Component for adding new notes through a modal form
export default function AddNote({ onAdd }) {
    // State for managing form visibility
    const [showForm, setShowForm] = useState(false);
    // State for managing form input values
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // State for managing error messages
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs
        if (!content.trim()) {
            setError('Please enter note content');
            return;
        }
        // Call parent component's onAdd function with the new note data
        onAdd(title, content);
        // Reset form and hide it
        setTitle('');
        setContent('');
        setShowForm(false);
        setError('');
    };

    return (
        <>
            {/* Button to show the form */}
            <button
                onClick={() => setShowForm(true)}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#535bf2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Add New Note
            </button>

            {/* Modal form overlay */}
            {showForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    {/* Form container */}
                    <div style={{
                        backgroundColor: '#242424',
                        padding: '2rem',
                        borderRadius: '8px',
                        width: '100%',
                        maxWidth: '500px'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Add New Note</h3>
                        {error && <p style={{ color: '#ff4444' }}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Title (optional):
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #3a3a3a',
                                        backgroundColor: '#1a1a1a',
                                        color: 'rgba(255, 255, 255, 0.87)'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Content:
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #3a3a3a',
                                        backgroundColor: '#1a1a1a',
                                        color: 'rgba(255, 255, 255, 0.87)',
                                        minHeight: '100px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#535bf2',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add Note
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setError('');
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#2a2a2a',
                                        color: 'rgba(255, 255, 255, 0.87)',
                                        border: '1px solid #3a3a3a',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
} 