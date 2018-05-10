import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      acme_list: []
    };
  }

  componentDidMount() {
    axios.get('/api/acme')
      .then(res => {
        this.setState({ acme_list: res.data });
        console.log(this.state.acme_list);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ACME IoT CATALOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Acme Item</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Device Location</th>
                </tr>
              </thead>
              <tbody>
                {this.state.acme_list.map(acme =>
                  <tr>
                    <td><Link to={`/show/${acme._id}`}>{acme.name}</Link></td>
                    <td>{acme.dev_location}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
