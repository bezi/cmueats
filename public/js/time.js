// check if open locations have closed and vice versa
// query server for new information if there has been a change, regenerate page.
function updatePage() {
    console.log("Updating page. . .");
    var currTime = moment(); 
    var openLocs = document.getElementsByClassName("closeTime");
    var closedLocs = document.getElementsByClassName("openTime");
    
    if (openLocs.length != 0) {
        // if the first location hasn't closed, none of them are
        // since openLocs and closedLocs are sorted
        var loc = openLocs[0];
        var locTime = moment(loc.attributes.closeDate.value, "X");
        if (Number(currTime.format("X")) - Number(locTime.format("X")) > 0) {
            document.reload(true);
        }
    }

    if (closedLocs.length != 0) {
        // if the first location hasn't closed, none of them are
        // since openLocs and closedLocs are sorted
        var loc = closedLocs[0];
        var locTime = moment(loc.attributes.openDate.value, "X");
        if (Number(currTime.format("X")) - Number(locTime.format("X")) > 0) {
            document.reload(true);
        }
    }
    console.log("|-- Done.");
    displayTimes();
}

// display the times when restaurants are open or closed
function displayTimes() {
    console.log("Updating time display. . .");
    var openLocs = document.getElementsByClassName("closeTime");
    var closedLocs = document.getElementsByClassName("openTime");

    for (var i = 0; i < openLocs.length; ++i) {
        var loc = openLocs[i];
        var locTime = moment(loc.attributes.closeDate.value, "X");
        loc.innerHTML = "Closes " + locTime.fromNow().charAt(0).toLowerCase() + locTime.fromNow().slice(1) + " (" + locTime.calendar() + ")";
    }

    for (var i = 0; i < closedLocs.length; ++i) {
        var loc = closedLocs[i];
        var locTime = moment(loc.attributes.openDate.value, "X");
        loc.innerHTML = "Opens " + locTime.fromNow().charAt(0).toLowerCase() + locTime.fromNow().slice(1) + " (" + locTime.calendar() + ")";
    }
    console.log("|-- Done.");
}

displayTimes();
setInterval(updatePage, 30000); //update every 30 seconds
