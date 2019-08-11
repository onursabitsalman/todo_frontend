import React from 'react';
import '../../index.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Background from '../../assets/bg2.png';
import { createTodoItem } from '../../actions/createTodoItemAction';
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
    },
    textField: {
        marginTop: 15,
        marginBottom: 10,
    }
});


var getCreateTodoItemVariable = false;

class CreateTodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            deadline: '',

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
        if (this.state.name === '' || this.state.name == null ||
            this.state.description === '' || this.state.description == null ||
            this.state.deadline === '' || this.state.deadline == null) {
            alert("There is a field error!");
            return false;
        }

        return true;
    }

    handleCreateTodoItem = () => {
        if (this.checkFields()) {
            this.props.createTodoItem(this.props.location.state.todoListId, this.state.name, this.state.description, this.state.deadline + "T12:00-06:00", this.props.location.state.dependedItemId);
            getCreateTodoItemVariable = true;
        }
    };


    render() {

        const { classes } = this.props;
        let { data, fetched, error } = this.props;

        console.log(this.state);


        return (
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex-center" style={{ height: '100vh', backgroundImage: `url(${Background})` }}>

                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ padding: "20px", color: '#ffffff', fontSize: 40 }} align="center">
                                    <b>Create Todo Item</b>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent style={{ padding: "50px", width: "500px" }}>

                                        <TextField
                                            id="outlined-name"
                                            name="name"
                                            label="Item Name"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            fullWidth
                                        />

                                        <TextField
                                            id="outlined-name"
                                            name="description"
                                            label="Description"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            fullWidth
                                        />


                                        {this.props.location.state.dependedItemId &&
                                            <TextField
                                                id="outlined-name"
                                                name="dependedItemId"
                                                label="Dependent Item Id"
                                                margin="normal"
                                                variant="outlined"
                                                value={this.props.location.state.dependedItemId}
                                                onChange={this.handleChange}
                                                fullWidth
                                                disabled
                                            />}

                                        <TextField
                                            id="date"
                                            name="deadline"
                                            label="Deadline"
                                            variant="outlined"
                                            type="date"
                                            value={this.state.deadline}
                                            onChange={this.handleChange}
                                            className={classes.textField}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />


                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleCreateTodoItem}
                                            className={classes.button}
                                            fullWidth>
                                            CREATE ITEM
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
        data: state.createTodoItemReducer.data,
        fetched: state.createTodoItemReducer.fetched,
        error: state.createTodoItemReducer.error,
    }
};

const mapDispatchToProps = {
    createTodoItem
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTodoItem));