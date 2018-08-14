

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

function updateWithInfo(profile) {
  document.getElementById('pass').style.display = 'block'
  document.getElementById('signIn').style.display = 'block'
  document.getElementById('signUp').style.display = 'block'
  const pfp = document.getElementById('pfp')
  pfp.style.display = 'block'
  pfp.style.width = '200px'
  pfp.style.height = 'auto'
  console.log(profile.pictureUrl)
  pfp.src = profile.pictureUrl;
  const name = document.getElementById('name');
  name.style.display = 'block';
  name.innerHTML = profile.firstName + ' ' + profile.lastName;
  const email = document.getElementById('email');
  email.style.display = 'block';
  email.value = profile.emailAddress;
}
