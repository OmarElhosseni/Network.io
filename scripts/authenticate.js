// const button = document.querySelector("#signInButton");
// button.addEventListener('click', function(event) {
//   event.preventDefault();
//
//   // IN.User.authorize(function() {
//   //   console.log('logged in');
//   //   grabUserData();
//   // });
//
// });

function onLoad() {
  IN.Event.on(IN, "auth", grabUserData);
  const pass = document.createElement('input');

}

function grabUserData() {
  document.getElementsByClassName('hidden')[0].style.display = 'inline'
  document.getElementsByClassName('hidden')[1].style.display = 'inline'
  IN.API.Profile('me').fields([
    // 'first-name', 'last-name', // Add these to get the name
    // 'industry', 'date-of-birth', 'educations:(id,school-name)',
    // 'positions' // Add this one to get the job history
  ]).result(function(profiles) {
    console.log(profiles.values[0]);
  });
}
