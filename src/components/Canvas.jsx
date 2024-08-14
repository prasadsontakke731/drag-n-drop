/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Card from './Card';
import Arrow from './Arrow';
import Popup from './Popup';


function Canvas() {
    const [cards, setCards] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [popup, setPopup] = useState(null);

    const addCard = () => {
        const newCard = {
            id: cards.length + 1,
            text: "This is some dummy text that will be truncated.",
            position: { x: 100, y: 100 },
            size: { width: 200, height: 100 },
        };
        setCards([...cards, newCard]);
    };

    const updateCard = (id, updates) => {
        setCards(cards.map(card => card.id === id ? { ...card, ...updates } : card));
    };

    const connectCards = (startId, endId) => {
        setArrows([...arrows, { startId, endId }]);
    };
    return (
        <div className="relative w-full h-screen overflow-scroll bg-gray-100">
            <button
                className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded"
                onClick={addCard}
            >
                Add Card
            </button>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onUpdate={(updates) => updateCard(card.id, updates)}
                    onShowMore={() => setPopup(card.text)}
                />
            ))}
            {arrows.map((arrow, index) => (
                <Arrow
                    key={index}
                    start={cards.find(c => c.id === arrow.startId).position}
                    end={cards.find(c => c.id === arrow.endId).position}
                />
            ))}
            {popup && (
                <Popup text={popup} onClose={() => setPopup(null)} />
            )}
        </div>
    )
}

export default Canvas