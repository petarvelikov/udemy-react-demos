import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './seasonDisplay';
import Spinner from './spinner';

class App extends Component {
  state = { lat: null, long: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude, long: position.coords.longitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() {
    console.log('UPDATED!');
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat && !this.state.long) {
      return <h1>Error: {this.state.errorMessage}</h1>;
    }

    if (!this.state.errorMessage && this.state.lat && this.state.long) {
      return (
        <SeasonDisplay lat={this.state.lat} long={this.state.long} />
      );
    }

    return <Spinner message="Моля изчакайте да зареди." />
  }

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));