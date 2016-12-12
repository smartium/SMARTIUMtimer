var countdown = new ReactiveCountdown(12);

Template.timer.helpers({
  getCountdown(){
    timerInSeconds = countdown.get()
    return moment().startOf('day').seconds(timerInSeconds).format('mm:ss');
  },

  token() {
    return Random.id([7])
  }
})

Template.timer.events({
  'click #timerStart'() {
    countdown.start(function() {
      // do something when this is completed
    });
  }
})
