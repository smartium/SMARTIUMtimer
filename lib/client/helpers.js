Template.registerHelper( 'hr', ( int ) => {
  int = int/3600;
  return int>0 ? int<10 ? `0${int}:` : `${int}:` : '';
});

Template.registerHelper( 'min', ( int ) => {
  int = int/60;
  return int<10 ? `0${int}` : int;
});

Template.registerHelper( 'sec', ( int ) => {
  return int<10 ? `0${int}` : int;
});
