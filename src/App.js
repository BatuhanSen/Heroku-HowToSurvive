import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import UserPage from "./UserPage/UserPage";
import NewLocation from "./NewLocation/NewLocation";
import EmergencyPage from "./EmergencyPage/EmergencyPage";
import ContactPage from "./ContactPage/ContactPage";

import BlogPage from "./BlogPage/DisplayAllPosts";

/////
import 'bootstrap/dist/css/bootstrap.min.css';
/////


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={UserPage} />
        <Route path="/newloc" component={NewLocation} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/emergency" component={EmergencyPage} />

        <Route path="/blogpage" component={BlogPage} />
        
      </Switch>
    );
  }
}
export default App;
