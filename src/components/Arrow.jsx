/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function Arrow({ start, end }) {
    const x1 = start.x + 100; // Adjust according to card width
    const y1 = start.y + 50;  // Adjust according to card height
    const x2 = end.x + 100;   // Adjust according to card width
    const y2 = end.y + 50;    // Adjust according to card height

    const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return (
        <svg
            className="absolute pointer-events-none"
            style={{
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0',
            }}
        >
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
            />
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="0"
                    refY="3"
                    orient="auto"
                    fill="black"
                >
                    <polygon points="0 0, 10 3, 0 6" />
                </marker>
            </defs>
        </svg>
    )
}

export default Arrow