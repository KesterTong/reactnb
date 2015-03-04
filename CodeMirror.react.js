var CodeMirrorEditor = React.createClass({
  componentDidMount: function() {
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {mode: 'python'});
  },

  render: function() {
    return <textarea ref='editor'/>;
  }
});