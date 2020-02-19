import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const projectList = props => (
    <tr>
        <td>{props.projectlist.projectlist_description}</td>
        <td>{props.projectlist.projectlist_responsible}</td>
        <td>{props.projectlist.projectlist_priority}</td>
        <td>
            <Link to={"/edit/"+props.projectlist._id}>Edit</Link>
        </td>
    </tr>
)

export default class ProjectList extends Component {

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

    projectList() {
        return this.state.ProjectList.map(function(currentprojectlist, i) {
            return <projectList projectlist={currentprojectlist} key={i} />;
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