import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../App.css';
import { Redirect } from 'react-router-dom';

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.err = '';
  }

  render() {
    const st = this.props;
    if (st.isLogin) {
      return <Redirect to="/"/>;
    }
    if (st.token === 'err') {
      this.err = 'Email hoặc mật khẩu không đúng!!!';
    }

    return (
      <div className="loginLayout">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <center>
              <Avatar className="avatar">
                <LockOutlinedIcon className="LockOutlinedIcon" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </center>
            <form className="form" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={event => {
                  this.email = event.target.value;
                }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={event => {
                  this.password = event.target.value;
                }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                className="Remember"
              />
              <div className="Error">{this.err}</div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={event => {
                  event.preventDefault();
                  st.Login(this.email, this.password);
                }}
              >
                Sign In
              </Button>
              <Grid className="footer-login" container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
