var countdown = new ReactiveCountdown(0)
state = new ReactiveVar('idle')
btnStartText = new ReactiveVar('INICIAR')
timeAtPause = new ReactiveVar()


Template.presenter.onCreated(() => {
  // register = Countdowns.findOne({token: currentCountdown.get()})
  // console.log(register);
  seconds = varTemplate.get().time
  if (seconds < 3600) {
    time = moment().startOf('day').seconds(varTemplate.get().time).format('mm:ss')
  }
  else {
    time = moment().startOf('day').seconds(varTemplate.get().time).format('H:mm:ss')
  }

})

Template.presenter.helpers({
  getCountdown() {
    if (state.get() == 'idle') {
      return time
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

  btnStartText() {
    return btnStartText.get()
  },

  title() {
    return varTemplate.get().title
  }
})

Template.presenter.events({
  'click #start'(e) {
    e.preventDefault()
    if (state.get() == 'idle') {
      btnStartText.set('PAUSAR')
      countdown.start(function() {
        state.set('over')
      });
      countdown.add(varTemplate.get().time)
      state.set('running')
    }
    else if (state.get() == 'running'){
      timeAtPause.set(countdown.get())
      console.log(timeAtPause.get());
      countdown.stop()
      state.set('paused')
      btnStartText.set('CONTINUAR')
    }
    else if (state.get() == 'paused') {
      btnStartText.set('CONTINUAR')
      countdown.start(function() {
        state.set('over')
      });
      countdown.add(timeAtPause.get()-1)
      state.set('running')
      btnStartText.set('PAUSAR')
    }
  },

  'click #reset'() {
    btnStartText.set('INICIAR')
    countdown.stop()
    countdown.add(varTemplate.get().time)
    state.set('idle')
  }
})
