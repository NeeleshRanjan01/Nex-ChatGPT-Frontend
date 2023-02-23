import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatGPT from "./Components/ChatGPT/ChatGPT";
import Home from "./Components/Home/Home";
import Login from "./Components/Registration/Login";
import Registration from "./Components/Registration/Registration";

function App() {

  const [alter, setAlter] = useState(false)

  return (
    <div>
      {
        (!localStorage.getItem("token")) ?
          <BrowserRouter>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Login setAlter={setAlter} alter={alter} />} path="/login" />
              <Route element={<Registration />} path="/registration" />
            </Routes>
          </BrowserRouter> :
          <ChatGPT setAlter={setAlter} alter={alter} />
      }
    </div>
  );
}

export default App;
