// token = 'nulo';
currentCountdown = new ReactiveVar()

Template.home.events({
  'submit'(e) {
    e.preventDefault()
    hours = parseInt(e.target.hours.value ? e.target.hours.value : 0) * 3600
    minutes = parseInt(e.target.minutes.value ? e.target.minutes.value : 0) * 60
    seconds = parseInt(e.target.seconds.value ? e.target.seconds.value : 0)
    text = e.target.timeOver.value
    title = e.target.title.value
    totalTime = hours + minutes + seconds

    varTemplate.set({
      template: 'presenter',
      time: totalTime,
      title: title,
      text: text
    })
  }
  // 'click #newCountdown'() {
  //   token = Random.id([7])
  //   Countdowns.insert({
  //     token: token,
  //     value: parseInt(300),
  //     overText: 'Tempo esgotado!',
  //     timestamp: new Date()
  //   })
  //
  //   currentCountdown.set(token)
  //   console.log(`Token criado: ${currentCountdown.get()}`)
  //
  //   varTemplate.set({template: 'controls', token: token})
  // }
})
