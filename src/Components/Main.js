import React, { Component } from 'react';
import { BrowserRouter as Router, Link, 
    NavLink, Route, Switch } from "react-router-dom";

import Home from './Home';
import Events from './events.components';
import EventsDetail from './events-detail.component';
import EventsAdd from './events-add.component';
import EventsEdit from './events-edit.component';
import Category from './category.component';
import CategoryDetails from './category-detail.component';

class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to={'/'} className="navbar-brand">FindMyEvents</Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/events'} className="nav-link">Events</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/category'} className="nav-link">Categories</Link>
                                    </li> 
                                    



                                </ul>
                            </div>
                        </nav> <br />
                        <Switch> 
                            <Route exact path='/' component={Home} />
                            <Route path='/events' component={Events} />
                            <Route path='/events-add' component={EventsAdd} />
                            <Route path='/events-detail/:id' component={EventsDetail} />
                            <Route path='/events-edit/:id' component={EventsEdit} />
                            <Route path='/category' component={Category}/>
                            <Route path='/category-detail/:id' component={CategoryDetails}/>
                        </Switch>
                   
                </Router>                
            </div>
        )
    }
}

export default Main;