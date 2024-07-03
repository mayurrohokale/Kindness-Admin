import { Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Home/Dashboard';
import SignIn from './Components/Auth/SignIn';
import Users from './Components/Home/Users';
import Volunteers from './Components/Home/Volunteers';
import VoteForm from './Components/Home/VoteForm';
import Layout from './Components/layout';
import DonationForm from './Components/Home/DonationForm';

function App() {

  return (
    <div className="App">
      <Layout>
       <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/users" element={<Users/>}/>
            <Route path="/volunteers" element={<Volunteers />}/>
            <Route path="/voteform" element={<VoteForm/>}/>
            <Route path="/donationform" element={<DonationForm/>}/>
        </Routes>
        </Layout>
      
    </div>
  );
}

export default App;
