/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function Popup({ text, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/2 max-w-lg">
                <p>{text}</p>
                <button
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Popup