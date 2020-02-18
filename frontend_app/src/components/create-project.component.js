import React, { Component } from "react";
import axios from 'axios';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeprojectlist_description = this.onChangeprojectlist_description.bind(
      this
    );
    this.onChangeprojectlist_completed = this.onChangeprojectlist_completed.bind(
      this
    );
    this.onChangeprojectlist_DueDate = this.onChangeprojectlist_DueDate.bind(
      this
    );
    this.onChangeprojectlist_sponsor = this.onChangeprojectlist_sponsor.bind(
      this
    );
    this.onChangeprojectlist_CRMNumber = this.onChangeprojectlist_CRMNumber.bind(
      this
    );


    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projectlist_sponsor: "",
      projectlist_CRMNumber: "",
      projectlist_Level: "",
      projectlist_DueDate: "",
      projectlist_description: "",
      projectlist_completed: false
    };
  }

  onChangeprojectlist_description(e) {
    this.setState({
      projectlist_description: e.target.value
    });
  }

  onChangeprojectlist_DueDate(e) {
    this.setState({
      projectlist_DueDate: e.target.value
    });
  }

  onChangeprojectlist_completed(e) {
    this.setState({
      projectlist_completed: e.target.value
    });
  }

     onChangeprojectlist_sponsor(e) {
    this.setState({
      projectlist_sponsor: e.target.value
    });
  }
  onChangeprojectlist_CRMNumber(e) {
    this.setState({
      projectlist_CRMNumber: e.target.value
    });
  }
 

  

  onSubmit(e) {
    e.preventDefault();

    console.log(`Project Submitted:`);
    console.log(`Project description: ${this.state.projectlist_description}`);
    console.log(`Project completed: ${this.state.projectlist_completed}`);
    console.log(`Project DueDate: ${this.state.projectlist_DueDate}`);
    console.log(`Project CRMNumber: ${this.state.projectlist_CRMNumber}`);
    console.log(`Project Sponsor: ${this.state.projectlist_sponsor}`);
    console.log(`Project Level: ${this.state.projectlist_Level}`);


    const newprojectlist = {
      projectlist_description : this.state.projectlist_description,
      projectlist_CRMNumber: this.state.projectlist_CRMNumber,
      projectlist_sponsor: this.state.projectlist_sponsor,
      projectlist_Level: this.state.projectlist_Level,
      projectlist_DueDate: this.state.projectlist_DueDate,
      projectlist_completed: this.state.projectlist_completed
    }

    axios.post('http://localhost:5000/projectlist/add' , newprojectlist)

    this.setState({
      projectlist_sponsor: "",
      projectlist_CRMNumber: "",
      projectlist_Level: "",
      projectlist_DueDate: "",
      projectlist_description: "",
      projectlist_completed: false
    });
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 20 }}>
          <h3> Create New Project</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.projectlist_description}
                onChange={this.onChangeprojectlist_description}
              />
            </div>
            <div className="form-group">
              <label>CRM Number:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.projectlist_CRMNumber}
                onChange={this.onChangeprojectlist_CRMNumber}
              />

              <div className="form-group">
                <label>Sponsor Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.projectlist_sponsor}
                  onChange={this.onChangeprojectlist_sponsor}
                />
              </div>

              <div className="form-group">
                <label>Level:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.projectlist_level}
                  onChange={this.onChangeprojectlist_level}
                />
              </div>

              <div className="form-group">
                <label>Due Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={this.state.projectlist_DueDate}
                  onChange={this.onChangeprojectlist_DueDate}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create Project"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
