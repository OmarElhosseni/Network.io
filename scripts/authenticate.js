

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
    document.getElementById('pass').style.display = 'block'
    document.getElementById('signIn').style.display = 'block'
    const pfp = document.getElementById('pfp')
    pfp.style.display = 'block'
    console.log(profile.pictureUrl)
    pfp.src = profile.pictureUrl;
    const name = document.getElementById('name');
    name.style.display = 'block';
    name.innerHTML = profile.firstName + ' ' + profile.lastName;
    const email = document.getElementById('email');
    email.style.display = 'block';
    email.innerHTML = profile.emailAddress;
  });
}
