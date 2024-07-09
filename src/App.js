import { Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Home/Dashboard';
import SignIn from './Components/Auth/SignIn';
import Users from './Components/Home/Users';
import Volunteers from './Components/Home/Volunteers';
import VoteForm from './Components/Home/VoteForm';
import Layout from './Components/layout';
import DonationForm from './Components/Home/DonationForm';
import Blog from './Components/Home/Blogs';

function App() {

  return (
    <div className="App">
   
       <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/users" element={<Users/>}/>
            <Route path="/volunteers" element={<Volunteers />}/>
            <Route path="/voteform" element={<VoteForm/>}/>
            <Route path="/donationform" element={<DonationForm/>}/>
            <Route path="/blog" element={<Blog/>}/>
        </Routes>
     
     
    </div>
  );
}

export default App;
