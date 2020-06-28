import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container } from "reactstrap";
import List from "./components/list-component";
import AddEdit from "./components/add-edit";
import { TrackerNav } from "./components/nav";

import { TrackerProvider } from "./store/tracker-context";
import "bootstrap/dist/css/bootstrap.min.css";
import './app.scss';

const App = () => {
  return (
    <Container>
      <Router>
        <TrackerNav />
        <Switch>
          <TrackerProvider>
            <Route exact path="/" component={AddEdit} />
            <Route exact path="/add" component={AddEdit} />
            <Route exact path="/edit/:id" component={AddEdit} />
            <Route exact path="/list" component={List} />
            {/* <Route exact path="/server-error/:id" component={ ServerErrors } /> */}
          </TrackerProvider>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
