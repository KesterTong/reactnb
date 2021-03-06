var CodeCell = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },

  propTypes: {
    inputPromptNumber: React.PropTypes.number,
    selected: React.PropTypes.bool
  },

  handleClick: function(event) {
    this.props.updateMode('command');
    this.props.setSelected(this.props.id);
  },

  handleCodeMirrorClick: function(event) {
    this.props.updateMode('edit');
    this.props.setSelected(this.props.id);
    event.stopPropagation();
  },

  run: function(code) {
    this.props.runCell(this.props.id, code);
  },

  render: function() {
    var input_prompt = this.props.inputPromptNumber === undefined ? ' ' : String(this.props.inputPromptNumber);
    var cell_class = 'cell code_cell rendered';
    if (this.props.selected) {
      cell_class = cell_class + ' selected';
    }
    return (
      <div className={cell_class} tabIndex="2" onClick={this.handleClick} >
        <div className="input">
          <div className="prompt input_prompt">In&nbsp;[{input_prompt}]:</div>
          <div className="inner_cell">
            <div className="input_area" onClick={this.handleCodeMirrorClick}>
              <div className="CodeMirror cm-s-ipython">
                <CodeMirrorEditor onShiftEnter={this.run} />
              </div>
            </div>
          </div>
        </div>
        <OutputArea content={this.props.outputContent} />
      </div>
    )
  }
});