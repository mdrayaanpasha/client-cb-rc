import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatBot from './components/cb';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/chat' element={<ChatBot/>} />
      </Routes>
    </Router>
  );
}
