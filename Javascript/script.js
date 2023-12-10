/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with JS
*/


const config = {
  // backendUrl: "http://54.179.42.49/", // Default backend URL
  // backendUrl: "https://d1npkyc4r380kx.cloudfront.net/", // Default backend URL
  //backendUrl: "https://d1a6370uhsfk5w.cloudfront.net/", // Default backend URL

    backendUrl: "http://localhost:8000/", // Default backend URL

};

const port = 8000;

function myFunction(x) {
  x.style.background = "green";
}

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Group ID
function validateGroupID() {
  const GroupIDInput = document.getElementById("GroupID");
  const size = GroupIDInput.value.trim().split(" ");
  const errorElement = document.getElementById("GroupIDError");

  if (size.length !== 2) {

    errorElement.textContent = "Please enter your GroupID such as G 03.";
    return false;

  }else if(size[0] !== 'G'){

    errorElement.textContent = "Please enter the first letter as G.";
    return false;

  }else if(size[1] > 62){

    errorElement.textContent = "Please enter your Group number.";
    return false;
    
  }else {
    errorElement.textContent = "";
    // Clear the error message when valid
  }
  return true;
/* const GroupIDInput = document.getElementById("GroupID");
  let GroupIDInputArr = []; // Daclare array for collect data
  const size = GroupIDInputArr.length;
  for(let i =0 ; i<2 ; i++){

    GroupIDInputArr.push(GroupIDInput.charAt(i));

  } 

  console.log('GroupIDInputArr:', GroupIDInputArr);

  if(size !== 2){
      errorElement.textContent = "Please enter your GroupID such as G03.";
      return false;
  } else {
      errorElement.textContent = ""; // Clear the error message when valid
  }
 //Check the format of the input data to see if it matches the format or not. 
  if(GroupIDInputArr[0] !== 'G'){

      errorElement.textContent = "Please enter your GroupID such as G03.";
      return false;

  } else {
      errorElement.textContent = ""; // Clear the error message when valid
 }
 if(GroupIDInputArr[1] < '0' || GroupIDInputArr[1] > '62'){

  errorElement.textContent = "Please enter your GroupID such as G03.";
  return false;

} else {

  errorElement.textContent = ""; // Clear the error message when valid
}*/
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
  validateGroupID();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();


  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail() || !validateGroupID()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    group: formData.get("GroupID").split(" ")[0],
    numgroup: formData.get("GroupID").split(" ")[1],
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  const detailsContainer = document.createElement("div");
  var name = document.getElementById("fullname").value;
  var studentID = document.getElementById("studentID").value;
  var email = document.getElementById("email").value;
  var group = document.getElementById("GroupID").value;
  var title = document.getElementById("workTitle").value;
  var activity = document.getElementById("activityType").value;
  var year = document.getElementById("academicYear").value;
  var semester = document.getElementById("semester").value;
  var start_date = document.getElementById("startDate").value;
  var end_date = document.getElementById("endDate").value;
  var location = document.getElementById("location").value;

  detailsContainer.id = "submission-details";
  detailsContainer.classList.add("element_box");
  
  const detailsContent = `
  <h2>${title}</h2>
  <p>Name : ${name}</p>
  <p>StudentID : ${studentID}</p>
  <p>Email : ${email}</p>
  <p>Group : ${group}</p>
  <p>Title : ${title}</p>
  <p>Activity : ${activity}</p>
  <p>Academic year : ${year}</p>
  <p>Semester : ${semester}</p>
  <p>Start date : ${start_date}</p>
  <p>End date : ${end_date}</p>
  <p>Location : ${location}</p>
`;

detailsContainer.innerHTML = detailsContent;
document.body.appendChild(detailsContainer);

const elementToInsertBefore = document.getElementById("footer");
document.body.insertBefore(detailsContainer, elementToInsertBefore);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + '\n' + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}
  /*try {
    // Send data to the backend using POST request
    const response = await fetch(config.backendUrl + "record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}*/
document.addEventListener("submit", (e) => {
  e.preventDefault();
  
  validateName();
  validateEmail();
  validateStudentID();
  validateGroupID();
});
// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

document.getElementById("myForm").innerHTML = detailsContent;


// Event listeners for input validation on user input
/*document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document
  .getElementById("GroupID")
  .addEventListener("input", validateGroupID);
document.getElementById("email").addEventListener("input", validateEmail);*/
