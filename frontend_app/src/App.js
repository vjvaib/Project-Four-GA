import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateProject from "./components/create-project.component";
import EditProject from "./components/edit-project.component";
import ProjectList from "./components/Project-list.component";


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://github.com/vjvaib">
            <img src="https://sdwild.files.wordpress.com/2013/11/harvard_collaboration.jpg" width="100" height="100" alt="" />
          </a>

          <Link to="/" className="navbar-brand">
            {" "}
            IQVIA-Team Project App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  To Do Projects
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create New Project for the team
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={ProjectList} />
        <Route path="/edit/:id" component={EditProject} />
        <Route path="/create" component={CreateProject} />
      </div>
    </Router>
  );
}

export default App;
