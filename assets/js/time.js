APIKey = "4fc6f3e3d302f4c30473b820dc2eb05e";
        
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Pennsylvania,Philadelphia&units=imperial&appid=" + APIKey;
$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
console.log(queryURL);
console.log(response);
var a = response.dt
  var myDate = new Date( a *1000);
// document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
$("#time").html("<div> Current time is: " + myDate + "</div>");
});