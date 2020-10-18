import React, { Component } from 'react';
import{Link} from "react-router-dom";
class Home extends Component {
    render() {
        return (
            // <div>
            //     <h3>Welcome to FindMyEvents</h3>
            //     <p>Now you can find events near you with a single click.<br></br> You can also advertise your events to the entire word. <br></br>To Browse through events go to Events tab. <br>
            //     </br>To Browse through categories go to categories tab</p>
              
        <div>
        <div className="card-deck">
        <div className="card" >
        <div className="card-body">
            <p className="card-title">Browse Events</p>
            <p className="card-text">
            You can Browse through all the events that are available.
            </p>
            <Link to="/events"> 
                <div className="btn btn-primary" >Go to Events</div>
            </Link>
        </div>
        </div>

        <div className="card" >
        <div className="card-body">
            <p className="card-title">Browse Events</p>
            <p className="card-text">
            Not sure about your mood? Browse through the catalogue by categories.
            </p>
            <Link to="/category"> 
                <div className="btn btn-primary" >Go to categories</div>
            </Link>
        </div>
        </div>

        </div></div>
        )
    }
}

export default Home;