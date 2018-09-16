import React, { Component } from 'react';
import './App.css';
/* eslint-disable */
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Subreddit from './Components/Subreddit';
/* eslint-enable */
import subreddits from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: []
    };
  }

  componentWillMount() {
    this.setState({ subreddits: subreddits });
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Reddit webscraping</h1>
          </header>

          <ul className="Links">
            {this.state.subreddits.map((sub, i) => {
              return (
                <li key={i}>
                  <Link to={`/${sub}`}>{sub}</Link>
                </li>
              );
            })}
          </ul>

          <div className="Routes">
            {this.state.subreddits.map((sub, i) => {
              return <Route
                path={`/${sub}`}
                component={() => <Subreddit url={sub} />}
                key={i}
              />;
            })}
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
