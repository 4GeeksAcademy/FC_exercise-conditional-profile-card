import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Determine cover image display
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : "<div class='cover'></div>";

  // Build the full name
  let fullName = "";
  if (variables.name || variables.lastName) {
    fullName = `${variables.name ? variables.name : ""} ${
      variables.lastName ? variables.lastName : ""
    }`.trim();
  } else {
    fullName = "Full Name";
  }

  // Build the profile information dynamically based on input values
  let role = variables.role ? variables.role : "Role";
  let country = variables.country ? variables.country : "Country";
  let city = variables.city ? variables.city : "City";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      <ul class="${variables.socialMediaPosition}">
        <li><a href="https://twitter.com/${variables.twitter ||
          ""}"><i class="fab fa-twitter"></i></a></li>
        <li><a href="https://github.com/${variables.github ||
          ""}"><i class="fab fa-github"></i></a></li>
        <li><a href="https://linkedin.com/in/${variables.linkedin ||
          ""}"><i class="fab fa-linkedin"></i></a></li>
        <li><a href="https://instagram.com/${variables.instagram ||
          ""}"><i class="fab fa-instagram"></i></a></li>
      </ul>
    </div>`;
}

window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background:
      "https://images.pexels.com/photos/2389349/pexels-photo-2389349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // this is the url for the profile avatar
    avatarURL:
      "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
