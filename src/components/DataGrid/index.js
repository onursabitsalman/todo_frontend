import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableSelection,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';

import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SelectionState,
} from '@devexpress/dx-react-grid';

class DataGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageSizes: [5, 10, 15, 0]
    }

  }

  static defaultProps = {
    columns: [{ name: 'noColumn', title: 'NO COLUMN' }],
    defaultHiddenColumnNames: [],
    activeFilter: true,
    title: ''
  };

  static propTypes = {
    columns: PropTypes.array,
    defaultHiddenColumnNames: PropTypes.array,
    activeFilter: PropTypes.bool,
    title: PropTypes.string
  };

  changeSelection = selection => {
    var singleSelect = [];
    singleSelect.push(selection[selection.length - 1]);

    this.props.parent.setState({
      ...this.props.parent.state,
      selectedRow: this.props.parent.state.rows[selection[selection.length - 1]],
      selection: singleSelect
    })
  }

  render() {

    return (
      <div>
      <Typography variant="h5" style={{ paddingBottom: "20px", paddingTop: "20px", color: '#ffffff', fontSize: 40 }}>
          <b>{this.props.title}</b>
      </Typography>
      <Paper>
                
        <Grid
          rows={this.props.parent.state.rows}
          columns={this.props.columns}>

          <SortingState defaultSorting={[]} />
          <PagingState defaultCurrentPage={0} defaultPageSize={5} />
          <FilteringState defaultFilters={[]} />
          <SelectionState selection={this.props.parent.state.selection} onSelectionChange={this.changeSelection} />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedFiltering />

          <Table />
          <TableHeaderRow showSortingControls />
          <TableColumnVisibility defaultHiddenColumnNames={this.props.defaultHiddenColumnNames} />
          {this.props.activeFilter && <TableFilterRow />}
          <TableSelection />
          <PagingPanel pageSizes={this.state.pageSizes} />
        </Grid>
      </Paper>
      </div>
    )
  }
}


export default DataGrid;