import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    getEvents() {
        axios.get(`http://localhost:3001/events`)
            .then(result => {
                const eventsList = result.data;
                this.setState({ events: eventsList })
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
                <h4>Manage Events</h4>
                <br/>
                <Link to='/events-add' className="btn btn-secondary">Add New Event</Link>
                <br/><br/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Events Name</th>
                            <th>Events Venue</th>
                            <th>Start Time and Date </th>
                            <th> Category</th>
                            <th>Paid?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.venue}</td>
                                    <td>{listValue.startDate? listValue.startDate.slice(11,16)+", " + listValue.startDate.slice(0,10):''}</td>
                                    <Link to={"/category-detail/"+listValue.category.name}><td>{listValue.category?listValue.category.name:''}</td></Link>
                                    <td>{listValue.paid === "paid"? 'Paid':'Free'}</td>
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
