import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import ChatGPTLogo from "../Pics/chatgpt-logo.jpg"
import "./ChatGPT.css"
import DotLoader from './Loading';

const ChatGPT = (props) => {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(``)
  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [selectType, setSelectType] = useState("text")
  const [chatLog, setChatLog] = useState([])
  const [searchEngine, setEngine] = useState([])
  const [searchEngineValue, setEngineValue] = useState("text-davinci-003")
  const [isLoading, setIsLoading] = useState(false);

  let oldChatLog = chatLog.slice(0, -1)
  let newChatLog = chatLog.slice(-1)

  console.log(process.env)

  const configuration = new Configuration({
    organization: "org-L2GZ4kXnhDM2W2TwVicIEJHd",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index < result.length) {
        setIndex(index + 1);
      }
    }, 40);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, result]);


  const ImageHandel = async () => {
    setIsLoading(true);
    const response = await openai.createImage({
      prompt: question,
      n: 1,
      size: "1024x1024",
    });
    setIsLoading(false);
    setQuestion("")
    setResult(response.data.data[0].url)
    setChatLog((data) => {
      return ([...data, { "question": question, "answer": (response.data.data[0].url) }])
    })
  }

 
    const engine = async () => {
      const response = await openai.listEngines();
      setEngine(response.data.data)
    }
    engine()

  const handelSubmit = async () => {
    setIsLoading(true);
    const response = await openai.createCompletion({
      model: searchEngineValue,
      prompt: question,
      max_tokens: 99,
      temperature: 0.6,
    })
    setIsLoading(false);
    setQuestion("")
    setResult(response.data.choices[0].text)
    setChatLog((data) => {
      return ([...data, { "question": question, "answer": response.data.choices[0].text }])
    })

    // }).catch((error)=>{
    //   //   console.log(error)
    //   //   alert(`Sorry, because of high load we are unable to serve you \nPlease try after some time `)
    //  })

    setShowAnswer(true);
    setIndex(0)
  }

  const logout = () => {
    localStorage.clear();
    props.setAlter(!props.alter)
  }

  const modeChange = (e) => {
    setSelectType(e.target.value)
    setChatLog([])
  }


  return (
    <div className='chatGPT-UI'>
      <div className={(toggle === true) ? "left-side-section" : "left-side-section-toggle"}>
        <div>
          <div className='close' onClick={() => { setToggle(!toggle) }}>X</div>
          <div className='newChat' onClick={() => setChatLog([])}>
            <div>
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            New chat
          </div>
          <div className='engine'>
            <select value={selectType} className='newChat' onChange={modeChange} >
              <option value="text"> Text completion </option>
              <option value="image"> Image generation </option>
            </select>
            <p>Select the appropriate AI for the appropriate response. </p>
          </div>

          <div className='engine'>
            <select value={searchEngineValue} className='newChat' onChange={(e) => { setEngineValue(e.target.value) }} >
              {
                searchEngine.map((data) => {
                  return (
                    <option value={data.id}>{data.id}</option>
                  )
                })
              }
            </select>
            <p>Select the appropriate search engine to generate the suitable response.</p>
          </div>
        </div>


        <div className='left-side-bottom-section'>
          <div className="logout" onClick={logout}>
            <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div>
            Logout
          </div>

          <div className={(mode === false) ? "mode-display2" : "mode-display1"} onClick={() => setMode(!mode)}>
            <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></div>
            Light Mode
          </div>

          <div className={(mode === false) ? "mode-display1" : "mode-display2"} onClick={() => setMode(!mode)}>
            <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></div>
            Dark Mode
          </div>

          <div className="Updates">
          <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></div>
          <a href="https://help.openai.com/en/collections/3742473-chatgpt" target="_blank" rel="noreferrer" className='a'>Updates & FAQ</a>
          </div>

          {/* <div className="UserDetails">
            <div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
            User Details
          </div> */}

        </div>
      </div>


      {/* Right Side Section---------------------------------------------------------------------------------------------------------- */}

      <div className={(mode === false) ? 'right-side-section dark' : "right-side-section light"}>
        <div className={(mode === false) ? 'right-side-section-head-dark' : "right-side-section-head-light"}>
          <div className='hamberger' onClick={() => { setToggle(!toggle) }}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div >New Chat</div>
          <div onClick={() => setChatLog([])}>
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
        </div>

        <div className='chat-log'>
          <div>
            {
              oldChatLog.map((data) => {
                return (
                  <div>
                    <div className={(mode === true) ? "question-section light" : "question-section dark"} >
                      <div className='user'>
                        <div>{localStorage.getItem("name")[0]}</div>
                      </div>
                      <div>{data.question}</div>
                    </div>

                    <div className={(mode === true) ? "answer-section light1" : "answer-section dark1"}>
                      <div>
                        <img className='ChatGPTLogo' src={ChatGPTLogo} alt=""></img>
                      </div>
                      {
                        (`${selectType}` === "text") ?
                          <div>{`${data.answer}`}</div>
                          : <img className="imageResult" src={data.answer} alt=""></img>
                      }
                    </div>
                  </div>
                )
              })}

            {
              newChatLog.map((data) => {
                return (
                  <div>
                    <div className={(mode === true) ? "question-section light" : "question-section dark"} >
                      <div className='user'>
                        <div>{localStorage.getItem("name")[0]}</div>
                      </div>
                      <div>{data.question}</div>
                    </div>
                    <div className={(mode === true) ? "answer-section light1" : "answer-section dark1"}>
                      <div>
                        <img className='ChatGPTLogo' src={ChatGPTLogo} alt=""></img>
                      </div>
                      {
                        (`${selectType}` === "text") ?
                          (showAnswer ? (<div>{`${data.answer}`.slice(0, index)}</div>) : null)
                          : <img className="imageResult" src={data.answer} alt=""></img>
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className='inputDiv'>
          <input type="text" value={question} className={(mode === true) ? "light" : "dark1"} onChange={(e) => { setQuestion(e.target.value) }}></input>
          {isLoading && <div><DotLoader mode={mode}/></div>}
          {!isLoading && (
            <div>
              <button className={(mode === true) ? "submit light" : "submit dark1"} onClick={question.length>0?(`${selectType}` === "text") ? handelSubmit : ImageHandel:null}>
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatGPT