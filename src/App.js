import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);

    this.state = {
      isLoaded: false,
      data: null,
      headers: null,
    };
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

  onSort(event, key) {
    const data = this.state.data;
    data.sort((a, b) => a[key].localeCompare(b[key]));
    this.setState({
      data: data,
    })
  }

  renderTableHeader() {
    return this.state.headers.map((head, index) => {
        return <td key={index} onClick={e => this.onSort(e, head)}>{head}</td>
      }
    );
  }

  renderEntry(entry, index) {
    var row = Array(entry.length).fill(null);
    var pos = 0;
    for (var key in entry) {
      row[pos] = <td key={pos}>{entry[key]}</td>;
      pos += 1;
    }
    return row;
  }

  renderTableData() {
    return this.state.data.map((entry, index) => {
      return <tr key={index}>{this.renderEntry(entry, index)}</tr>;
    });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      isLoaded ?
      <div id="dTable">
        <table id="table">
          <tbody>
            <tr id="tableHead" key={-1}>{this.renderTableHeader()}</tr>
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
