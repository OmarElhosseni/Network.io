// Initialize Firebase
var config = {
  apiKey: "AIzaSyCJjZ-8B-jHFfGqflEo7t-WmSNn84_AyMk",
  authDomain: "networkio-2ffd5.firebaseapp.com",
  databaseURL: "https://networkio-2ffd5.firebaseio.com",
  projectId: "networkio-2ffd5",
  storageBucket: "networkio-2ffd5.appspot.com",
  messagingSenderId: "546255366020"
};
firebase.initializeApp(config);

const txtName = document.getElementById('name');
const pfp = document.getElementById('pfp')
const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('pass');
const btnSignin = document.getElementById('signIn');
const btnSignup = document.getElementById('signUp');

function onLoad() {
  IN.Event.on(IN, "auth", grabUserData);
}

function grabUserData() {
  let profile = {};
  IN.API.Profile('me').fields([
    'first-name', 'last-name', // Add these to get the name
    'industry', 'date-of-birth', 'educations:(id,school-name)',
    'positions', // Add this one to get the job history
    'picture-url',//gets image
    'email-address'
  ]).result(function(profiles) {
    console.log(profiles.values[0]);
    profile = profiles.values[0];
    updateWithInfo(profile);
  });
}

btnSignup.addEventListener('click', e => {//Sign up new account
 const email = txtEmail.value;
 const pass = txtPass.value;
 const nameU = txtName.textContent;
 const auth = firebase.auth();
 const inbox = [];
 const pfpU = pfp.src;

 // writeUserData(email, name);
 const promise = auth.createUserWithEmailAndPassword(email,pass);
 promise.then(u => {
   firebase.database().ref('users/' + auth.currentUser.uid).set({
     EMAIL : email,
     NAME : nameU,
     INBOX : inbox,
     PFP : pfpU,
   });
 });
 promise.catch(function() { console.log(e.message)});
})

function updateWithInfo(profile) {
  txtPass.style.display = 'block'
  btnSignin.style.display = 'block'
  btnSignup.style.display = 'block'
  pfp.style.display = 'block'
  pfp.style.width = '200px'
  pfp.style.height = 'auto'
  console.log(profile.pictureUrl)
  pfp.src = profile.pictureUrl;
  txtName.style.display = 'block';
  txtName.textContent = profile.firstName + ' ' + profile.lastName;
  email.style.display = 'block';
  email.value = profile.emailAddress;
}
