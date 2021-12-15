const Tournament = require('./tg');

// console.log(new Tournament().matches)

test('team generation', () => {
  expect(new Tournament().teams).toEqual(['Team 1', 'Team 2']);
  expect(new Tournament(2).teams).toEqual(['Team 1', 'Team 2']);
  expect(new Tournament(0).teams).toEqual([]);
  expect(new Tournament(4).teams).toEqual(['Team 1', 'Team 2', 'Team 3', 'Team 4']);
  expect(new Tournament(4).teams).toEqual(['Team 1', 'Team 2', 'Team 3', 'Team 4']);
});
