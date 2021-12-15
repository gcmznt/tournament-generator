var tg = require('./src/tg');

var t = 4;

var teams = tg.generateTeams(t);
var matches = tg.generateMatches(t);
// var teams = tg.renameTeams(teams);

// console.time('teams');
console.log('teams: ', teams);
// console.timeEnd('teams');

// console.time('matches');
// console.log('matches: ', matches);
// console.timeEnd('matches');

// console.time('schedule');
// console.log('schedule: ', tg.createSchedule(t));
// console.timeEnd('schedule');


console.log(tg.createTournament(21, 1, 3));

// for (var i = 32; i <= 32; i++) {
//     console.time('schedule' + i);
//     // var s = tg.generateMatches(i);
//     // var s = tg.createSchedule(i);
//     var s = tg.createTournament(i, 1, 5);
//     console.timeEnd('schedule' + i);
//     for (var j = 0; j < s.length; j++) {
//         for (var k = 0; k < s[j].length; k++) {
//             console.log('group ' + j + ' - round ' + k + ': ', s[j][k]);
//         }
//     }
// }
