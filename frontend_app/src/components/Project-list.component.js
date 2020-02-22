import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = { projectlists: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/projectlist/")
      .then(response => {
        console.log("response data", response.data);
        this.setState({ projectlists: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:5000/projectlist/")
      .then(response => {
        this.setState({ projectlists: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Project List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>CRM number</th>
              <th>Sponsor</th>
              <th>Level</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projectlists.map(function(currentprojectlist, i) {
              return (
                <tr>
                  <td
                    className={
                      currentprojectlist.projectlist_completed
                        ? "completed"
                        : ""
                    }
                  >
                    {currentprojectlist.projectlist_description}
                  </td>
                  <td
                    className={
                      currentprojectlist.projectlist_completed
                        ? "completed"
                        : ""
                    }
                  >
                    {currentprojectlist.projectlist_CRMNumber}
                  </td>
                  <td
                    className={
                      currentprojectlist.projectlist_completed
                        ? "completed"
                        : ""
                    }
                  >
                    {currentprojectlist.projectlist_sponsor}
                  </td>
                  <td
                    className={
                      currentprojectlist.projectlist_completed
                        ? "completed"
                        : ""
                    }
                  >
                    {currentprojectlist.projectlist_level}
                  </td>
                  <td
                    className={
                      currentprojectlist.projectlist_completed
                        ? "completed"
                        : ""
                    }
                  >
                    {currentprojectlist.projectlist_DueDate}
                  </td>

                  <td>
                    <Link to={"/edit/" + currentprojectlist._id}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
