import React from 'react';
import {Modal, Nav, Form, Button} from "react-bootstrap";
import Dropdown from './FilterComponents/Dropdown';

export default class AddPostModal extends React.Component {
    state = {
        show: false,
        Post: {
          courseName : " ",
          title: "",
          content: ""
        }
      };
      /**
      * Updates the value of show state to true when the user click on the add post on navbar
      * @name showModal
      * @memberof module:Header
      * @function
      * @param event {Object} The event object created when the user click on the add post on navbar
      * @returns none
      */
      showModal = e => {this.setState({show: true});};
      /**
      * Updates the value of show state to false when the user click on the add post on navbar
      * @name closeModal
      * @memberof module:Header
      * @function
      * @param event {Object} The event object created when the user click on the add post on navbar
      * @returns none
      */
      closeModal = e => {this.setState({show: false});};
      /**
      /**
      * Updates the value of Post title to the input value when user input to the textbox
      * @name handleTitleChange
      * @memberof module:Header
      * @function
      * @param event {Object} The event object created when user input to the textbox
      * @returns none
      */
      handleTitleChange = e => { this.setState({Post:{title: e.target.value, courseName: this.state.Post.courseName,content: this.state.Post.content}})};
      /**
      /**
      * Updates the value of Post content to the input value when user input to the textarea
      * @name handleContentChange
      * @memberof module:Header
      * @function
      * @param event {Object} The event object created when user input to the textarea
      * @returns none
      */
      handleContentChange = e => { this.setState({Post:{content: e.target.value, courseName: this.state.Post.courseName,title:this.state.Post.title}})};
      /**
      * Close the modal and post the data
      * @name handleSubmit
      * @memberof module:Header
      * @function
      * @param event {Object} The event object hit on the submit button at the modal
      * @returns none
      */
      handleSubmit = e => {
        this.closeModal();
        this.postData();
        console.log("Form data", this.state.Post.courseName, this.state.Post.title,this.state.Post.content);
      }
      /**
      * Posts the data to the " /api/course/{{course_id}}/post"
      * @name postData
      * @memberof module:Header
      * @function
      * @returns none
      */
      async postData(){
        const postURL = `/api/course/${this.state.Post.courseName.toLowerCase()}/post`;
        const data = this.state.Post;
    
        try {
          const response = await fetch(postURL, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          console.log('Success:', JSON.stringify(json));
        } catch (error) {
          console.error('Error:', error);
        }
      }
    
      setCourse = async (courseName) => {
        await this.setState({Post:{courseName: courseName}});
      }

      render() {
          return (
              <>
            <Nav.Link onClick={this.showModal}>Create Post</Nav.Link>
            <Modal show={this.state.show} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form  onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Course: </Form.Label>
                    <Dropdown setCourse={this.setCourse} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control onChange={this.handleTitleChange} placeholder="Enter Title" />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Post: </Form.Label>
                    <Form.Control onChange={this.handleContentChange} required as="textarea" rows="3" name="content" />
                  </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button type="submit" variant="primary" onClick={this.handleSubmit}>
                Submit Post
            </Button>
            </Modal.Footer>
        </Modal>
        </>
          );
      }
}