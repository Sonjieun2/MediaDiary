import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/Header'
import Main from './app/page'
import Registration from './page/Registration'
import AddCategory from './page/AddCategory'
import { CategoryProvider } from './context/CategoryContext'

function AppContent() {
  return (
    <>
      <Header />
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/upload" element={<Registration />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </Routes>
      </CategoryProvider>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}