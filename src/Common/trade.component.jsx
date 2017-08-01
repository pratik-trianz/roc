import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
//import { Toolbar, Selectors } from 'react-data-grid-addons';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');


// Custom Formatter component
const RuleFormatter = React.createClass({

  render() {
    const val = this.props.value;
    return (
      <div className="rule-match">
        {val}
      </div>);
  }
});

class Trade extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      _columns:  [{
        key: 'id',
        name: 'Loan ID',
        width: 80,
        filterable: true,
        sortable: true
      },
      {
        key: 'borrowerName',
        name: 'Borrower Name',
        filterable: true,
        sortable: true
      },
      {
        key: 'draws',
        name: 'Draws',
        filterable: true,
        sortable: true
      },
      {
        key: 'amount',
        name: 'Amount',
        filterable: true,
        sortable: true
      },
      {
        key: 'renoBudget',
        name: 'Reno Budget',
        filterable: true,
        sortable: true
      },
      {
        key: 'term',
        name: 'Term',
        filterable: true,
        sortable: true
      },
      {
        key: 'interest',
        name: 'Interest Rate',
        filterable: true,
        sortable: true
      },
      {
        key: 'notes',
        name: 'Notes',
        filterable: true,
        sortable: true
      },
      {
        key: 'ruleMatch',
        name: 'Rule Match',
        filterable: true,
        sortable: true,
        formatter: RuleFormatter
      } ],
      filters: {},
      rows : this.createRows()
    }
  }
  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  }
  createRows = () => {
    // let rows = [];
    axios
     .get('data.json')
     .then(({ data })=> {
       this.setState({
         rows: data
       });
     })
     .catch((err)=> {console.log(err);})
    // for (let i = 1; i < 1000; i++) {
    //   rows.push({
    //     id: i,
    //     borrowerName: 'Anonymous' + i,
    //     draws: Math.min(5, Math.round(Math.random() * 110)),
    //     amount: '$' + Math.round(100000 + Math.random() * 100) / 100 ,
    //     renoBudget: '$' + Math.round(100000 + Math.random() * 100) / 100,
    //     term: 2 + i + 'Years',
    //     interest: 1 + i + '%',
    //     notes: ' ',
    //     ruleMatch: '12/12'
    //   });
    // }
    //
    // return rows;
  }
  getRows = () => {
     return Selectors.getRows(this.state);
   }
  getSize = () => {
    console.log(this.getRows());
    return this.getRows().length;
  }
  rowGetter = (rowIdx) => {
    let rows = this.getRows();
    return rows[rowIdx];
  }

  handleFilterChange = (filter) => {
   let newFilters = Object.assign({}, this.state.filters);
   if (filter.filterTerm) {
     newFilters[filter.column.key] = filter;
   } else {
     delete newFilters[filter.column.key];
   }
   this.setState({ filters: newFilters });
 }

 handleGridSort = (sortColumn, sortDirection) => {
     const comparer = (a, b) => {
       if (sortDirection === 'ASC') {
         return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
       } else if (sortDirection === 'DESC') {
         return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
       }
     };

     const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

     this.setState({ rows });
   }

 onClearFilters =() => {
   // all filters removed
   this.setState({filters: {} });
 }

  render(){
    const { _columns } = this.state
    return (
      <div className="container">
        <div className="trade-title"><h3>LOANS AVAILABLE TO BUY</h3></div>
        <br/>
        <ReactDataGrid
          columns={_columns}
          rowGetter={this.rowGetter}
          enableCellSelect={true}
          onGridSort={this.handleGridSort}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<Toolbar enableFilter={true}/>}
          enableRowSelect={true}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters} />
      </div>);
    }
  }

export default Trade
