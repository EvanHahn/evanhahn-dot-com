var games = require('./full_character_data.json');

console.log('Game,Release,Male,Female,Androgenous,Choose,Total');

Object.keys(games).forEach(function(gameName) {
  var game = games[gameName];
  console.log([
    gameName,
    game['Release Year'],
    game['Male'].length,
    game['Female'].length,
    game['Androgenous'].length,
    game['Choose'].length,
    game.Male.length + game.Female.length +
      game.Androgenous.length + game.Choose.length
  ].join(','));
});
