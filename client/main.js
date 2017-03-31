import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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

Meteor.startup(() => {
})

Template.body.onCreated(function bodyOnCreated() {
  varTemplate = new ReactiveVar({template: 'home', text: 'Esgotado'});
});

Template.body.helpers({
  dynTemplate() {
    return varTemplate.get().template;
  }
})
