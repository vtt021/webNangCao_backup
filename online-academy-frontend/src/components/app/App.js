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
import WatchVideoPage from '../watchVideo/watchVideo';
import AdminCategory from '../admin/categories/AdminCategory';
import AdminHome from '../admin/home/AdminHome';
import AdminUser from '../admin/user/UserTable';
import HomeTeacher from '../teacher/homeTeacher';
import UploadCourse from '../teacher/uploadCourse';
import UploadVideo from '../teacher/child_component/uploadVideo';
import UpdateContent from '../teacher/update/updateCourse';
import PersonalManagement from '../student/personalManagement';
// import css

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={Home} />

                <Route exact path="/admin" component={AdminHome}/>
                <Route exact path="/admin/categories" component={AdminCategory}/>
                <Route exact path="/admin/sub-categories" component={AdminSubCategory}/>
                <Route exact path="/admin/users" component={AdminUser}/>
                <Route exact path="/teacher" component={HomeTeacher}/>
                <Route exact path="/teacher/updateCourse/:id?" component={UpdateContent}/>

                <Route exact path="/teacher/uploadCourse" component={UploadCourse} />
                <Route exact path="/teacher/uploadVideo" component={UploadVideo} />

                <Route exact path="/profile" component={PersonalManagement} />

                <Route exact path="/detail/:id"
                    render={(props) => <DetailPage {...props} />} />
                <Route exact path="/video/:id"
                    render={(props) => <WatchVideoPage {...props} />} />


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
