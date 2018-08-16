var config = {
  apiKey: "AIzaSyCJjZ-8B-jHFfGqflEo7t-WmSNn84_AyMk",
  authDomain: "networkio-2ffd5.firebaseapp.com",
  databaseURL: "https://networkio-2ffd5.firebaseio.com",
  projectId: "networkio-2ffd5",
  storageBucket: "networkio-2ffd5.appspot.com",
  messagingSenderId: "546255366020"
};
firebase.initializeApp(config);

const nearby = document.getElementById("nearby");
const requests = document.getElementById("requests");
const database = firebase.database();
const nearbyContainer = document.getElementById("nearbyContainer");
const requestsContainer = document.getElementById("requestsContainer");

updateWithProfiles()

function updateWithProfiles() {
  var leadsRef = database.ref('users');
  leadsRef.on('value', function(snapshot) {
    nearbyContainer.innerHTML = '';
      snapshot.forEach(function(childSnapshot) {
        var person = childSnapshot.val();
        updateWithPerson(person);
      });
  });
}

function updateWithPerson(person) {
  const newProfile = document.createElement('div');
  const pfpN = document.createElement('IMG');
  pfpN.src = person.PFP;
  newProfile.appendChild(pfpN);
  const info = document.createElement('P');
  const br = document.createElement('br');
  console.log(person);
  info.innerText += person.NAME;
  info.appendChild(br);
  info.innerText += person.EMAIL;
  info.appendChild(br);
  if(person.POSITIONS.values) {
    info.innerText += person.POSITIONS.values[0].title + ' at ' + person.POSITIONS.values[0].company.name;
  }

  nearbyContainer.appendChild(newProfile);
  nearbyContainer.appendChild(info);
}

nearby.addEventListener("click", function() {
    updateWithProfiles()
    document.querySelector("#nearbyContainer").style.display = "block";
    document.querySelector("#requestsContainer").style.display = "none";
});
requests.addEventListener("click", function() {
    document.querySelector("#nearbyContainer").style.display = "none";
    document.querySelector("#requestsContainer").style.display = "block";
});
