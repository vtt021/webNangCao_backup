import './App.css';
import Home from '../home/Home';
import DetailPage from '../detail_page/Detail_page';
import UploadTest from '../testComponent/uploadTest';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import css

function App() {
    return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/detail" component={DetailPage} />
                    <Route exact path="/upload" component={UploadTest} />
                </div>
                {/* <Home/> */}
                {/* <DetailPage/> */}
            </Router>
    );
}

export default App;
