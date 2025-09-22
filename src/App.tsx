import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import './App.scss';
import Scene from './components/Scene';
import useCamera from './hooks/UseCamera';
import useCameraController from './hooks/UseCameraController';
import { useEffect, useState } from 'react';
import DebugStats from './components/DebugStats';
import useGlobalCamera from './hooks/UseGlobalCamera';

function App() {
  const [sceneDiv, setSceneDiv] = useState<HTMLDivElement | null>(null);
  const camera = useGlobalCamera();
  useCameraController(camera);

  useEffect(() => {
    camera.setSceneDiv(sceneDiv);
  }, [sceneDiv, camera]);

  return (
    <>
      <div className="app">
        <Scene ref={setSceneDiv} />
      </div>
      <DebugStats />
    </>
  );
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

export default App;
