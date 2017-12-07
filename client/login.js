Template.login.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }
      else {
        swal({
          title: 'Show de bola, você está logado!',
          text: 'Para sair, só clicar na sua foto, ok?.',
          timer: 5000,
          onOpen: () => {
            swal.showLoading()
          }
        }).then((result) => {
          if (result.dismiss === 'timer') {
            console.log('I was closed by the timer')
          }
        });
        BlazeLayout.render("mainLayout", {content: "home"});
      }
    });
  },

  'click #logout': function(event) {
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Logout failed");
      }
      else {
        swal({
          title: 'Até mais!',
          text: 'Esperamos que essa ferramenta tenha sido útil.',
          timer: 5000,
          onOpen: () => {
            swal.showLoading()
          }
        }).then((result) => {
          if (result.dismiss === 'timer') {
            console.log('I was closed by the timer')
          }
        });

        BlazeLayout.render("home");
      }
    })
  }
});
