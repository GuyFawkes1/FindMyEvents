import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    getCategories() {
        axios.get('http://localhost:3001/api/category')
            .then(result => {
                const categoriesList = result.data;
                this.setState({ categories: categoriesList })
            })
            .catch(error => console.log("There is some error: ", error));
    } 

    componentDidMount() {
        console.log("here");
        this.getCategories();
    }

    render() {
        return (
            <div  className="container">
                <h4>All the Categories</h4>
                <br/>
               
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Categories</th> 
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{listValue.name}</td>
                                    <td>
                                        {/* <Link to={`/events-detail/${listValue._id}`}>Show Details</Link> */}
                                        <Link to={'/category-detail/' + listValue.name}>Show events</Link>
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
