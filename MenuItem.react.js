var MenuItem = React.createClass({
  onClick: function(event) {
    this.props.callback();
    this.props.onItemSelected();
  },

  render: function() {
    return <li><a href="#" onClick={this.onClick}>{this.props.title}</a></li>
  }
});