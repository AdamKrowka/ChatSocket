import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  FormControl,
  Grid
} from "@material-ui/core";

const LoginContainer = ({ handleLogin, handleLoginSend, handlePassword, logInputEmpty }) => {
  const handleSubmit = e => {
    if (e.key === "Enter") handleLoginSend();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardHeader className="LoginContainer" title="CHAT WITH FRENDS" />
          <CardContent className="LoginCardContent">
            <FormControl>
              <TextField
                error={logInputEmpty.logError}
                id="standard-basic"
                onKeyPress={handleSubmit}
                onChange={handleLogin}
                label="Login"
              />
              <TextField
                type="password"
                error={logInputEmpty.passError}
                className="PasswordInput"
                id="standard-basic"
                onChange={handlePassword}
                label="Password"
                onKeyPress={handleSubmit}
              />
              <Button className="LoginButton" onClick={handleLoginSend}>
                Login
              </Button>
            </FormControl>
            <Button className="LoginButton" onClick={handleLoginSend}>
              Register now
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginContainer;
