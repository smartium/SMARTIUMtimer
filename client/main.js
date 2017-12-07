import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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
