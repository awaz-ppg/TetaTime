/*
    TODO: better handling for multiple dom changes
*/

chrome.storage.local.clear();

document.body.addEventListener("DOMSubtreeModified", function() {
  var workTimeItems = document.getElementsByClassName("worktime-realization");
  if (workTimeItems.length) {
    //workHours = workTimeItems.map(x => x.innerText);
    var workHours = [];
    for (var i = 0; i < workTimeItems.length; i++) {
      var hours = doneHours(workTimeItems[i].innerText);
      if (hours) {
        workHours.push(hours);
      }
    }
    //console.log(workHours);
    timeSpent = calcTimeSpent(workHours);
    //console.log(timeSpent);

    overTime = calcOverTime(timeSpent);
    //console.log(overTime);

    updateStorageData(overTime);
  }
});

function doneHours(innerText) {
  if (innerText.indexOf("-") === -1) {
    return innerText;
  }
  return;
}

function calcTimeSpent(workHoursArray) {
  var timeSpentArray = [];
  for (var i = 0; i < workHoursArray.length; i++) {
    split = workHoursArray[i].split(":");
    timeSpentArray.push(split[0] * 60 + split[1] * 1); //in minutes
  }
  return timeSpentArray;
}

function calcOverTime(timeSpent) {
  var overtime = 0;
  for (var i = 0; i < timeSpent.length; i++) {
    if(timeSpent[i]){
      overtime += timeSpent[i] - 480; 
    }
  }
  return overtime;
}

function updateStorageData(overTime) {
    var url = window.location.href;
    var month = url.substring(url.indexOf("month="), url.length);
    var monthValue = month.substring(month.indexOf("=") + 1, month.indexOf("-"));

    chrome.storage.local.get("overtime", function(data) {
    var dataArray;
    if (data.overtime == undefined) {
      dataArray = [];
    } else {
        var dataArray = data.overtime;
    }
    dataArray[monthValue] = overTime;
    chrome.storage.local.set({ overtime: dataArray });
  });
}
