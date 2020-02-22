import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const projectlist = props => (
    <tr>
        <td  className={props.projectlist.projectlist_completed ? 'completed' : ""}> {props.projectlist.projectlist_description}</td>
        <td> className={props.projectlist.projectlist_completed ? 'completed' : ""}> {props.projectlist.projectlist_CRMNumber}</td>
        <td> className={props.projectlist.projectlist_completed ? 'completed' : ""}> {props.projectlist.projectlist_sponsor}</td>
        <td> className={props.projectlist.projectlist_completed ? 'completed' : ""}> {props.projectlist.projectlist_level}</td>
        <td> className={props.projectlist.projectlist_completed ? 'completed' : ""}> {props.projectlist.projectlist_DueDate}</td>

        <td>
            <Link to={"/edit/"+props.projectlist._id}>Edit</Link>
        </td>
    </tr>
)

export default class projectList extends Component {

    constructor(props) {
        super(props);
        this.state = {projectlists: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/projectlist/')
            .then(response => {
                this.setState({projectlists: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
      axios.get('http://localhost:5000/projectlist/')
            .then(response => {
                this.setState({projectlists: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    projectList() {
        return this.state.projectlists.map(function(currentprojectlist, i) {
            return <projectlist projectlist={currentprojectlist} key={i} />;
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
                        { this.projectList() }
                    </tbody>
                </table>
            </div>
        )
    }
}