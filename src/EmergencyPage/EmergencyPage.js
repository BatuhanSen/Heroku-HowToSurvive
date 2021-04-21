import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';



class EmergencyPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        kisi: '',
        durum: ''
      }
    }
  
    render() {
      return(
        <div className="main">
        <div style={{paddingBottom: 10}}>
          <div style={{border: "1px solid gray", textAlign: "center"}}>
            <p> If your situation is suitable, please fill in the media below so that you can get better assistance. Otherwise, you can only share your location information from the "Emergency" button.</p>
            </div>
          </div>
          <form id="contact-form" style={{textAlign: "center"}}onSubmit={this.handleSubmit.bind(this)} >
            <div className="form-group">
              <label htmlFor="name">Name</label><br></br>
              <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="kisi">Number of people</label><br></br>
              <input type="text" className="form-control" value={this.state.kisi} onChange={this.onKisiChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Do you need any extra help?</label><br></br>
              <textarea className="form-control" rows="5" value={this.state.durum} onChange={this.onMessageChange.bind(this)} />
            </div>
            <Link to="/">
            <Button variant="primary" onChange={() => this.handleSubmit().bind(this)} >
                Emergency
              </Button>
            </Link>
          </form>
          
        </div>
      );
    }
  
    onNameChange(event) {
      this.setState({name: event.target.value})
    }
  
    onKisiChange(event) {
      this.setState({kisi: event.target.value})
    }
  
    onMessageChange(event) {
      this.setState({durum: event.target.value})
    }
  
    handleSubmit(event) {
      alert("Emergency is added.");
    }
  }
  
  export default EmergencyPage;