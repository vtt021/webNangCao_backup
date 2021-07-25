import './App.css';
import Home from '../home/Home';
import DetailPage from '../detail_page/Detail_page';
import UploadTest from '../testComponent/uploadTest';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../login_page/Login';
import SignUp from '../login_page/SignUp';
import Verifyotp from '../verify_otp/VerifyOtp';
import CategoryPage from '../categories_page/getByCategory';
import SubCategoryPage from '../categories_page/getBySubCategory';
import SearchPage from '../search_page/searchResult';
import AdminCategory from '../admin/courses/AdminCategory';
// import css

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={AdminCategory}/>
                <Route exact path="/detail/:id"
                    render={(props) => <DetailPage {...props} />} />

                <Route exact path="/categories/:id"
                    render={(props) => <CategoryPage {...props} />}
                >
                </Route>

                <Route exact path="/categories/:id/:subId"
                    render={(props) => <SubCategoryPage {...props} />}
                ></Route>

                <Route exact path="/search/:keyword/:sort?/:categoryId?"
                    render={(props) => <SearchPage {...props} />}
                >
                </Route>

                <Route exact path="/upload" component={UploadTest} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/verify-otp/:email" component={Verifyotp} />
            </div>
        </Router>
    );
}

export default App;
