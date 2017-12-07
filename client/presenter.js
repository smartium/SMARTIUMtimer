countdown = new ReactiveCountdown(0)
time = new ReactiveVar();
state = new ReactiveVar('idle')
btnStartText = new ReactiveVar('<i class="fa fa-play fa-2x"></i>')
timeAtPause = new ReactiveVar()
countdownClass = new ReactiveVar('')


Template.presenter.onCreated(() => {
  seconds = varTemplate.get().time
  if (seconds < 3600) {
    time.set(moment().startOf('day').seconds(varTemplate.get().time).format('mm:ss'));
  }
  else {
    time.set(moment().startOf('day').seconds(varTemplate.get().time).format('H:mm:ss'))
  }

})

Template.presenter.helpers({
  getCountdown() {
    if (state.get() == 'idle') {
      return time.get();
    }
    else if (state.get() == 'running' || state.get() == 'paused') {
      if (seconds < 3600) {
        return moment().startOf('day').seconds(countdown.get()).format('mm:ss')
      }
      else {
        return moment().startOf('day').seconds(countdown.get()).format('H:mm:ss')
      }
    }
    else if (state.get() == 'over') {
      return varTemplate.get().text
    }
  },

  counters() {
    return Counters.find({userId: Meteor.userId()}, {sort: {'data.time': 1}})
  },

  btnStartText() {
    return btnStartText.get()
  },

  title() {
    return varTemplate.get().title
  },

  countdownClass() {
    return countdownClass.get();
  }
})

Template.presenter.events({
  'click #start'(e) {
    e.preventDefault()
    if (state.get() == 'idle') {
      btnStartText.set('<i class="fa fa-pause fa-2x"></i>')
      countdown.start(function() {
        countdownClass.set('infinite over');
        state.set('over')
      });
      countdown.add(varTemplate.get().time)
      countdownClass.set('');
      state.set('running')
    }
    else if (state.get() == 'running'){
      timeAtPause.set(countdown.get())
      console.log(timeAtPause.get());
      countdown.stop()
      countdownClass.set('');
      state.set('paused')
      btnStartText.set('<i class="fa fa-play fa-2x"></i>')
    }
    else if (state.get() == 'paused') {
      btnStartText.set('<i class="fa fa-pause fa-2x"></i>')
      countdownClass.set('');
      countdown.start(function() {
        state.set('over')
      });
      countdown.add(timeAtPause.get()-1)
      state.set('running')
    }
  },

  'click #reset'() {
    btnStartText.set('<i class="fa fa-play fa-2x"></i>')
    countdown.stop()
    countdown.add(varTemplate.get().time)
    countdownClass.set('');
    state.set('idle')
  },

  'click #config'() {
    btnStartText.set('<i class="fa fa-play fa-2x"></i>')
    countdown.stop()
    countdown.add(varTemplate.get().time)
    countdownClass.set('');
    state.set('idle')

    BlazeLayout.render("mainLayout", {content: "home"});

    varTemplate.set({
      template: 'home',
      time: totalTime,
      title: varTemplate.get().title,
      text: varTemplate.get().text,
      hours: varTemplate.get().hours,
      minutes: varTemplate.get().minutes,
      seconds: varTemplate.get().seconds
    });
  },

  'click .preset-button'(e) {
    e.preventDefault();



    varTemplate.set({
      template: this.data.template,
      time: this.data.time,
      title: this.data.title,
      text: this.data.text,
      hours: this.data.hours,
      minutes: this.data.minutes,
      seconds: this.data.seconds
    });

    seconds = varTemplate.get().time
    if (seconds < 3600) {
      time.set(moment().startOf('day').seconds(varTemplate.get().time).format('mm:ss'))
    }
    else {
      time.set(moment().startOf('day').seconds(varTemplate.get().time).format('H:mm:ss'))
    }
  }
})
