var Menubar = React.createClass({
  render: function() {
    return (
      <div>
        <div className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                {
                  this.props.items.map(function(item) {
                  	return <Menu key={item.title} {...item} />
                  }, this)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
});