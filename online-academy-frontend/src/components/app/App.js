import './App.css';
import Home from '../home/Home';
import DetailPage from '../detail_page/Detail_page';
import UploadTest from '../testComponent/uploadTest';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../login_page/Login';
import SignUp from '../login_page/SignUp';
// import css

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/ac" component={AdminCategory}/> */}
                <Route exact path="/detail" component={() => <DetailPage subjectName='tên khóa học test' />} />
                <Route exact path="/upload" component={UploadTest} />
                <Route exact path="/login" component={Login}/> 
                <Route exact path="/signup" component={SignUp} />
            </div>
            {/* <Home/> */}
            {/* <DetailPage/> */}
        </Router>
    );
}

export default App;
