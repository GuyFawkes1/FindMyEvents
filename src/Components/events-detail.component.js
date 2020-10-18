import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


class EventsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: {}
            
        };
    }

    deleteNote(id) {
        console.log(id);
        axios.delete('http://localhost:3001/events/' + id)
        .then(result => {
            console.log("Event deleted with ID: " + id);
            this.props.history.push('/events')
        })
        .catch(error => console.log("There is some error: ", error));
    }

    componentDidMount() {
        axios.get('http://localhost:3001/events/' + this.props.match.params.id)
        .then(result => {
            this.setState({event: result.data});
            //console.log(this.state.event);
        })
        .catch(error => console.log("There is some error: ", error));
    }

    render() {
        return (
            <div>
                <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.event.title}
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            
                            <tbody>
                                <tr>
                                    <th>Event Title</th>
                                    <td>{this.state.event.title}</td>
                                </tr>
                                <tr>
                                    <th>Venue</th>
                                    <td>{this.state.event.venue}</td>
                                </tr>
                                <tr>
                                    <th>Event Dates</th>
                                    <td>{this.state.event.startDate? this.state.event.startDate.slice(11,16)+", " + this.state.event.startDate.slice(0,10):''} to {this.state.event.endDate? this.state.event.endDate.slice(11,16)+", " + this.state.event.endDate.slice(0,10):''} </td>
                                </tr>

                                <tr>
                                    <th>Event Details</th>
                                    <td>{this.state.event.details} </td>
                                </tr>
                                <tr>
                                    <th>Organiser</th>
                                    <td>{this.state.event.organizer} </td>
                                </tr>
                                
                                <tr>
                                    <th>Price</th>
                                    <td>{this.state.event.paid === "paid"? 'Paid':'Free'} </td>
                                </tr>

                                <tr>
                                    <th>Category</th>
                                    <td>{this.state.event.category}                                   </td>

                                </tr>
                                
                                

                                
                                <tr>
                                    <td>
                                        <Link className="btn btn-info" to='/events'>Back to List</Link>
                                        &nbsp;&nbsp;
                                        <Link className="btn btn-secondary" to={`/events-edit/${this.state.event._id}`}>Edit</Link>
                                        &nbsp;&nbsp;
                                        <button onClick={this.deleteNote.bind(this, this.state.event._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default EventsDetail;