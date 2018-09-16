import React, { Component } from 'react';
import axios from 'axios';


class Subreddit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log('component mounted');
    const API_URL = `http://localhost:8000/api/${this.props.url}`;
    axios
      .get(API_URL)
      .then(res => {
        this.setState({ links: res.data });
      })
      .then(() => console.log(this.state))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        {this.state.links.map((link, i) => {
          return <img src={link} key={i} alt={link} />;
        })}
      </div>
    );
  }
}

export default Subreddit;
