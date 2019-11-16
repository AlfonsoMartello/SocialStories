import React from 'react';
import Header from './Header';
import HomeDisplay from './HomeDisplay';
import CreateClass from './FilterComponents/createCourse';
import Dropdown from './FilterComponents/Dropdown';



/**
 * Dropdown module
 * @module App
 * @requires none
 */
class App extends React.Component{

  /**
 * Constructor for the app
 * @name constructor
 * @memberof module:App
 * @function 
 * @param props: variables needed by this method
 * @returns none
 */
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      searchParam: "",
      data: []
    }

  /**
   * Sets course accodrding to user input
   * @name set course
   * @memberof module:App
   * @function setCourse
   * @param courseName: course name given by user
   * @returns none
   */
    this.setCourse = async (courseName) => {
      await this.setState({courseName: courseName});
      await this.updateView();
    }

    /**
   * Sets search query to user input
   * @name set search
   * @memberof module:App
   * @function setSearch
   * @param search: string to search for
   * @returns none
   */
    this.setSearch = async (search) => {
      await this.setState({searchParam: search});
      await this.updateView();
    }


    /**
   * Pulls data and displays it 
   * @name update view
   * @memberof module:App
   * @function updateView
   * @param none
   * @returns none
   */
    this.updateView = async () => {
      let data = await window.fetch(`/api/course/${this.state.courseName.toLowerCase()}/search?content=${this.state.searchParam}`);
      data = await data.json();
      this.setState({data: data});
    }
  }

  /**
   *Render - provides UI for front page
    * @name render
    * @memberof module:App
    * @function render
    * @returns UI
  */
  render() {
    return (
      <div className="App">
        <Header setSearch={this.setSearch} />
        <Dropdown setCourse={this.setCourse} />
        {/* <CreateClass /> */}
        {this.state.data && <HomeDisplay data={this.state.data} course={this.state.courseName}/>}
      </div>
    );
  }
}

export default App;
