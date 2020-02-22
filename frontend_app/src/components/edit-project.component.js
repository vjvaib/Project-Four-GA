import React, { Component } from "react";
import axios from "axios";

export default class EditProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeprojectlist_description = this.onChangeprojectlist_description.bind(
      this
    );

    this.onChangeprojectlist_completed = this.onChangeprojectlist_completed.bind(
      this
    );

    this.onChangeprojectlist_CRMNumber = this.onChangeprojectlist_CRMNumber.bind(
      this
    );

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projectlist_description: "",
      projectlist_CRMNumber: "",
      projectlist_sponsor: "",
      projectlist_Level: "",
      projectlist_DueDate: "",
      projectlist_completed: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/projectlist/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          projectlist_description: response.data.projectlist_description,
          projectlist_CRMNumber: response.data.projectlist_CRMNumber,
          projectlist_sponsor: response.data.projectlist_sponsor,
          projectlist_Level: response.data.projectlist_Level,
          projectlist_DueDate: response.data.projectlist_DueDate,
          projectlist_completed: response.data.projectlist_completed
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeprojectlist_description(e) {
    this.setState({
      projectlist_description: e.target.value
    });
  }

  onChangeprojectlist_CRMNumber(e) {
    this.setState({
      projectlist_CRMNumber: e.target.value
    });
  }

  onChangeprojectlist_DueDate(e) {
    this.setState({
      projectlist_DueDate: e.target.value
    });
  }

  onChangeprojectlist_completed(e) {
    this.setState({
      projectlist_completed: !this.state.projectlist_completed
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      projectlist_description: this.state.projectlist_description,
      projectlist_CRMNumber: this.state.projectlist_CRMNumber,
      projectlist_completed: this.state.projectlist_completed
    };

    axios
      .post(
        "http://localhost:5000/projectlist/update/" +
          this.props.match.params.id,
        obj
      )

      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3> Update projectlist</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.projectlist_description}
              onChange={this.onChangeprojectlist_description}
            />
          </div>

          <div className="form-group">
            <label> CRMNumber: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.projectlist_CRMNumber}
              onChange={this.onChangeprojectlist_CRMNumber}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completedCheckbox"
              name="completedCheckbox"
              onChange={this.onChangeprojectlist_completed}
              checked={this.state.projectlist_completed}
              value={this.state.projectlist_completed}
            />

            <label className="form-check-label" htmlFor="completedCheckBox">
              Completed
            </label>
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update projectlist"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
