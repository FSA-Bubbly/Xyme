import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Wallet from "./components/Wallet";
import AddPillForm from "./components/AddPillForm";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import SinglePill from "./components/SinglePill";
import Interactions from "./components/Interactions";
import { me } from "./store";
import Camera from "./components/Camera";
import Settings from "./components/Settings";

import DailyPillView from "./components/DailyPillView";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className=' dark:bg-gray-800 dark:text-gray-100 p-4 flex-grow bg-nude font-mont text-black'>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/wallet' component={Wallet} />
            <Route exact path='/wallet/add-pill' component={AddPillForm} />

            <Route exact path='/wallet/select/:pillId' component={SinglePill} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/edit' component={ProfileEdit} />
            <Route exact path='/interactions' component={Interactions} />
            <Route exact path='/dailypill' component={DailyPillView} />
            <Route exact path='/camera' component={Camera} />
            <Route exact path='/settings' component={Settings} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
