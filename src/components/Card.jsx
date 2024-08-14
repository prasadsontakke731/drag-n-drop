
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
const ItemType = 'CARD';
function Card({ card, onUpdate, onShowMore }) {
    const ref = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [startSize, setStartSize] = useState(card.size);
    const [startPosition, setStartPosition] = useState(card.position);

    const [, drag] = useDrag({
        type: ItemType,
        item: { id: card.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            if (delta) {
                const newX = Math.round(startPosition.x + delta.x);
                const newY = Math.round(startPosition.y + delta.y);
                onUpdate({ position: { x: newX, y: newY } });
            }
        },
    });

    const handleMouseDown = (e) => {
        setIsResizing(true);
        setStartSize({ width: ref.current.offsetWidth, height: ref.current.offsetHeight });
        setStartPosition({ x: e.clientX, y: e.clientY });
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            const newWidth = Math.max(100, startSize.width + e.clientX - startPosition.x);
            const newHeight = Math.max(50, startSize.height + e.clientY - startPosition.y);
            onUpdate({ size: { width: newWidth, height: newHeight } });
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, startSize, startPosition]);

    const truncatedText = card.text.length > 30 ? card.text.substring(0, 30) + '...' : card.text;


    return (
        <div
            ref={(node) => drag(drop(node))}
            className="absolute bg-white border shadow-lg p-4 overflow-hidden"
            style={{
                left: card.position.x,
                top: card.position.y,
                width: card.size.width,
                height: card.size.height,
                cursor: isResizing ? 'nwse-resize' : 'move',
            }}
        >
            <p>{truncatedText}</p>
            <button
                className="text-blue-500 underline mt-2"
                onClick={onShowMore}
            >
                Show More
            </button>
            <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
                onMouseDown={handleMouseDown}
                style={{
                    transform: 'translate(50%, 50%)',
                }}
            ></div>
        </div>
    )
}

export default Card