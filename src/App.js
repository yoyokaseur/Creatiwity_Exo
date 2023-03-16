import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home'
import Received from './Pages/Received';

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Received/:bookId' element={<Received/>} />
      </Routes>
    </div>
  );
}

export default App;
