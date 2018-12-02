import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import 'semantic-ui-css/semantic.min.css';
import bot from './bot.png';
import './App.css';

const getAnswer = async (myBody, func) => {
    const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        body: JSON.stringify(myBody),
        headers:{
            'Content-Type': 'text/plain'
        }
    });
    const myJson = await response.json();
    func(myJson['answer']);
}

class App extends Component {

    componentDidMount() {
        addResponseMessage("Hi, I am ITllect.");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        getAnswer({"query":newMessage},addResponseMessage);
    }
  render() {
    return (
      <div className="App">
		<Widget
            title = {"Welcome Sundevil 🔱"}
            subtitle = {"How can i help you ?"}
            profileAvatar = {bot}
		    handleNewUserMessage={this.handleNewUserMessage}
		/>
      </div>
    );
  }
}

export default App;
