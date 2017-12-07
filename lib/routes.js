FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "home"});
  }
});

FlowRouter.route('/controller', {
  action: function() {
    BlazeLayout.render("controls");
  }
});

FlowRouter.route( '/login', {
  action: function() {
    BlazeLayout.render( 'mainLayout', { content: 'login' } );
  },
  name: 'Facebook Login'
});
