import './App.css';
import Landing from './Pages/Landing'
import Register from './Pages/Register'
import Home from './Pages/Home'
import {Routes, Route} from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage';
import ProtectedRoutes from './components/ProtectedRoutes';



function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        /> 
        <Route path="*" element={<ErrorPage />}>
        </Route>
      </Routes>
  );
}

export default App;
