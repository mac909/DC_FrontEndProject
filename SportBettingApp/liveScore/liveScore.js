
const options = {
    method: 'GET',
    url: 'https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores',
    params: {daysFrom: '3'},
    headers: {
      'X-RapidAPI-Key': 'c2e100179emshee202f59bef416fp1d6359jsn6c971475cebe',
      'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
  };

fetch('https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err))
    