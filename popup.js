var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

var currentMonth = new Date().getMonth();
chrome.storage.local.get("overtime", function(data) {
  var result = "<ul>";
  var sum = new Array(3).fill(0);
  for (var i = 0; i < data.overtime.length; i++) {
    if (data.overtime[i]) {
      result += "<li>";
      result += months[i];
      result += ": ";
      result += data.overtime[i];
      result += " minutes</li>";
    }
    sum[Math.floor(i / 4)] += data.overtime[i];
  }
  result += "</ul>";
  result += "Sum: ";
  //result += sum;
  result += "<ul>";
  for (var i = 0; i < sum.length; i++) {
    if (sum[i]) {
      result += "<li>Period ";
      result += (i+1);
      if (i == Math.floor(currentMonth / 4)) {
        result += "(current)";
      }
      result += ": ";
      result += sum[i];
      result += " minutes</li>";
    }
  }
  result += "</ul>";
  document.getElementById("overtime").innerHTML = result;
});
