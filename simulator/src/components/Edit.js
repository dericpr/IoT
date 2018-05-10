import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

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

  onChange = (e) => {
    const state = this.state.acme
    state[e.target.name] = e.target.value;
    this.setState({acme:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, dev_location } = this.state.acme;

    axios.put('/api/acme/'+this.props.match.params.id, {name, dev_location})
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT ACME IoT Item
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.acme._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Acme IoT List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">NAME:</label>
                <input type="text" class="form-control" name="name" value={this.state.acme.name} onChange={this.onChange} placeholder="NAME" />
              </div>
              <div class="form-group">
                <label for="dev_location">Device Location:</label>
                <input type="text" class="form-control" name="dev_location" value={this.state.acme.dev_location} onChange={this.onChange} placeholder="Device Location" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
