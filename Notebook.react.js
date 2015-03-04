var Notebook = React.createClass({
  render: function() {
    return (
      <div style={{display: 'block'}}>
        <div id="notebook" tabIndex="-1">
          <div className="container" id="notebook-container">
            {
              this.props.cellOrder.map(function(id) {
                var cell = this.props.cells[id];
                return <CodeCell {...cell} id={id} key={id} selected={id == this.props.selectedId} {...this.props} />;
              }, this)
            }
          </div>
          <div className="end_space"></div>
        </div>
      </div>
    )
  }
});
