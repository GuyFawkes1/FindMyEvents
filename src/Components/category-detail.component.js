import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class CategoryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category:{},
            events: []
        }
    }

    getEvents() {
        console.log(this.props.match.params.id);
        axios.get(`http://localhost:3001/events/category/name/` + this.props.match.params.id)
            .then(result => {
                const eventsList = result.data;
                this.setState({ events: eventsList, category:result.data.catname })
                console.log(this.state.events)
            })
            .catch(error => console.log("There is some error: ", error));
    } 

    componentDidMount() {
        this.getEvents();
    }

    render() {
        return (
            <div  className="container">
                <h4>Events in {this.props.match.params.id}</h4>
                <br/>
                <Link to='/events-add' className="btn btn-secondary">Add New Event</Link>
                <br/><br/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Events Name</th>
                            <th>Events Venue</th>
                            <th>Start Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.venue}</td>
                                    <td>{listValue.startDate}</td>
                                    <td>
                                        {/* <Link to={`/events-detail/${listValue._id}`}>Show Details</Link> */}
                                        <Link to={'/events-detail/' + listValue._id}>Show Details</Link>
                                    </td>
                                </tr>
                            )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}
