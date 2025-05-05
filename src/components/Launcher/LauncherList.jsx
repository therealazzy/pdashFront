import React from 'react';

// Component that displays a list of launcher buttons
// Each button represents an application that can be launched
export default function LauncherList({ launchItems, onLaunch }) {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem' 
        }}>
            {/* Map through each launcher item and create a button */}
            {launchItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onLaunch(item.id)}
                    style={{
                        padding: '0.75rem',
                        backgroundColor: '#2a2a2a',
                        color: 'rgba(255, 255, 255, 0.87)',
                        border: '1px solid #3a3a3a',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.2s',
                        width: '100%'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#3a3a3a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2a2a2a'}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}