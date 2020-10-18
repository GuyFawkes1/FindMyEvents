import React, { Component } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';


class EventsAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            eventsError: {
                title : "",
                venue : "",
                startDate : "",
                photoPath : "",
                endDate: "",
                details: "",
                organizer: "",
                paid:"",
                category:""
            },
        }
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (this.validateForm(this.state.eventsError)) {
    //       const event = {
    //         title: this.state.title,
    //         content: this.state.content,
    //       };
    //       Axios.post(`http://localhost:3001/events/`, event)
    //         .then((result) => {
    //           console.log("successfully added a new event");
    //           this.props.history.push("/events");
    //         })
    //         .catch((error) => console.log("error occured"));
    //     } else {
    //       alert("Invalid entry. Both entries must be grater than 3 characters");
    //     }
    //   };

    handleSubmit = (event) => {
        event.preventDefault();
        const eventobj = {
            title: this.state.title,
            venue : this.state.venue,
            startDate : this.state.startDate,
            photoPath : this.state.photoPath,
            endDate: this.state.endDate,
            details: this.state.details,
            organizer: this.state.organizer,
            paid: this.state.paid,
            category: this.state.category
        };
        Axios.post('http://localhost:3001/events/', eventobj)
            .then(result => {
                console.log("Successfully added a new event");
                this.props.history.push('/events')
            })
            .catch(error => console.log("There is some error: ", error));
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    };

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
        //console.log(this.state);
    }

    render() {
        return (
            <div>
                <h3>Add Events</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Event Title</label>
                        <input type="text"
                            className="form-control"
                            name="title"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Venue</label>
                        <input type="text"
                            className="form-control"
                            name="venue"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start Date and Time</label>
                        <input type="datetime-local"
                            className="form-control"
                            name="startDate"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End Date and Time</label>
                        <input type="datetime-local"
                            className="form-control"
                            name="endDate"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>More Details</label>
                        <input type="text"
                            className="form-control"
                            name="details"
                            onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Organiser</label>
                        <input type="text"
                            className="form-control"
                            name="organizer"
                            onChange={this.handleChange} />
                    </div>
             

                    <div  className="form-group">
                        <label> Is it a Free Event</label>
                        <select className="browser-default custom-select" 
                        onChange={(e) => this.setState({paid: e.target.value})}>
                            
                                <option name="paid" value="free" >Free</option>
                                <option name="paid" value="paid" >Paid</option>
                        </select>
                    </div>
                    {/* // Category drop down                 */}
                    <button type="submit" className="btn btn-secondary">Add</button>
                    &nbsp;&nbsp; 
                    <Link className="btn btn-info" to='/events'>Back to List</Link>
                </form>
            </div>
        )
    }
}

export default EventsAdd;