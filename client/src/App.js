import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/Authentication/register";
import Login from "./components/Authentication/login";
import RssFeeds from "./components/Information-Feeds/markets";
// provides app with the store
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth.action";
import "./App.css";
import Dashboard from "./components/Profile/Dashboard";
import CreateProfile from "./components/Create-Profile/CreateProfile";
import EditProfile from "./components/Edit-Profile/EditProfile";
import AddExperience from "./components/Add-Credentials/AddExperience";
import AddEducation from "./components/Add-Credentials/AddEducation";
import AddProjects from "./components/Add-Credentials/AddProjects";
import AddHonors from "./components/Add-Credentials/AddHonors";
import AddVolunteer from "./components/Add-Credentials/AddVolunteer";
import Profiles from "./components/Profiles/Profiles";
import { clearCurrentProfile } from "./actions/profile.action";
import PrivateRoute from "./components/Common/privateRoute";
import Profile from "./components/Profiles-Profile/Profile";
import NotFound from "./components/NotFound/NotFound";

//check for token presence
if (localStorage.jwtToken) {
  // set Auth token to header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticate
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout User
    store.dispatch(logoutUser());
    // clear our profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="bg-light">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/Markets" component={RssFeeds} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-honors" component={AddHonors} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-projects"
                  component={AddProjects}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-volunteer"
                  component={AddVolunteer}
                />
              </Switch>
              <Route exact path="/Economy" component={RssFeeds} />
              <Route exact path="/StructuredProducts" component={RssFeeds} />
              <Route exact path="/CurrencyDerivatives" component={RssFeeds} />
              <Route exact path="/EquityDerivatives" component={RssFeeds} />
              <Route
                exact
                path="/InterestRateDerivatives"
                component={RssFeeds}
              />
              <Route exact path="/CreditDerivatives" component={RssFeeds} />
              <Route exact path="/CommodityDerivatives" component={RssFeeds} />
              <Route exact path="/Opinions" component={RssFeeds} />
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
