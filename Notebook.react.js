var Notebook = React.createClass({
  render: function() {
    return (
      <div style={{display: 'block'}}>
        <div id="notebook" tabIndex="-1">
          <div className="container" id="notebook-container">
            {
              this.props.cells.map(function(cell) {
                return <CodeCell inputPromptNumber={cell.inputPromptNumber} key={cell.id} id={cell.id} selected={cell.id == this.props.selectedId} updateMode={this.props.updateMode} setSelected={this.props.setSelected} />;
              }, this)
            }
          </div>
          <div className="end_space"></div>
        </div>
      </div>
    )
  }
});
