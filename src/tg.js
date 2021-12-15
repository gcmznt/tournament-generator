module.exports = class Tournament {

  constructor(teams = 2, options = {groups = 1}) {
    this.teams = (Number.isInteger(teams)) ? this.generateTeams(teams) : teams;
    this.matches = generateMatches(teams, groups);
  }

  generateTeams(teams) {
    return new Array(teams).fill(1).map((e, i) => `Team ${e + i}`);
  }
}



function generateMatches(teams, group) {
  group = group || '';
  var matches = [];
  for (var i = 1; i <= teams; i++) {
    for (var j = i + 1; j <= teams; j++) {
      matches.push(`${i}${group}-${j}${group}`);
    }
  }
  return matches;
}

// function renameTeams(teams, base) {
//     base = base || 10;
//     return teams.map(e => 1 + Math.ceil(Math.log(e) / Math.log(base), 10));
// }
//
// Get the match for a single day of championship
function getDay(teams, matches) {
    var day = [];
    for (var i = 0, t = []; t.length < teams; i++) {
        // If there are no more matches and the day is not complete
        // remove the last match selected and look for a substitute
        while (i >= matches.length) {
            i = matches.indexOf(day.pop()) + 1;
            t = t.slice(0, -2);
        }

        // Check if both teams have not already played in this day
        var m = matches[i].split('-');
        if (t.indexOf(m[0]) === -1 && t.indexOf(m[1]) === -1) {
            day.push(matches[i]);
            t.push(...m);
        }
    }
    return day;
}

function removeTeam(team, matchList) {
    for (var i = 0; i < matchList.length; i++) {
        var m = matchList[i].split('-');
        if (parseInt(m[0], 10) === team || parseInt(m[1], 10) === team) {
            matchList.splice(i, 1);
        }
    }
}

function createSchedule(totalTeams, group) {
    group = group || '';
    var schedule = [];
    var odd = !!((totalTeams % 2) && totalTeams++);
    var matches = generateMatches(totalTeams, group);

    while (matches.length) {
        var day = getDay(totalTeams, matches);
        for (var i = 0; i < day.length; i++) {
            matches.splice(matches.indexOf(day[i]), 1);
        }
        schedule.push(day);
        if (odd) removeTeam(totalTeams, day);
    }
    return schedule;
}
//
// function orderMatches(schedule) {
//     for (var i = 1; i < schedule.length; i++) {
//         var prev = schedule[i - 1].join('-').split('-').reverse();
//         schedule[i] = schedule[i].map(
//             e => (e
//                 .split('-')
//                 .map(e => Math.floor(prev.indexOf(e) / 2))
//                 .sort((a, b) => a - b)
//                 .map((e, i) => (e === -1 ? 1000 : e) / Math.pow(100, i))
//                 .reduce((c, a) => (c + a), 0)
//              + '|' + e)
//         )
//         .sort((a, b) => b.split('|')[0] - a.split('|')[0])
//         .map(e => e.split('|')[1]);
//     }
//     return schedule
// }
//
// function balanceMatches(schedule) {
//     var counter = {};
//     for (var i = 0; i < schedule.length; i++) {
//         for (var j = 0; j < schedule[i].length; j++) {
//             var t = schedule[i][j]
//                 .split('-')
//                 .sort((a, b) => (counter[a] || 0) - (counter[b] || 0));
//             (counter[t[0]] && counter[t[0]]++) || (counter[t[0]] = 1);
//             schedule[i][j] = t.join('-');
//         }
//     }
//     return schedule;
// }
//
// function flip(match) {
//     return match.split('-').reverse().join('-');
// }
//
// function createTournament(totalTeams, rounds, groups) {
//     rounds = rounds || 1;
//     groups = groups || 1;
//     var tournament = [];
//     var schedule = {};
//     if (Math.floor(totalTeams / groups) <= 1) return false;
//     while (groups) {
//         var t = (totalTeams % groups)
//               ? Math.ceil(totalTeams / groups)
//               : Math.floor(totalTeams / groups);
//         if (!schedule[t]) {
//             var m = balanceMatches(orderMatches(createSchedule(t)));
//             var r = rounds;
//             schedule[t] = [];
//             while (r--) {
//                 if (r % 2) schedule[t].unshift(m.map(e => e.map(flip)));
//                 else schedule[t].unshift(m);
//             }
//         }
//         groups--;
//         totalTeams -= t;
//         tournament.push(schedule[t]);
//     }
//     return tournament;
// }
//
// module.exports.generateMatches = generateMatches;
// module.exports.generateTeams = generateTeams;
// module.exports.renameTeams = renameTeams;
// module.exports.createSchedule = createSchedule;
// module.exports.createTournament = createTournament;
