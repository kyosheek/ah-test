import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: null,
      headers: null,
    }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/blmzv/ah-frontend-intern/master/profiles.json', {
      method: 'get',
    })
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          isLoaded: true,
          data: data,
          headers: Object.keys(data[0]),
        });
      });
  }

  renderTableHeader() {

  }

  renderEntry(entry, index) {
    var row = Array(entry.length).fill(null);
    var pos = 0;
    for (var key in entry) {
      row[pos] = <td>{entry[key]}</td>;
      pos += 1;
    }
    return row;
  }

  renderTableData() {
    const data = this.state.data;
    var entries = Array(data.length).fill(null);
    this.state.data.map((entry, index) => {
      entries[index] = <tr key={index}>{this.renderEntry(entry, index)}</tr>;
    });
    return entries;
  }

  render() {
    const { isLoaded, data } = this.state;
    return (
      isLoaded ?
      <div id="dTable">
        <table id="table">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
      :
      <p id="awaitText">Data is loading</p>
    )
  }
}

export default App;

function loadData() {

}
