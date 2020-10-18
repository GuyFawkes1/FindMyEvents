import React, { Component } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';


class EventsAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            title: null,
            content: null,
            errors: {
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
        if(validateForm(this.state.errors)) {
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
        }else {alert("Invalid");}
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'fullName': 
              errors.fullName = 
                value.length < 5
                  ? 'Full Name must be 5 characters long!'
                  : '';
              break;
            case 'email': 
              errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
      




        this.setState({ errors, [name]: value });
        //console.log(this.state);
    }

    getCategories() {
        Axios.get(`http://localhost:3001/api/category`)
            .then(result => {
                const categoriesList = result.data;
                this.setState({ categories: categoriesList })
            })
            .catch(error => console.log("There is some error: ", error));
    } 


    componentDidMount(){
        this.getCategories();
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
                    <div  className="form-group">
                        <label> Category</label>
                        <select className="browser-default custom-select" value={this.state.category?(this.state.category._id):''} 
                        onChange={(e) => this.setState({category: e.target.value})}>
                            {this.state.categories.map((category, index) => 
                                <option 
                                    name="category" 
                                    value={category._id} >{category.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-secondary">Add</button>
                    &nbsp;&nbsp; 
                    <Link className="btn btn-info" to='/events'>Back to List</Link>
                </form>
            </div>
        )
    }
}

export default EventsAdd;