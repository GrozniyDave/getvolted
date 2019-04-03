"use strict";

// following cursor feature
var $ = document.querySelector.bind(document);
var $on = document.addEventListener.bind(document);

var xmouse, ymouse;
$on("mousemove", function(e) {
  xmouse = e.clientX || e.pageX;
  ymouse = e.clientY || e.pageY;
});

var ball = $("#follower");
var x = void 0,
  y = void 0,
  dx = void 0,
  dy = void 0,
  tx = 0,
  ty = 0,
  key = -1;

var followMouse = function followMouse() {
  key = requestAnimationFrame(followMouse);

  if (!x || !y) {
    x = xmouse;
    y = ymouse;
  } else {
    dx = (xmouse - x) * 0.125;
    dy = (ymouse - y) * 0.125;
    if (Math.abs(dx) + Math.abs(dy) < 0.1) {
      x = xmouse;
      y = ymouse;
    } else {
      x += dx;
      y += dy;
    }
  }
  ball.style.left = x + "px";
  ball.style.top = y + "px";
};

// following feature ends here

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

//tobias form js//
const formSignIn = document.querySelector(".signInForm");
document.querySelector("#password").addEventListener("focus", () => {
  document.querySelector("#password").style.backgroundColor = "white";
  document.querySelector("#password").style.boxShadow =
    "0px 3px 9px -4px rgb(0, 0, 0)";
});
document.querySelector("#email").addEventListener("focus", () => {
  document.querySelector("#email").style.backgroundColor = "white";
  document.querySelector("#email").style.boxShadow =
    "0px 3px 9px -4px rgb(0, 0, 0)";
});
document.querySelector("#email").addEventListener("blur", () => {
  if (document.querySelector("#email").checkValidity()) {
    document.querySelector("#email").style.backgroundColor = "green";
  } else {
    document.querySelector("#email").style.backgroundColor = "red";
  }
});
document.querySelector("#password").addEventListener("blur", () => {
  if (document.querySelector("#email").checkValidity()) {
    document.querySelector("#password").style.backgroundColor = "green";
  } else {
    document.querySelector("#password").style.backgroundColor = "red";
  }
});
