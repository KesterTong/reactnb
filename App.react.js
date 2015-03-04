var App = React.createClass({
  getInitialState: function() {
    return {
      cells: [{inputPromptNumber: 1, id: 100}, {inputPromptNumber:100, id: 101}],
      selectedId: 100,
      mode: 'command'
    }
  },

  setSelected: function(id) {
    this.setState({selectedId: id});
  },

  updateMode: function(mode) {
    this.setState({mode: mode});
  },

  insertCellAbove: function() {
    newCells = [];
    var newCellId = Math.round(Math.random() * 1000000);
    for (var i = 0; i < this.state.cells.length; i++) {
      if (this.state.cells[i].id == this.state.selectedId) {
        newCells.push({id: newCellId});
      }
      newCells.push(this.state.cells[i]);
    }
    this.setState({cells: newCells, selectedId: newCellId});
  },

  insertCellBelow: function() {
    newCells = [];
    var newCellId = Math.round(Math.random() * 1000000);
    for (var i = 0; i < this.state.cells.length; i++) {
      newCells.push(this.state.cells[i]);
      if (this.state.cells[i].id == this.state.selectedId) {
        newCells.push({id: newCellId});
      }
    }
    this.setState({cells: newCells, selectedId: newCellId});
  },

  deleteCell: function() {
    newCells = [];
    var newKey = Math.round(Math.random() * 1000000);
    var newSelectedId;
    for (var i = 0; i < this.state.cells.length; i++) {
      if (this.state.cells[i].id == this.state.selectedId) {
        if (i == 0) {
          newSelectedId = this.state.cells[i + 1].id;
        } else {
          newSelectedId = this.state.cells[i - 1].id;
        }
      } else {
        newCells.push(this.state.cells[i]);        
      }
    }
    this.setState({cells: newCells, selectedId: newSelectedId});
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
        <Notebook {...this.state} setSelected={this.setSelected} updateMode={this.updateMode} />
      </div>
    )
  }
});