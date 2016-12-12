import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.onCreated(function bodyOnCreated() {
  varTemplate = new ReactiveVar({template: 'home'});
});

Template.body.helpers({
  dynTemplate() {
    return varTemplate.get().template;
  }
})
