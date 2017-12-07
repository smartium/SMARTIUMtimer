Meteor.methods({
  'counter.get'(id) {
    console.log(Counters.findOne(id));
    return Counters.findOne(id);
  },

  'counter.add'(data) {
    Counters.insert({
      userId: Meteor.userId(),
      data: data,
      createdAt: new Date()
    });
  },

  'counter.remove'(id) {
    Counters.remove(id);
    BlazeLayout.render("mainLayout", {content: "home"});
  }
});
