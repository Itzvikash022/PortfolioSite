import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import FloatingIconsBackground from './components/FloatingIconsBackground';

function App() {
  return (
    <BrowserRouter>
      <FloatingIconsBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
