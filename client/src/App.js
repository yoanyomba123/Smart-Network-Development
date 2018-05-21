import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/Authentication/register";
import Login from "./components/Authentication/login";
import Markets from "./components/Information-Feeds/markets";
// provides app with the store
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth.action";
import "./App.css";
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
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/Markets" component={Markets} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
