import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import './App.scss'
import Scene from './components/Scene'

function App() {
  return (
    <div className="app">
      <Scene />
    </div>
  )
  // return (
  //   <Router>
  //     <div className="min-h-screen bg-gray-50">
  //       <Navbar />
  //       <main className="container mx-auto px-4 py-8">
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/about" element={<About />} />
  //           <Route path="/projects" element={<Projects />} />
  //           <Route path="/contact" element={<Contact />} />
  //         </Routes>
  //       </main>
  //       <Footer />
  //     </div>
  //   </Router>
  // )
}

export default App
