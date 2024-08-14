/* eslint-disable no-unused-vars */
import React from 'react'
import Canvas from './components/Canvas'

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Drag and Drop UI</h1>
      </header>
      <main className="p-4">
        <Canvas />
      </main>
    </div>
  )
}

export default App