import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Schedules from './pages/Schedules';

function App() {
return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/schedules' element={<Schedules/>} />


      </Routes>
    </BrowserRouter>

  </>
)
}

export default App;
