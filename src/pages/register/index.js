import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/registerAction';
import { Redirect } from 'react-router';
import '../../index.css';
import CustomizedSnackbars from '../../components/ErrorMessage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Background from '../../assets/bg2.png';

const styles = theme => ({
  button: {
    marginTop: 10,
    height: 50
  }

});

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rePassword: ''
    }
  }

  checkFields = () => {
    if (this.state.username === '' || this.state.username == null ||
      this.state.password === '' || this.state.password == null ||
      this.state.rePassword === '' || this.state.rePassword == null ||
      this.state.password !== this.state.rePassword) {
      alert("There is a field error!");
      return false;
    }

    return true;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = () => {
    this.checkFields() && this.props.register(this.state)
  };

  render() {

    const { classes } = this.props;
    let { data, fetched, error } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <div className="flex-center" style={{ height: '100vh', backgroundImage: `url(${Background})` }}>

            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5" style={{ padding: "20px", color: '#ffffff', fontSize: 40 }} align="center">
                  <b>REGISTER</b>
                </Typography>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent style={{ padding: "50px", width: "500px" }}>

                    <TextField
                      id="outlined-name"
                      name="username"
                      label="Username"
                      margin="normal"
                      variant="outlined"
                      value={this.props.username}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      id="outlined-password-input"
                      name="password"
                      label="Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      value={this.props.password}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      id="outlined-re-password-input"
                      name="rePassword"
                      label="Confirm Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      value={this.props.rePassword}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleRegister}
                      className={classes.button}
                      fullWidth>
                      REGISTER
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => { this.props.history.push(`/`) }}
                      className={classes.button}
                      fullWidth>
                      DO YOU ALREADY HAVE AN ACCOUNT?
                    </Button>

                    {fetched && error && <CustomizedSnackbars message={error} />}
                    {fetched && data && <Redirect to={`/`} />}

                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.registerReducer.data,
    fetched: state.registerReducer.fetched,
    error: state.registerReducer.error
  }
};

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));