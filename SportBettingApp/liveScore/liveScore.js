
// const options = {
//     method: 'GET',
//     url: 'https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores',
//     params: {daysFrom: '1'},
//     headers: {
//       'X-RapidAPI-Key': 'c2e100179emshee202f59bef416fp1d6359jsn6c971475cebe',
//       'X-RapidAPI-Host': 'odds.p.rapidapi.com'
//     }
//   };

// fetch('https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response));


// // you need to write a fuction which takes date as a param and returns a weekday.


//     // will i need to loop around different days to showcase the data collected?

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
    .then((response) => {
        response.forEach((game) => {
            //  console.log(game.away_team)
            const row = document.createElement("tr")
            const table= document.getElementById("tablebody")
            table.append(row)
        
            const  homeTeam = game.home_team.replace(/\s/g, "");
            const awayTeam = game.away_team.replace(/\s/g, "");
            let homeTeamLink = `../assets/${homeTeam}.png`;
            let awayTeamLink = "../assets/" + awayTeam + ".png";
          
          
             const markup = `
            <td>${game.home_team}<img class="hometeamimg" src="${homeTeamLink}"></td>
            <td>${game.away_team}<img class="awayteamimg" src="${awayTeamLink}"></td>
            <td>${getDayOfWeek(game.commence_time)}</td>
            <td>${game.scores}</td>`
         
          row.innerHTML=markup
          console.log(game)
    
         })
             
        

      


     
        //console.log("inside--------------------/n" + response[0].home_team);
         //document.getElementById("mon").innerHTML = response[0].home_team;

        // we going to need a fuction which loops through the json object
        //  and put data into the table data
        // we need another function to change date to days.
        // console.log("has to give us days" + getDayOfWeek(response[0].dayOfWeek));
        // for (var key in response) {
        //     if(0 === 0) {
        //         console.log(key);
            
        //     } 
        // }



    });
    function getDayOfWeek(date) {
            const dayOfWeek = new Date(date).getDay();    
            return isNaN(dayOfWeek) ? null : 
                ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
               


            }
    
        //  .then(data =>{
        //         const markup= `<td>${value.home_team}</td>`;
        //     })
        //     .cath(error =>console.log(error))
   // document.getElementsByClassName(Team1).innerHTML=consol.log("game.home_team.away_team")
    



    // getDays();
    // function getDays() {
        //document.getElementById("mon").innerHTML = "this is monday";
    // } 