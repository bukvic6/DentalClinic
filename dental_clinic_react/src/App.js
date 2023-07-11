import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Schedules from './pages/Schedules';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
return (
  <>
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/schedules' element={<Schedules/>} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>

  </>
)
}

export default App;
