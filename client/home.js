// token = 'nulo';
currentCountdown = new ReactiveVar()

Meteor.startup(()=> {
  var welcomeText1 = `
  <p>Você não precisa se cadastrar para utilizar esse utilitário, porém ao fazer isso terá algumas vantagens:</p>
  <ul>
  <li>Cadastro de eventos e personalizar o timer para tal;</li>
  <li>Configuração vários <i>presets</i> de contadores para cada evento;</li>
  <li>Suas configurações ficarão armazenadas e disponíveis para você posteriormente;</li>
  <li>Operação pelo seu smartphone.</li>
  </ul>
  <p><strong>É muito simples fazer seu cadastro, basta utilizar sua conta do Facebook.</strong></p>
  `;

  var welcomeText2 = `
  <p>Você não precisa se cadastrar para utilizar esse utilitário, porém ao fazer isso terá algumas vantagens:</p>
  <ul>
  <li>Cadastro de eventos e personalizar o timer para tal <small>(em breve)</small>;</li>
  <li>Configuração vários <i>presets</i> de contadores;</li>
  <li>Suas configurações ficarão armazenadas e disponíveis para você posteriormente;</li>
  <li>Operação pelo seu smartphone <small>(em breve)</small>.</li>
  </ul>
  <p><strong>É muito simples fazer seu cadastro, basta utilizar sua conta do Facebook.</strong></p>
  `;

  swal({
    title: 'Bem-vindo ao SMARTIUMtimer',
    html: welcomeText2,
    width: '50%',
    confirmButtonText: 'ok, entendi!',
    position: 'left',
    grow: 'fullscreen'
  });
})

Template.home.onRendered(()=> {
  if (parseInt(varTemplate.get().time) > 0) {
    console.log(varTemplate.get().time);
  }
})

Template.home.helpers({
  timerData() {
    return {
      hours: varTemplate.get().hours/3600,
      minutes: varTemplate.get().minutes/60,
      seconds: parseInt(varTemplate.get().seconds),
      title: varTemplate.get().title,
      text: varTemplate.get().text
    }
  },

  counters() {
    return Counters.find({userId: Meteor.userId()}, {sort: {'data.time': 1}})
  }
})

Template.home.events({
  'click .preset-button .remove'(e) {
    e.preventDefault();
    Meteor.call('counter.remove', this._id);
  },

  'click .preset-button .info'(e) {
    e.preventDefault();
    // Meteor.call('counter.get', this._id, (error, result)=> {
    //   theCounter = result.data;
    // });

    varTemplate.set(Counters.findOne(this._id).data);

    console.log(varTemplate.get());

    BlazeLayout.render("mainLayout", {content: "presenter"});
  },

  'submit #create-counter'(e) {
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
      text: text,
      hours: hours,
      minutes: minutes,
      seconds: parseInt(seconds)
    });

    if (Meteor.user()) {
      Meteor.call('counter.add', varTemplate.get());
    }

    BlazeLayout.render("mainLayout", {content: "presenter"});
  },

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
