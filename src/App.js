import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Home/Dashboard';
import SignIn from './Components/Auth/SignIn';

function App() {
  return (
    <div className="App">
       <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
           
        </Routes>
    </div>
  );
}

export default App;
