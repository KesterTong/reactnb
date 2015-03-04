
var Menu = React.createClass({
  getInitialState: function() {
    return {
      open: false
    }
  },

  onClick: function(e) {
    this.setState({open: !this.state.open});
  },

  onBlur: function(e) {
    setTimeout(function() { 
     if (!this.getDOMNode().contains(document.activeElement) && this.state.open) {
        this.closeMenu();
      }
    }.bind(this), 1);
  },

  closeMenu: function() {
    this.setState({open: false});
  },

  render: function() {
    return (
      <li className={'dropdown' + (this.state.open ? ' open' : '')}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.onClick} onBlur={this.onBlur}>
          {this.props.title}
        </a>
        <ul className="dropdown-menu">
        {
          this.props.items.map(function(item) {
            return <MenuItem onItemSelected={this.closeMenu} key={item.title} {...item}/>
          }, this)
        }
        </ul>
      </li>
    )
  }
});