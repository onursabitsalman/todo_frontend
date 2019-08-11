import React from 'react';
import '../../index.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Background from '../../assets/bg2.png';
import { createTodoList } from '../../actions/createTodoListAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CustomizedSnackbars from '../../components/ErrorMessage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles = () => ({
    button: {
        marginTop: 10,
        height: 50,
    }
});


var getCreateTodoItemVariable = false;

class CreateTodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }

    }

    componentDidMount() {
        this.props.userData ? getCreateTodoItemVariable = false : this.props.history.push(`/`);
    }

    componentWillMount() {
        getCreateTodoItemVariable = false;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    checkFields = () => {
        if (this.state.name === '' || this.state.name == null) {
            alert("There is a field error!");
            return false;
        }

        return true;
    }

    handleCreateTodoList = () => {
        if (this.checkFields()) {
            this.props.createTodoList(this.props.userData.user.id, this.state.name);
            getCreateTodoItemVariable = true;
        }
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
                                    <b>Create Todo List</b>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent style={{ padding: "50px", width: "500px" }}>

                                        <TextField
                                            id="outlined-name"
                                            name="name"
                                            label="List Name"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            fullWidth
                                        />

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleCreateTodoList}
                                            className={classes.button}
                                            fullWidth>
                                            CREATE LIST
                                        </Button>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => { this.props.history.push(`/todoList`) }}
                                            className={classes.button}
                                            fullWidth>
                                            BACK TO LIST
                                        </Button>

                                        {getCreateTodoItemVariable && fetched && error && <CustomizedSnackbars message={error} />}
                                        {getCreateTodoItemVariable && fetched && data && <Redirect to={`/todoList`} />}

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
        userData: state.loginReducer.data,
        data: state.createTodoListReducer.data,
        fetched: state.createTodoListReducer.fetched,
        error: state.createTodoListReducer.error,
    }
};

const mapDispatchToProps = {
    createTodoList
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTodoList));