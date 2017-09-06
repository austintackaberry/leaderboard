import React, { Component } from 'react';
import './App.css';

async function getRecentCampers() {
  try {
    let response = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
    let data = await response.json();
    return data;
   } catch(error) {
    console.error(error);
  }
}

async function getAllTimeCampers() {
  try {
    let response = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    let data = await response.json();
    return data;
   } catch(error) {
    console.error(error);
  }
}

class Campers extends Component {
  constructor() {
    super();
    this.state = {
      recentCamperList: [],
      allTimeCamperList: [],
      activeList: []
    };
    this.handleRecentClick = this.handleRecentClick.bind(this);
    this.handleAllTimeClick = this.handleAllTimeClick.bind(this);
  }

  componentDidMount() {
    getRecentCampers().then((list) => {
      this.setState({recentCamperList:list});
      this.setState({activeList:list});
    });
    getAllTimeCampers().then((list) => {
      this.setState({allTimeCamperList:list});
    });
  }

  handleRecentClick() {
    this.setState({
      activeList: this.state.recentCamperList,
    });
  }

  handleAllTimeClick() {
    this.setState({
      activeList: this.state.allTimeCamperList,
    });
  }

  render() {
    var recentJSX = [
      <tr>
        <td colSpan="4" >Leaderboard</td>
      </tr>,
      <tr>
        <td>#</td>
        <td>Camper Name</td>
        <td onClick={this.handleRecentClick} >Points in past 30 days</td>
        <td onClick={this.handleAllTimeClick} >All time points</td>
      </tr>
    ];
    if (this.state.activeList.length > 1) {
      for (var i = 0; i < this.state.activeList.length; i++) {
        recentJSX.push(
          <tr>
            <td>{i+1}</td>
            <td>{this.state.activeList[i]["username"]}</td>
            <td>{this.state.activeList[i]["recent"]}</td>
            <td>{this.state.activeList[i]["alltime"]}</td>
          </tr>
        );
      }
    }
    return (
      <tbody>{recentJSX}</tbody>
    );
  }
}

class App extends Component {
  render() {
    return (
        <table>
          <Campers />
        </table>
    );
  }
}

export default App;
