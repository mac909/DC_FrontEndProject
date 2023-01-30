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
        eventCard = {};
        // Check each item whether or not it is available
        eventCard.homeTeam = item.home_team;
        eventCard.awayTeam = item.away_team;
        let book = item.bookmakers;
        for (i in book) {
          let bookMarket = item.bookmakers[i].markets;
          if (bookMarket.length == 3) {
            eventCard.team1_h2h = item.bookmakers[i].markets[0].outcomes[0];
          }
        }

        for (i in book) {
          let bookMarket = item.bookmakers[i].markets;
          if (bookMarket.length == 3) {
            eventCard.team2_h2h = item.bookmakers[i].markets[0].outcomes[1];
          }
        }

        for (i in book) {
          let bookMarket = item.bookmakers[i].markets;
          if (bookMarket.length == 3) {
            eventCard.team1_spreads = item.bookmakers[i].markets[1].outcomes[0];
          }
        }

        for (i in book) {
          let bookMarket = item.bookmakers[i].markets;
          if (bookMarket.length == 3) {
            eventCard.team2_spreads = item.bookmakers[i].markets[1].outcomes[1];
          }
        }

        for (i in book) {
          let bookMarket = item.bookmakers[i].markets;
          if (bookMarket.length == 3) {
            eventCard.overOdds = item.bookmakers[i].markets[2].outcomes[0];
          }
        }

        for (i in book) {
          let bookMarket = item.bookmakers[i].markets;
          if (bookMarket.length == 3) {
            eventCard.underOdds = item.bookmakers[i].markets[2].outcomes[1];
          }
        }

        // Object to stores all information to go into the eventCard
        // eventCard = {
        //   homeTeam: item.home_team,
        //   awayTeam: item.away_team,
        //   team1_h2h: item.bookmakers[1].markets[0].outcomes[0],
        //   team2_h2h: item.bookmakers[1].markets[0].outcomes[1],
        //   team1_spreads: item.bookmakers[1].markets[1].outcomes[0],
        //   team2_spreads: item.bookmakers[1].markets[1].outcomes[1],
        //   overOdds: item.bookmakers[1].markets[2].outcomes[0],
        //   underOdds: item.bookmakers[1].markets[2].outcomes[1]
        // };
        if (Object.keys(eventCard).length > 7) {
          events.push(eventCard);
        }
      });
    })
    .catch((err) => console.error(err));
  console.log(events);
  return events;
}

