import React from 'react';
import Header from './Header';
import HomeDisplay from './HomeDisplay';
import Dropdown from './FilterComponents/Dropdown';

class App extends React.Component{

  /**
 * Constructor for the app
 * @name constructor
 * @memberof module:component
 * @function 
 * @param props: variables needed by this method
 * @returns none
 */
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      searchParam: "6",
      data: []
    }


    this.setCourse = async (courseName) => {
      await this.setState({courseName: courseName});
      await this.updateView();
    }

    this.setSearch = async (search) => {
      await this.setState({searchParam: search});
      await this.updateView();
    }

    this.updateView = async () => {
      let data = await window.fetch(`/api/course/${this.state.courseName.toLowerCase()}/search?content=${this.state.searchParam}`);
      data = await data.json();
      this.setState({data: data});
    }
  }
  render() {
    return (
      <div className="App">
        <Header setSearch={this.setSearch} />
        <Dropdown setCourse={this.setCourse} />
        {this.state.courseName && <HomeDisplay data={this.state.data} />}
      </div>
    );
  }
}

export default App;
