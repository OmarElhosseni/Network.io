// var config = {
//   apiKey: "AIzaSyCJjZ-8B-jHFfGqflEo7t-WmSNn84_AyMk",
//   authDomain: "networkio-2ffd5.firebaseapp.com",
//   databaseURL: "https://networkio-2ffd5.firebaseio.com",
//   projectId: "networkio-2ffd5",
//   storageBucket: "networkio-2ffd5.appspot.com",
//   messagingSenderId: "546255366020"
// };
// firebase.initializeApp(config);

const nearby = document.getElementById("nearby");
const requests = document.getElementById("requests");
const database = firebase.database();
const nearbyContainer = document.getElementById("nearbyContainer");
const requestsContainer = document.getElementById("requestsContainer");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    updateNearby();
    updateRequests();
    // updateWithProfiles();
  } else {
    console.log('no user');
  }
});

function updateNearby() {
  firebase.database().ref('users').once('value').then(function(userSnapshot) {
    const users = userSnapshot.exists() ? Object.keys(userSnapshot.val()) : [];

    console.log(users);

    for(let uid of users) {
      if (uid != firebase.auth().currentUser.uid) {
        addProfile(uid, "nearbyContainer");
      }
    }
  });
}

function updateRequests() {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/INBOX').once('value').then(function(inboxSnapshot) {
    const inbox = inboxSnapshot.exists() ? inboxSnapshot.val() : [];

    for(let uid of inbox) {
      addProfile(uid, "requestsContainer");
    }
  });
}

function addProfile(uid, container) {
  firebase.database().ref('users/' + uid).once('value').then(function(account) {
    const person = account.val();
    console.log(person);
    const name = person.NAME;
    const email = person.EMAIL;
    const img = person.PFP;
    const acc = person.ACCOUNT;
    const positionObj = person.POSITIONS && person.POSITIONS.values ? person.POSITIONS.values[0] : '';
    let position = '';
    if(positionObj.title) {
      position = positionObj.title + ' at ' + positionObj.company.name;
    }

    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    const nameDiv = document.createElement('h3');
    nameDiv.innerHTML = name;
    nameDiv.classList.add("name");

    let positionDiv = document.createElement('p')
    if(position) {
     positionDiv = document.createElement('p');
    positionDiv.innerHTML = position ? position : '';
    positionDiv.classList.add("name");
  }

    const connectDiv = document.createElement('a');
    connectDiv.textContent = 'Connect';
    connectDiv.href = acc;
    connectDiv.target = "blank";
    connectDiv.classList.add("connect");

    const picDivOuter = document.createElement("div");
    picDivOuter.classList.add("pic");

    const picDiv = document.createElement("img");
    if(img) picDiv.src = img;
    else picDiv.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png'

    picDivOuter.appendChild(picDiv);
    userDiv.appendChild(picDivOuter);
    userDiv.appendChild(nameDiv);
    if(positionDiv) userDiv.appendChild(positionDiv);
    userDiv.appendChild(connectDiv);

    document.getElementById(container).appendChild(userDiv);
  });
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
