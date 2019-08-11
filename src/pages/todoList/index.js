import React from 'react';
import '../../index.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Background from '../../assets/bg2.png';
import DataGrid from '../../components/DataGrid';
import { getTodoList } from '../../actions/getTodoListAction';
import { deleteTodoList } from '../../actions/deleteTodoListAction';
import { connect } from 'react-redux';


const styles = () => ({
  button: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#ffffff'
  }
});

var getTodoListVariable = true;

class TodoList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    }

  }

  componentDidMount() {

    this.props.userData ? this.props.getTodoList(this.props.userData.user.id) : this.props.history.push(`/`);
    getTodoListVariable = true;

  }

  handleAddTodoList = () => { this.props.history.push(`/createTodoList`) }

  handleShowTodoItems = () => {

    if (this.state.selectedRow) {
      this.props.history.push({
        pathname: '/todoItem',
        state: {
          todoListId: this.state.selectedRow.id
        }
      });
    } else {
      alert("Select row please!")
    }

  }



  handleDeleteList = () => {

    if (this.state.selectedRow) {
      this.props.deleteTodoList(this.state.selectedRow.id);
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


  render() {

    const { classes } = this.props;
    let { getTodoListData, getTodoListFetched } = this.props;

    if (getTodoListFetched && getTodoListVariable) {
      this.setState({
        ...this.state,
        rows: getTodoListData.todoListList
      })
      getTodoListVariable = false;
    }

    return (
      <div style={{ height: '100vh', backgroundImage: `url(${Background})`, padding: 20 }}>

        <Grid container spacing={4}>

          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <DataGrid
              columns={[
                { name: 'id', title: 'ID' },
                { name: 'name', title: 'Name' },
              ]}
              defaultHiddenColumnNames={['id']}
              activeFilter={false}
              title={"List of Todo List"}
              parent={this}
            />
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={this.handleShowTodoItems}
              className={classes.button}
              fullWidth>
              SHOW TODO ITEMS
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={this.handleAddTodoList}
              className={classes.button}
              fullWidth>
              CREATE LIST
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={this.handleDeleteList}
              className={classes.button}
              fullWidth>
              DELEETE LIST
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
    getTodoListData: state.getTodoListReducer.data,
    getTodoListFetched: state.getTodoListReducer.fetched,
    getTodoListeError: state.getTodoListReducer.error,
  }
};

const mapDispatchToProps = {
  getTodoList,
  deleteTodoList
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TodoList));