import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/layouts/Header'

export default function App() {
  return (
    <BrowserRouter>

      <main className='bg-black min-h-screen text-white'>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={"not found"} />
        </Routes>
      {/* <Footer /> */}
      </main>

    </BrowserRouter>
  )
}