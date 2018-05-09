import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      acme: {}
    };
  }

  componentDidMount() {
    axios.get('/api/acme/'+this.props.match.params.id)
      .then(res => {
        this.setState({ acme: res.data });
        console.log(this.state.acme);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/acme/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.acme.name}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Acme IoT Item List</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>{this.state.acme.name}</dd>
              <dt>Device Location:</dt>
              <dd>{this.state.acme.dev_location}</dd>
            </dl>
            <Link to={`/edit/${this.state.acme._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.acme._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
