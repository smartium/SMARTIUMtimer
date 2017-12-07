ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '356485938037380',
    secret: '503be0bc78df40b49105b4f878687a90'
});

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    //want the users facebook pic and it is not provided by the facebook.service
    options.profile.picture = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    data = user.services.facebook;
    user.profile = options.profile;
  }
  return user;
});
