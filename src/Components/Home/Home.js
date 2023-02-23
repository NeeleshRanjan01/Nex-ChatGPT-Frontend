import React from 'react';
import pic from "../Pics/pic.gif"
import "./Home.css"
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div>
      <div className='heading'>
        <img src="https://shsroundtable.com/wp-content/uploads/2023/01/chat-gpt-logo.jpg" alt="" className='logo'></img>
        <p className="name">Nex ChatGPT</p>
      </div>

      <div className='img'>
      <p>Ask Nex ChatGPT And Get An Answer</p><hr />
      <img src={pic} alt=""></img>
      </div>

      <div>
        <p className="tagline">WELCOME TO NEX ChatGPT</p>
        <p className="tagline1">We're the answer to the questions you ask</p>
        <p className="tagline2"> Nex ChatGPT  is a chatbot which uses API of OpenAI to answer your questions and interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response </p>
      </div>
      <Link to="/login"><button className='login'>Nex ChatGPT</button></Link>
    </div>
  );
}

export default Home






  