async function createCards() {
  let events = await getOdds();

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

    // Create unique IDs for each h2h and h2h tab content boxes
    let h2hId = "h2h_" + i;
    let h2hBtnId_1 = "h2hBtn_1_" + i;
    let h2hBtnId_2 = "h2hBtn_2_" + i;
    let h2hTabID = "openOdds(event,'" + h2hId + "')";

    // Create unique IDs for each of the spreads and spread content boxes
    let spreadId = "spread_" + i;
    let spreadBtnId_1 = "spreadBtn_1_" + i;
    let spreadBtnId_2 = "spreadBtn_2_" + i;
    let spreadTabId = "openOdds(event,'" + spreadId + "')";

    // Create unique IDs for each of the spreads and spread content boxes
    let overUnderId = "overUnder_" + i;
    let overUnderBtnId_1 = "overUnderBtn_1_" + i;
    let overUnderBtnId_2 = "overUnderBtn_2_" + i;
    let overUnderTabId = "openOdds(event,'" + overUnderId + "')";

    // Assign attributes to the above created elements
    tabContainer.setAttribute("class", "tab");
    with (h2hTab) {
      setAttribute("class", "tablinks");
      setAttribute("onclick", h2hTabID);
      innerHTML = "Moneyline";
    }
    with (spreadTab) {
      setAttribute("class", "tablinks");
      setAttribute("onclick", spreadTabId);
      innerHTML = "Spread";
    }
    with (overUnderTab) {
      setAttribute("class", "tablinks");
      setAttribute("onclick", overUnderTabId);
      innerHTML = "Over/Under";
    }
    // Append Tabs to the card
    with (tabContainer) {
      appendChild(h2hTab);
      appendChild(spreadTab);
      appendChild(overUnderTab);
    }
    eventContainer.appendChild(tabContainer);

    // ===========================================================
    // Create elements for h2h tab content
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
    column_2.innerHTML = "Odds";

    // Populate Row 1 of h2h
    let h2hRow_1 = h2htable.insertRow(1);
    let h2hRow1col_1 = h2hRow_1.insertCell(0);
    let h2hRow1col_2 = h2hRow_1.insertCell(1);
    h2hRow1col_1.innerHTML = events[i].team1_h2h.name;

    // Populate Row 2 of h2h
    let h2hRow_2 = h2htable.insertRow(2);
    let h2hRow2col_1 = h2hRow_2.insertCell(0);
    let h2hRow2col_2 = h2hRow_2.insertCell(1);
    // Create Btn to pull up modal calculator
    let row_1Btn = document.createElement("button");
    let row_2Btn = document.createElement("button");
    // Assign attributes to the buttons
    with (row_1Btn) {
      setAttribute("style", "button");
      setAttribute("class", "btn btn-light");
      setAttribute("id", h2hBtnId_1);
      setAttribute("onclick", "openCalc(this.id)");
    }
    with (row_2Btn) {
      setAttribute("style", "button");
      setAttribute("class", "btn btn-light");
      setAttribute("id", h2hBtnId_2);
      setAttribute("onclick", "openCalc(this.id)");
    }
    // Append btn to the table in the HTML
    h2hRow2col_1.innerHTML = events[i].team2_h2h.name;
    row_1Btn.innerHTML = events[i].team1_h2h.price;
    row_2Btn.innerHTML = events[i].team2_h2h.price;
    h2hRow1col_2.appendChild(row_1Btn);
    h2hRow2col_2.appendChild(row_2Btn);

    // Move team name to center alignment
    h2hRow1col_1.setAttribute("style", "vertical-align: middle");
    h2hRow2col_1.setAttribute("style", "vertical-align: middle");
    column_1.setAttribute("style", "vertical-align: middle");
    column_2.setAttribute("style", "vertical-align: middle");

    // =========================================================
    // Create spread tab content
    let spreadContent = document.createElement("div");
    let spreadTable = document.createElement("table");

    // Assign attributes to spread tab content
    with (spreadContent) {
      setAttribute("id", spreadId);
      setAttribute("class", "tabcontent");
    }
    spreadTable.setAttribute("class", "table");

    // Append spread content tabs to each event container
    spreadContent.appendChild(spreadTable);
    eventContainer.appendChild(spreadContent);

    // Setup spread table header
    let spreadHeaderRow = spreadTable.insertRow(0);
    let spreadCol_1 = spreadHeaderRow.insertCell(0);
    let spreadCol_2 = spreadHeaderRow.insertCell(1);
    spreadCol_1.innerHTML = "Team";
    spreadCol_2.innerHTML = "Odds";

    // Setup spread row 1
    let spreadRow_1 = spreadTable.insertRow(1);
    let spreadRow_1_col1 = spreadRow_1.insertCell(0);
    let spreadRow_1_col2 = spreadRow_1.insertCell(1);
    spreadRow_1_col1.innerHTML =
      events[i].team2_spreads.name + " (" + events[i].team2_spreads.point + ")";

    // Setup spread row 2
    let spreadRow_2 = spreadTable.insertRow(1);
    let spreadRow_2_col1 = spreadRow_2.insertCell(0);
    let spreadRow_2_col2 = spreadRow_2.insertCell(1);
    spreadRow_2_col1.innerHTML =
      events[i].team1_spreads.name + " (" + events[i].team1_spreads.point + ")";

    // Create button for spread odds
    let spreadBtnRow_1 = document.createElement("button");
    let spreadBtnRow_2 = document.createElement("button");
    // Assign attributes to the buttons
    with (spreadBtnRow_1) {
      setAttribute("style", "button");
      setAttribute("class", "btn btn-light");
      setAttribute("id", spreadBtnId_1);
      setAttribute("onclick", "openCalc(this.id)");
      innerHTML = events[i].team1_spreads.price;
    }
    with (spreadBtnRow_2) {
      setAttribute("style", "button");
      setAttribute("class", "btn btn-light");
      setAttribute("id", spreadBtnId_2);
      setAttribute("onclick", "openCalc(this.id)");
      innerHTML = events[i].team2_spreads.price;
    }

    // Append btn to the spread table
    spreadRow_1_col2.appendChild(spreadBtnRow_1);
    spreadRow_2_col2.appendChild(spreadBtnRow_2);

    // Move team name to center alignment
    spreadRow_1_col1.setAttribute("style", "vertical-align: middle");
    spreadRow_2_col1.setAttribute("style", "vertical-align: middle");
    spreadCol_1.setAttribute("style", "vertical-align: middle");
    spreadCol_2.setAttribute("style", "vertical-align: middle");

    // ==================================================================
    // Create over under tab content
    let overUnderContent = document.createElement("div");
    let overUnderTable = document.createElement("table");

    // Assign attributes to spread tab content
    with (overUnderContent) {
      setAttribute("id", overUnderId);
      setAttribute("class", "tabcontent");
    }
    overUnderTable.setAttribute("class", "table");

    // Append spread content tabs to each event container
    overUnderContent.appendChild(overUnderTable);
    eventContainer.appendChild(overUnderContent);

    // Setup spread table header
    let overUnderHeaderRow = overUnderTable.insertRow(0);
    let overUnderCol_1 = overUnderHeaderRow.insertCell(0);
    let overUnderCol_2 = overUnderHeaderRow.insertCell(1);
    overUnderCol_1.innerHTML = "Total Points";
    overUnderCol_2.innerHTML = "Odds";

    // Setup spread row 1
    let overUnderRow_1 = overUnderTable.insertRow(1);
    let overUnderRow_1_col1 = overUnderRow_1.insertCell(0);
    let overUnderRow_1_col2 = overUnderRow_1.insertCell(1);
    overUnderRow_1_col1.innerHTML = "Over (" + events[i].overOdds.point + ")";

    // Setup spread row 2
    let overUnderRow_2 = overUnderTable.insertRow(1);
    let overUnderRow_2_col1 = overUnderRow_2.insertCell(0);
    let overUnderRow_2_col2 = overUnderRow_2.insertCell(1);
    overUnderRow_2_col1.innerHTML = "Under (" + events[i].underOdds.point + ")";

    // Create button for spread odds
    let overUnderBtnRow_1 = document.createElement("button");
    let overUnderBtnRow_2 = document.createElement("button");
    // Assign attributes to the buttons
    with (overUnderBtnRow_1) {
      setAttribute("style", "button");
      setAttribute("class", "btn btn-light");
      setAttribute("id", overUnderBtnId_1);
      setAttribute("onclick", "openCalc(this.id)");
      innerHTML = events[i].overOdds.price;
    }
    with (overUnderBtnRow_2) {
      setAttribute("style", "button");
      setAttribute("class", "btn btn-light");
      setAttribute("id", overUnderBtnId_2);
      setAttribute("onclick", "openCalc(this.id)");
      innerHTML = events[i].underOdds.price;
    }

    // Append btn to the spread table
    overUnderRow_1_col2.appendChild(overUnderBtnRow_1);
    overUnderRow_2_col2.appendChild(overUnderBtnRow_2);

    // Move team name to center alignment
    overUnderCol_1.setAttribute("style", "vertical-align: middle");
    overUnderCol_2.setAttribute("style", "vertical-align: middle");
    overUnderRow_1_col1.setAttribute("style", "vertical-align: middle");
    overUnderRow_2_col1.setAttribute("style", "vertical-align: middle");
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

function openCalc(clickedOdds) {
  // Set Odds Output
  let elId = document.getElementById(clickedOdds);
  let oddOutput = document.getElementById("oddsInput");
  let amOdds = elId.innerHTML;
  oddOutput.value = parseInt(amOdds);

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById(clickedOdds);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  // clear input boxes if there was a previous entry
  clearInputs();
}

function calcPayout() {
  // Get Id for each input
  let userMoney = document.getElementById("userMoney");
  let oddsInput = document.getElementById("oddsInput");
  let payout = document.getElementById("payout");
  let impliedOdds = document.getElementById("impliedOdds");
  let toWin = document.getElementById("toWin");

  // Assign vars with input values
  let bet = parseFloat(userMoney.value);
  let betOdds = parseFloat(oddsInput.value);

  // Based on whether the odds are - or + determine which calculation to use
  if (betOdds > 0) {
    let decimalOdds = betOdds / 100 + 1;
    payout.value = decimalOdds * bet;
    let impOdds = parseFloat((1 / decimalOdds) * 100).toFixed(2);
    impliedOdds.value = parseFloat(impOdds).toFixed(2) + " %";
    let win = decimalOdds * bet - bet;
    toWin.value = parseFloat(win);
  } else {
    let decimalOdds = parseFloat(1 - 100 / betOdds).toFixed(2);
    payout.value = decimalOdds * bet;
    let impOdds = parseFloat((1 / decimalOdds) * 100).toFixed(2);
    impliedOdds.value = parseFloat(impOdds).toFixed(2) + " %";
    let win = decimalOdds * bet - bet;
    toWin.value = parseFloat(win);
  }
}

function clearInputs() {
  // Get Id for each input and clear the input
  let userMoney = document.getElementById("userMoney");
  let payout = document.getElementById("payout");
  let impliedOdds = document.getElementById("impliedOdds");
  let toWin = document.getElementById("toWin");
  userMoney.value = "";
  payout.value = "";
  impliedOdds.value = "";
  toWin.value = "";
}

createCards();
// getOdds();
