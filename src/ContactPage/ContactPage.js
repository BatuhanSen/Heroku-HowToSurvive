import React from 'react';
import "./Contact.css";
import { Link } from 'react-router-dom';


class ContactPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        message: ''
      }
    }
  
    render() {
      return(
        <div className="main">
          <div style={{paddingBottom: 100}}>
          <div style={{border: "1px solid gray", textAlign: "center", float: "left", width: "49%"}}>
            <p> <b>Our E-mail Address:</b> <br></br> howtosurvive@gmail.com</p>
            </div>
            <div style={{border: "1px solid gray", textAlign: "center", float: "right", width: "49%"}}>
            <p> <b>Our Phone Number:</b> <br></br> +905423606300</p>
            </div>
          </div>
            <br></br>
          <form id="contact-form"style={{textAlign: "center"}} onSubmit={this.handleSubmit.bind(this)} >
            <div className="form-group" >
              <label htmlFor="name">Name</label><br></br>
              <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">E-mail Address</label><br></br>
              <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label><br></br>
              <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
            </div>
            <Link to="/">
            <button type="submit" className="btn btn-primary">Submit</button>
            </Link>
          </form>
        </div>
      );
    }
  
    onNameChange(event) {
      this.setState({name: event.target.value})
    }
  
    onEmailChange(event) {
      this.setState({email: event.target.value})
    }
  
    onMessageChange(event) {
      this.setState({message: event.target.value})
    }
  
    handleSubmit(event) {
    }
  }
  
  export default ContactPage;