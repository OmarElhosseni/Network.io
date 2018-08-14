const nearby = document.getElementById("nearby");
const requests = document.getElementById("requests");
console.log(nearby, requests);


nearby.addEventListener("click", function() {
    console.log
    document.querySelector("#requestsContainer").style.display = "none";
    document.querySelector("#nearbyContainer").style.display = "block";
});
requests.addEventListener("click", function() {
    document.querySelector("#nearbyContainer").style.display = "none";
    document.querySelector("#requestsContainer").style.display = "block";
});

