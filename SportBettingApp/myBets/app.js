// Function to get betting odd for the upcoming nba games and store the desired data in an object
async function getOdds() {
  // Array to store results from the fetch call
  events = [];
  // API authenication
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1289a30327msh1b2f18751dfc20fp149ea3jsn37daa0505acb",
      "X-RapidAPI-Host": "odds.p.rapidapi.com",
    },
  };

  await fetch(
    "https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds?regions=us&oddsFormat=american&markets=h2h%2Cspreads%2Ctotals&dateFormat=iso",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        // Object to stores all information to go into the eventCard
        eventCard = {
          homeTeam: item.home_team,
          awayTeam: item.away_team,
          team1_h2h: item.bookmakers[1].markets[0].outcomes[0],
          team2_h2h: item.bookmakers[1].markets[0].outcomes[1],
          team1_spreads: item.bookmakers[1].markets[1].outcomes[0],
          team2_spreads: item.bookmakers[1].markets[1].outcomes[1],
          overOdds: item.bookmakers[1].markets[2].outcomes[0],
          underOdds: item.bookmakers[1].markets[2].outcomes[1],
          overUnderVal: item.bookmakers[1].markets[2].outcomes[0].point,
        };
        events.push(eventCard);
      });
    })
    .catch((err) => {
      console.error(err);
    });
  console.log(events);
  return events;
}

async function createCards() {
  let events = getOdds();

  for (i = 0; i < events.length; i++) {
    // Container to hold within 1 card
    let cardHolder = document.getElementById("cardHolder");

    // Create elements for single card
    let eventContainer = document.createElement("div");
    let vs = document.createElement("p");
    let eventHeader = document.createElement("div");
    let homeImage = document.createElement("img");
    let awayImage = document.createElement("img");

    // Assign attributes to the above created elements
    eventHeader.setAttribute("class", "eventHeader");
    eventContainer.setAttribute("class", "card event");
    cardHolder.appendChild(eventContainer);
    homeTeam = events[i].homeTeam;
    awayTeam = events[i].awayTeam;
    vs.setAttribute(
      "style",
      "display: flex; align-items: center; padding: 20px;"
    );
    vs.innerHTML = "@";

    // Remove the space from the home and away teams and connect them to the assets folder to grab the correct team logo
    homeTeam = homeTeam.replace(/\s/g, "");
    awayTeam = awayTeam.replace(/\s/g, "");
    let homeTeamLink = "../assets/" + homeTeam + ".png";
    let awayTeamLink = "../assets/" + awayTeam + ".png";
    homeImage.setAttribute("src", homeTeamLink);
    awayImage.setAttribute("src", awayTeamLink);

    // Append new elements to the card
    with (eventHeader) {
      appendChild(homeImage);
      appendChild(vs);
      appendChild(awayImage);
    }
    eventContainer.appendChild(eventHeader);
    cardHolder.appendChild(eventContainer);

    // Create elements for the tabs on each card
    let tabContainer = document.createElement("div");
    let h2hTab = document.createElement("button");
    let spreadTab = document.createElement("button");
    let overUnderTab = document.createElement("button");

    // Create unique IDs for each h2h and h2h tab content box
    let h2hId = "h2h_" + i;
    let h2hTabID = "openOdds(event,'" + h2hId + "')";

    // Assign attributes to the above created elements
    tabContainer.setAttribute("class", "tab");
    with (h2hTab) {
      setAttribute("class", "tablinks");
      setAttribute("onclick", h2hTabID);
      innerHTML = "Moneyline";
    }
    with (spreadTab) {
      setAttribute("class", "tablinks");
      setAttribute("onclick", "openOdds(event,'spread')");
      innerHTML = "Spread";
    }
    with (overUnderTab) {
      setAttribute("class", "tablinks");
      setAttribute("onclick", "openOdds(event,'overUnder')");
      innerHTML = "Over/Under";
    }
    // Append Tabs to the card
    with (tabContainer) {
      appendChild(h2hTab);
      appendChild(spreadTab);
      appendChild(overUnderTab);
    }
    eventContainer.appendChild(tabContainer);

    // Create elements for tab content
    let h2hContent = document.createElement("div");
    let h2htable = document.createElement("table");

    // Assign attributes to h2h content tab
    with (h2hContent) {
      setAttribute("class", "tabcontent");
      setAttribute("id", h2hId);
    }
    h2htable.setAttribute("class", "table");

    // Append content tab to the event container
    h2hContent.appendChild(h2htable);
    eventContainer.appendChild(h2hContent);

    // Populate table headers for h2h
    let tableHeader = h2htable.insertRow(0);
    let column_1 = tableHeader.insertCell(0);
    let column_2 = tableHeader.insertCell(1);
    column_1.innerHTML = "Team";
    column_2.innerHTML = "odds";

    // Populate Row 1 of h2h
    let h2hRow_1 = h2htable.insertRow(1);
    let h2hRow1col_1 = h2hRow_1.insertCell(0);
    let h2hRow1col_2 = h2hRow_1.insertCell(1);
    h2hRow1col_1.innerHTML = eventCard.team1_h2h.name;
    h2hRow1col_2.innerHTML = eventCard.team1_h2h.price;

    // Populate Row 2 of h2h
    let h2hRow_2 = h2htable.insertRow(2);
    let h2hRow2col_1 = h2hRow_2.insertCell(0);
    let h2hRow2col_2 = h2hRow_2.insertCell(1);
    h2hRow2col_1.innerHTML = eventCard.team2_h2h.name;
    h2hRow2col_2.innerHTML = eventCard.team2_h2h.price;
  }
}

function openOdds(evt, betting) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(betting).style.display = "block";
  evt.currentTarget.className += " active";
}

createCards();
