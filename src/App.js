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
      sort: null,
    };
  }

  setState2(state) {
    sessionStorage.setItem('state', JSON.stringify(state));
    this.setState(state);
  }

  getState2() {
    var state = sessionStorage.getItem('state') || 1;
    return {
      state: JSON.parse(state),
    }
  }

  componentDidMount() {
    var state = this.getState2();
    state['state'] !== 1 ? (
      this.setState(state['state'])
    ) : (
      fetch('https://raw.githubusercontent.com/blmzv/ah-frontend-intern/master/profiles.json', {
        method: 'get',
      })
        .then(response => {
          return response.json();
        })
        .then((data) => {
          var sort = {};
          for (var head of Object.keys(data[0])) {
            sort[head] = 0;
          }
          this.setState2({
            isLoaded: true,
            data: data,
            headers: Object.keys(data[0]),
            sort: sort,
          });
        })
    )
  }

  onSort(event, key) {
    const data = this.state.data;
    const sort = this.state.sort;

    sort[key] === 0 ? (
      data.sort((a, b) => a[key].localeCompare(b[key])),
      sort[key] = -1
    ) : (
      data.sort((a, b) => b[key].localeCompare(a[key])),
      sort[key] = 0
    );

    this.setState2({
      ...this.state,
      data: data,
      sort: sort,
    });

    console.log(this.state);
  }

  renderTableHeader() {
    return this.state.headers.map((head, index) => {
        return <th key={index} onClick={e => this.onSort(e, head)}>{head}</th>
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
