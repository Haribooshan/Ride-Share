import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import AddRidePage from './pages/add-ride-page';
import RidesPage from './pages/rides-page';
import MyRidesPage from './pages/my-rides-page';
import StarredRidesPage from './pages/starred-rides-page';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/rides" element={<RidesPage/>}/>
            <Route path="/add-ride" element={<AddRidePage/>}/>
            <Route path="/my-rides" element={<MyRidesPage/>}/>
            <Route path="/starred-rides" element={<StarredRidesPage/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
