import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/login/login';
import SignUp from './pages/login/signUp';
import Organiser from './pages/organiser/organiser';
import Organiser_landing_page from './pages/organiser/organiser_landing_page';
import Welcome from './pages/welcome/welcome';
import TNM from './pages/staging/tnm';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' element={<Welcome />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/signUp' element={<SignUp/>}/>
          <Route exact path='/organiser_landing_page' element={<Organiser_landing_page/>}/>
          <Route exact path='/organiser' element={<Organiser/>}/>
          <Route exact path='/staging/tnm' element={<TNM/>}/>
          <Route path='*' element={<>Page not found</>} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
