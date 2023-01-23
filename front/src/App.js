import './App.css';
import Landing from './Pages/Landing.js';
import Register from './Pages/Register';
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path='*' element={<ErrorPage />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
