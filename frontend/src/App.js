import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Sidebar from './components/for-testing/sidebar';

function App() {
    return (
        <>
            {/* <Router>
                <Navbar />
                <Switch>
                    <Route path='/' />
                </Switch>
            </Router> */}
            <Sidebar />
        </>
    );
}

export default App;
