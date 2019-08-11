import React from 'react';
import '../../index.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Background from '../../assets/bg2.png';
import DataGrid from '../../components/DataGrid';
import { getTodoItem } from '../../actions/getTodoItemAction';
import { deleteTodoItem } from '../../actions/deleteTodoItemAction';
import { completeTodoItem } from '../../actions/completeTodoItemAction';
import { connect } from 'react-redux';


const styles = () => ({
    button: {
        marginTop: 10,
        height: 50,
        backgroundColor: '#ffffff'
    }
});

var getTodoItemVariable = true;

class TodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: [],
        }

    }

    componentDidMount() {

        this.props.userData && this.props.location.state.todoListId ? this.props.getTodoItem(this.props.location.state.todoListId) : this.props.history.push(`/`);
        getTodoItemVariable = true;
    }

    handleBackToList = () => { this.props.history.push(`/todoList`) }

    handleDeleteItem = () => {

        if (this.state.selectedRow) {
            this.props.deleteTodoItem(this.state.selectedRow.id);
            for (let index = 0; index < this.state.rows.length; index++) {
                if (this.state.rows[index].id === this.state.selectedRow.id) {
                    var selectedRow = this.state.selectedRow;
                    var newRows = this.state.rows.filter(function (el) { return el !== selectedRow });

                    this.setState({
                        ...this.state,
                        rows: newRows,
                        selectedRow: null,
                        selection: []
                    })

                    break;
                }
            }
        } else {
            alert("Select row please!")
        }

    }

    handleCompleteTodoItems = () => {
        if (this.state.selectedRow && this.state.selectedRow.status !== "Complete") {
            if (this.state.selectedRow.dependentItemId) {
                for (let index = 0; index < this.state.rows.length; index++) {
                    if (this.state.rows[index].id === this.state.selectedRow.dependentItemId) {
                        if (this.state.rows[index].status === "Complete") {

                            this.props.completeTodoItem(this.state.selectedRow.id, this.state.selectedRow.status);
                            var tempSelectedRow = this.state.selectedRow;
                            tempSelectedRow.status = "Complete";
                            for (let index = 0; index < this.state.rows.length; index++) {
                                if (this.state.rows[index].id === this.state.selectedRow.id) {
                                    var selectedRow = this.state.selectedRow;
                                    var newRows = this.state.rows.filter(function (el) { return el !== selectedRow });
                                    newRows.push(tempSelectedRow);

                                    this.setState({
                                        ...this.state,
                                        rows: newRows,
                                        selectedRow: null,
                                        selection: []
                                    })

                                    break;
                                }
                            }
                        } else {
                            alert("Dependent item is not completed!")
                        }
                        break;
                    }
                }
            } else {
                this.props.completeTodoItem(this.state.selectedRow.id, this.state.selectedRow.status);
                var tempSelectedRow = this.state.selectedRow;
                tempSelectedRow.status = "Complete";
                for (let index = 0; index < this.state.rows.length; index++) {
                    if (this.state.rows[index].id === this.state.selectedRow.id) {
                        var selectedRow = this.state.selectedRow;
                        var newRows = this.state.rows.filter(function (el) { return el !== selectedRow });
                        newRows.push(tempSelectedRow);

                        this.setState({
                            ...this.state,
                            rows: newRows,
                            selectedRow: null,
                            selection: []
                        })

                        break;
                    }
                }
            }

        } else {
            alert("Please select not finished item.")
        }
    }

    handleAddTodoItem = () => {

    this.props.history.push({
        pathname: '/createTodoItem',
        state: {
          todoListId: this.props.location.state.todoListId,
          dependedItemId: this.state.selectedRow ? this.state.selectedRow.id : null
        }
      });
    }


    render() {

        const { classes } = this.props;
        let { getTodoItemData, getTodoItemFetched } = this.props;

        if (getTodoItemFetched && getTodoItemVariable) {

            for (let index = 0; index < getTodoItemData.todoItemList.length; index++) {
                getTodoItemData.todoItemList[index].deadline = getTodoItemData.todoItemList[index].deadline.split("T")[0];
                
                
            }

            this.setState({
                ...this.state,
                rows: getTodoItemData.todoItemList
            })
            getTodoItemVariable = false;
        }


        return (
            <div style={{ height: '100vh', backgroundImage: `url(${Background})`, padding: 20 }}>
                <Grid container spacing={4}>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <DataGrid
                            columns={[
                                { name: 'id', title: 'ID' },
                                { name: 'name', title: 'Name' },
                                { name: 'description', title: 'Description' },
                                { name: 'deadline', title: 'Deadline' },
                                { name: 'status', title: 'Status' },
                                { name: 'dependentItemId', title: 'Dependent Item' },
                            ]}
                            title={"List of Todo Item"}
                            parent={this}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            onClick={this.handleBackToList}
                            className={classes.button}
                            fullWidth>
                            BACK TO LIST
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            onClick={this.handleCompleteTodoItems}
                            className={classes.button}
                            fullWidth>
                            COMPLETE ITEM
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            onClick={this.handleAddTodoItem}
                            className={classes.button}
                            fullWidth>
                            CREATE ITEM
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            onClick={this.handleDeleteItem}
                            className={classes.button}
                            fullWidth>
                            DELETE ITEM
                        </Button>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.loginReducer.data,
        getTodoItemData: state.getTodoItemReducer.data,
        getTodoItemFetched: state.getTodoItemReducer.fetched,
        getTodoItemError: state.getTodoItemReducer.error,
    }
};

const mapDispatchToProps = {
    getTodoItem,
    deleteTodoItem,
    completeTodoItem
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TodoItem));