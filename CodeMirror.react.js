var CodeMirrorEditor = React.createClass({
  componentDidMount: function() {
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {mode: 'python'});
    this.editor.on('keydown', this.handleKeyDownEvent);
  },

  handleKeyDownEvent: function(editor, event) {
    if (event.keyCode == 13 && event.shiftKey == true) {
      this.props.onShiftEnter(this.editor.getValue());
      return true;
    }
    return false;
  },

  render: function() {
    return <textarea ref='editor'/>;
  }
});