import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Container, Button } from "@material-ui/core";
import "./App.css";

import LoginContainer from "./components/LoginContainer";

function App() {
  const [endpoint, setEndpoint] = useState("localhost:3001");
  const [socket, setSocket] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [logged, setLogged] = useState(false);
  const [logInputEmpty, setLogInputEmpty] = useState({ logError: false, passError: false });

  useEffect(() => {
    setSocket(socketIOClient(endpoint));
  }, []);
  useEffect(() => {
    if (socket !== null) {
      // Starting socket actions
      socket.on("loginSuckcesfully", data => {
        setLogged(true);
        setData(data);
        console.log(data);
      });

      socket.on("loginRejected", data => {
        console.log(data);
        setData(data);
      });
    }
  }, [socket]);

  const handleLoginSend = () => {
    if (login !== "" && password !== "") socket.emit("loginRequest", { login, password });
    else if (login === "" && password !== "")
      setLogInputEmpty({ logError: true, passError: logInputEmpty.passError });
    else if (login !== "" && password === "")
      setLogInputEmpty({ logError: logInputEmpty.logError, passError: true });
    else if (login === "" && password === "") setLogInputEmpty({ logError: true, passError: true });
  };
  const handleLogin = e => {
    setLogin(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogOut = e => {
    setLogged(false);
    setData(null);
    setPassword(null);
    setLogin(null);
  };

  return (
    <>
      {!logged ? (
        <Container className="AppContainer" maxWidth="sm">
          <LoginContainer
            handleLoginSend={handleLoginSend}
            handleLogin={handleLogin}
            handlePassword={handlePassword}
            logInputEmpty={logInputEmpty}
          ></LoginContainer>
        </Container>
      ) : (
        <Container className="AppContainer" maxWidth="sm">
          <div>{`Hello ${data ? data.name : "hello"}`}</div>
          <div></div>
          <Button className="LoginButton" onClick={handleLogOut}>
            LogOut
          </Button>
        </Container>
      )}
    </>
  );
}

export default App;
