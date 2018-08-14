const button = document.querySelector("#auth");
button.addEventListener('click', function(event) {
  event.preventDefault();

  IN.User.authorize(function() {
    console.log('logged in');
    grabUserData();
  });
});

function grabUserData() {
  IN.API.Profile('me').fields([
    'first-name', 'last-name', // Add these to get the name
    'industry', 'date-of-birth', 'educations:(id,school-name)',
    'positions' // Add this one to get the job history
  ]).result(function(profiles) {
    console.log(profiles.values[0]);
  });
}
