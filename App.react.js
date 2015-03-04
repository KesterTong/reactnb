var App = React.createClass({
  getInitialState: function() {
    return {
      cells: { 100: {}, },
      cellOrder: [100],
      selectedId: 100,
      mode: 'command',
      kernel: new Kernel()
    }
  },

  setSelected: function(id) {
    this.setState({selectedId: id});
  },

  updateMode: function(mode) {
    this.setState({mode: mode});
  },

  insertCellAbove: function() {
    var newCellId = Math.round(Math.random() * 1000000);
    var newCell = {};

    newCells = this.state.cells;
    newCells[newCellId] = newCell;
    newCellOrder = [];
    for (var i = 0; i < this.state.cellOrder.length; i++) {
      if (this.state.cellOrder[i] == this.state.selectedId) {
        newCellOrder.push(newCellId);
      }
      newCellOrder.push(this.state.cellOrder[i]);
    }
    this.setState({cells: newCells, cellOrder: newCellOrder, selectedId: newCellId});
  },

  insertCellBelow: function() {
    var newCellId = Math.round(Math.random() * 1000000);
    var newCell = {};

    newCells = this.state.cells;
    newCells[newCellId] = newCell;
    newCellOrder = [];
    for (var i = 0; i < this.state.cellOrder.length; i++) {
      newCellOrder.push(this.state.cellOrder[i]);
      if (this.state.cellOrder[i] == this.state.selectedId) {
        newCellOrder.push(newCellId);
      }
    }
    this.setState({cells: newCells, cellOrder: newCellOrder, selectedId: newCellId});
  },

  deleteCell: function() {
    var newCells = this.state.cells;
    delete newCells[this.state.selectedId];

    var newCellOrder = []
    var newSelectedId;
    for (var i = 0; i < this.state.cellOrder.length; i++) {
      if (this.state.cellOrder[i] == this.state.selectedId) {
        if (i == 0) {
          newSelectedId = this.state.cellOrder[i + 1];
        } else {
          newSelectedId = this.state.cellOrder[i - 1];
        }
      } else {
        newCellOrder.push(this.state.cellOrder[i]);
      }
    }
    this.setState({cells: newCells, cellOrder: newCellOrder, selectedId: newSelectedId});
  },

  runCell: function(cellId, code) {
    this.state.kernel.execute(code, function(result) {
      var newCells = this.state.cells;
      newCells[cellId].inputPromptNumber = result.execution_count;
      newCells[cellId].outputContent = result.data;
      this.setState({cells: newCells});
    }.bind(this));
  },

  menu: function() {
    return [{
              title: 'Edit',
              items:
              [{
                title: 'Delete Cell',
                callback: this.deleteCell
              }]
            },
            {
              title: 'Insert',
              items:
              [{
                title: 'Insert Cell Above',
                callback: this.insertCellAbove
              },
              {
                title: 'Insert Cell Below',
                callback: this.insertCellBelow
              }]
            }];
  },

  render: function() {
    var mode_class = 'notebook_app ' + this.state.mode + '_mode';
    return (
      <div className={mode_class}>
        <div id="header" style={{display: 'block'}}>
          <div id="header-container" className="container">
            <div id="ipython_notebook" className="nav navbar-brand pull-left"><a href="#" title="dashboard"><img src="./logo.png" alt="Jupyter Notebook"/></a></div>
          </div>
          <div id="menubar-container" className="container">
            <Menubar items={ this.menu() } />
          </div>
        </div>
        <Notebook {...this.state} setSelected={this.setSelected} updateMode={this.updateMode} runCell={this.runCell} />
      </div>
    )
  }
});