import React, { Component } from 'react';
import axios from "axios";


class EventsEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            title: null,
            venue : null,
            startDate : null,
            photoPath : null,
            endDate: null,
            details: null,
            organizer: null,
            paid: null,
            category: null
        }
    }
    getCategories() {
        axios.get(`http://localhost:3001/api/category`)
            .then(result => {
                const categoriesList = result.data;
                this.setState({ categories: categoriesList })
            })
            .catch(error => console.log("There is some error: ", error));
    } 


  

    componentDidMount() {
        axios.get('http://localhost:3001/events/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    title : result.data.title,
                    venue : result.data.venue,
                    startDate : result.data.startDate,
                    photoPath : result.data.photoPath ,
                    endDate: result.data.endDate ,
                    details: result.data.details ,
                    organizer: result.data.organizer ,
                    paid: result.data.paid,
                    category: result.data.category
                });
            })
            .catch(error => console.log("There is some error: ", error));
        this.getCategories();

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const note = {
            id: this.props.match.params.id,
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
        axios.put('http://localhost:3001/events/' + note.id, note)
            .then(result => {
                console.log("Successfully updated existing note");
                this.props.history.push('/events')
            })
            .catch(error => console.log("There is some error: ", error));
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
        console.log(this.state);
    }

    render() {
        return (
            
            <div className="container">
                <h3>Edit Events</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Event Title</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title || ''}
                            name="title"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Venue</label>
                        <input type="text"
                            className="form-control"
                            name="venue"
                            value={this.state.venue || ''}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start Date and Time</label>
                        <input type="datetime-local"
                            className="form-control"
                            name="startDate"
                            value={this.state.startDate||''}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End Date and Time</label>
                        <input type="datetime-local"
                            className="form-control"
                            name="endDate"
                            value={this.state.endDate || ''}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>More Details</label>
                        <input type="text"
                            className="form-control"
                            name="details"
                            value={this.state.details ||''}
                            onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Organizer</label>
                        <input type="text"
                            className="form-control"
                            name="organizer"
                            value={this.state.organizer || ''}
                            onChange={this.handleChange} />
                    </div>
             

                    <div  className="form-group">
                        <label> Is it a Free Event</label>
                        <select className="browser-default custom-select" value={this.state.paid?(this.state.paid):''} 
                        onChange={(e) => this.setState({paid: e.target.value})}>
                            
                                <option name="paid" value="free" >Free</option>
                                <option name="paid" value="paid" >Paid</option>
                        </select>
                    </div>

                    <div  className="form-group">
                        <label> Category</label>
                        <select className="browser-default custom-select" 
                        onChange={(e) => this.setState({category: e.target.value})} value={this.state.category?this.state.category._id:''}>
                            {this.state.categories.map((category, index) => 
                                <option 
                                    name="category" 
                                    value={category._id} >{category.name}</option>)}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-secondary">Add</button>
                </form>
            </div>
            
        )
    }
}

export default EventsEdit;