/*
    TODO: better handling for multiple dom changes
*/

document.body.addEventListener("DOMSubtreeModified", function() {
  var workTimeItems = document.getElementsByClassName("worktime-realization");
  if (workTimeItems.length) {
    //workHours = workTimeItems.map(x => x.innerText);
    var workHours = [];
    for(var i = 0; i < workTimeItems.length; i++){
        var hours = splitHours(workTimeItems[i].innerText);
        if(hours){
            workHours.push(hours);
        }
    };
    //console.log(workHours);
    timeDifferences = calcTimeDifferences(workHours);
    //console.log(timeDifferences);

    overTime = calcOverTime(timeDifferences);
    //console.log(overTime);

    chrome.storage.local.set({"overtime": overTime});
  }
});

function splitHours(innerText) {
    if(innerText.indexOf('-') > 0){
        var split = innerText.split("-");
        for(var i = 0; i < split.length; i++)
        {
            split[i] = split[i].trim();
        }
        //console.log(split);
        return split;
    }
    return;
}

function calcTimeDifferences(workHoursArray){ // to be change to use work time
    var timeDifferences = [];
    for(var i = 0; i < workHoursArray.length; i++){
        splitStart = workHoursArray[i][0].split(":");
        splitEnd = workHoursArray[i][1].split(":");

        var dateStart = new Date("2011/02/01");
        dateStart.setHours(splitStart[0]);
        dateStart.setMinutes(splitStart[1]);

        var dateEnd = new Date("2011/02/01");
        dateEnd.setHours(splitEnd[0]);
        dateEnd.setMinutes(splitEnd[1]);
        timeDifferences.push(Math.abs(dateEnd - dateStart)/60000); //in minutes
    }
    return timeDifferences;
}

function calcOverTime(timeDifferences){
    var overtime = 0;
    for(var i = 0; i < timeDifferences.length; i++){
        overtime += (timeDifferences[i] - 480); // to verify: what happens, when someone have 2 in&outs
    }
    return overtime;
}
