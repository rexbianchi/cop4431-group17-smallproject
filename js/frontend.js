const urlBase = 'http://cop4331-group17-sp.info/php/api';
const extension = 'php';

let userId = -1;
let firstName = "";
let lastName = "";
let pageNum = 1;
let numOfContacts = 0;
let editOrDeleteID = -1;
let editFlag = 0;


// alert box
if (document.getElementById) {
	// Swap the native alert for the custom
	// alert
	window.alert = function (alert_message) {
		custom_alert(alert_message);
	}
}


document.getElementById('prevPage').style.display = "none";

function doLogin() {
	userId = -1;
	firstName = "";
	lastName = "";

	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	//var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	let tmp = { username: login, password: password };
	//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify(tmp);


	let url = urlBase + '/login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.status == 'failure') {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				userId = jsonObject.response.Id;

				firstName = jsonObject.response.FirstName;
				lastName = jsonObject.response.LastName;

				saveCookie();

				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Where the java script should be
function eyeButton() {
	const togglePassword = document.querySelector('#toggle-password');
	const password = document.querySelector('#password');

	togglePassword.addEventListener('click', clickEyeButton);
}
function clickEyeButton() {
	// toggle the type attribute
	const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
	password.setAttribute('type', type);
	// toggle the eye slash icon
	this.classList.toggle('fa-eye-slash');
}

function createAccount() {

	userId = 0;


	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;
	
	document.getElementById("createResult").innerHTML = "";


	let tmp = { first_name: firstname, last_name: lastname, username: username, password: password }
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + '/register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				let jsonObject = JSON.parse(xhr.responseText);

				userId = jsonObject.response.Id;


				if (jsonObject.status == 'failure') {
					document.getElementById("createResult").innerHTML = "Unable to create account";
					return;
				}

				firstName = firstname;
				lastName = lastname;

				saveCookie();

				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doLogout() {
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}
	if (userId < 0) {
		window.location.href = "index.html";
	}
	else {
		document.getElementById("welcomeTitle").innerHTML = "Welcome " + firstName + " " + lastName;
	}
}

function addUser() {
	editFlag = 0;

	let email = document.getElementById("addEmail").value;
	let firstname = document.getElementById("addFirstName").value;
	let lastname = document.getElementById("addLastName").value;
	let phoneNumber = document.getElementById("addPhoneNumber").value;
	document.getElementById("addResult").innerHTML = "";

	if (email == '') {
		document.getElementById("createResult").innerHTML = "Unable to create account";
		return;
	}
	if (firstname == '') {
		document.getElementById("createResult").innerHTML = "Unable to create account";
		return;
	}
	if (lastname == '') {
		document.getElementById("createResult").innerHTML = "Unable to create account";
		return;
	}
	if (phoneNumber == '') {
		document.getElementById("createResult").innerHTML = "Unable to create account";
		return;
	}

	if(email == '')
	{
		document.getElementById("createResult").innerHTML = "Unable to create account";
			return;
	}
	if(firstname == '')
	{
		document.getElementById("createResult").innerHTML = "Unable to create account";
			return;
	}
	if(lastname == '')
	{
		document.getElementById("createResult").innerHTML = "Unable to create account";
			return;
	}
	if(phoneNumber == '')
	{
		document.getElementById("createResult").innerHTML = "Unable to create account";
		return;
	}

	let tmp = { first_name: firstname, last_name: lastname, email: email, phone_number: phoneNumber, user_id: userId }
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + '/add_contact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.status == 'failure') {
					document.getElementById("addResult").innerHTML = "Unable to add contact";
					return;
				}

				document.getElementById("addEmail").value = '';
				document.getElementById("addFirstName").value = '';
				document.getElementById("addLastName").value = '';
				document.getElementById("addPhoneNumber").value = '';

				console.log("Contact added");
				getContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("addResult").innerHTML = err.message;
	}

}

function custom_alert() {

	const ALERT_TITLE = "Delete Confirmation";
	const CONFIRM_BUTTON_TEXT = "Confirm";
	const CANCEL_BUTTON_TEXT = "Cancel";
	const ALERT_MESSAGE = "Are you sure you want to delete this person?";

	// Check if there is an HTML element with
	// an ID of "alert_container".If true, abort
	// the creation of the custom alert.
	let is_alert_container_exist = document.getElementById("alert_container");
	if (is_alert_container_exist) {
		return;
	}

	// Create a div to serve as the alert
	// container. Afterward, attach it to the body
	// element.
	let get_body_element = document.querySelector("body");
	let div_for_alert_container = document.createElement("div");
	let alert_container = get_body_element.appendChild(div_for_alert_container);

	// Add an HTML ID and a class name for the
	// alert container
	alert_container.id = "alert_container";
	alert_container.className = "alert_container";

	// Create the div for the alert_box and attach
	// it to the alert container.
	let div_for_alert_box = document.createElement("div");
	let alert_box = alert_container.appendChild(div_for_alert_box);
	alert_box.className = "alert_box";

	// Set the position of the alert box using
	// scrollTop, scrollWidth, and offsetWidth and makes it so that it is aligned at the middle on the screen
	alert_box.style.top = document.documentElement.scrollTop + "px";
	alert_box.style.left = (document.documentElement.scrollWidth - alert_box.offsetWidth) / 2 + "px";

	// Create h1 to hold the alert title
	let alert_header_tag = document.createElement("h1");
	let alert_title_text = document.createTextNode(ALERT_TITLE);
	let alert_title = alert_box.appendChild(alert_header_tag);
	alert_title.appendChild(alert_title_text);

	// Create a paragraph element to hold the
	// alert message
	let alert_paragraph_tag = document.createElement("p");
	let alert_message_container = alert_box.appendChild(alert_paragraph_tag);
	alert_message_container.textContent = ALERT_MESSAGE;

	// Creates button box to store the buttons
	let div_for_button_box = document.createElement("div");
	let button_box = alert_box.appendChild(div_for_button_box);
	button_box.className = "button_box";
	// Create the CONFIRM button
	let confirm_button_tag = document.createElement("button");
	let confirm_button_text = document.createTextNode(CONFIRM_BUTTON_TEXT);
	let confirm_button = button_box.appendChild(confirm_button_tag);
	confirm_button.className = "confirm_btn";
	confirm_button.appendChild(confirm_button_text);

	// Create the Cancel button
	let cancel_button_tag = document.createElement("button");
	let cancel_button_text = document.createTextNode(CANCEL_BUTTON_TEXT);
	let cancel_button = button_box.appendChild(cancel_button_tag);
	cancel_button.className = "cancel_btn";
	cancel_button.appendChild(cancel_button_text);

	// A click event that if pressed on will close the alert
	cancel_button.addEventListener("click", click_cancel_button);

	// A click event that if pressed will delete the specific user
	confirm_button.addEventListener("click", click_confirm_button);

}
function click_cancel_button() {
	remove_custom_alert();
}
function click_confirm_button() {
	deleteContact();
	remove_custom_alert();
}
function remove_custom_alert() {
	let HTML_body = document.querySelector("body");
	let alert_container = document.getElementById("alert_container");
	HTML_body.removeChild(alert_container);
}

function getContacts() {
	editFlag = 0;
	let url = urlBase + '/get_contacts.' + extension;

	let srch = document.getElementById("search").value;
	document.getElementById("pageNum").innerHTML = pageNum;

	let tmp = { id: userId, page: pageNum, search: srch };
	let jsonPayload = JSON.stringify(tmp);

	let xhr = new XMLHttpRequest();
	// open(method, url, async)
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let placeholder = document.querySelector("#data-output");
				let jsonObject = JSON.parse(xhr.responseText);

				let out = "";
				let contactID;

				let result = jsonObject.response;

				for (let i = 0; i < result.length; i++) {
					contactID = result[i].Id;

					out += `
                        <tr id="${contactID}Element" onmouseenter="revealContactButtons(${contactID})" onmouseleave="concealContactButtons(${contactID})"> 
                            <td>${result[i].FirstName}</td>
                            <td>${result[i].LastName}</td>
                            <td>${result[i].Email}</td>
							<td class="phone-flex">
								<div>${result[i].PhoneNumber}</div>
								<div id="${contactID}"></div>
							</td>
                        </tr>
                    `;
				}
				placeholder.innerHTML = out;
			}
		};
		xhr.send(jsonPayload);

	}
	catch (err) {
		document.querySelector("#data-output").innerHTML = err.message;
	}
	/*
1) ssh root@cop4331-group17-sp.info
2) Password: a.4RavKakBY93vz
3) cd ../var/www/html
4) eval "$(ssh-agent -s)"
5) ssh-add id_rsa
6) Passphrase:  a.4RavKakBY93vz
7) git pull
*/
}

function incrementPageNum() {
	var prevPageDisplay = document.getElementById('prevPage');
	var nextPageDisplay = document.getElementById('nextPage');
	if (prevPageDisplay.style.display === "none") {
		prevPageDisplay.style.display = "block";
	}

	let url = urlBase + '/get_contacts.' + extension;

	let srch = document.getElementById("search").value;
	document.getElementById("pageNum").innerHTML = pageNum;

	let tmp = { id: userId, page: pageNum + 1, search: srch };
	let jsonPayload = JSON.stringify(tmp);

	let xhr = new XMLHttpRequest();
	// open(method, url, async)
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				
				let jsonObject = JSON.parse(xhr.responseText);

				
				if(jsonObject.message === "Records Not Found!"){
					nextPageDisplay.style.display = "none";	
					
				}else{
					pageNum++;
					getContacts();
				}

			}
		};
		xhr.send(jsonPayload);

	}
	catch (err) {
		document.querySelector("#data-output").innerHTML = err.message;
	}


}


function decrementPageNum() {
	var nextPageDisplay = document.getElementById('nextPage');
	var prevPageDisplay = document.getElementById('prevPage')
	if (nextPageDisplay.style.display === "none") {
		nextPageDisplay.style.display = "block";
	}

	if (pageNum - 1 === 1) {

		prevPageDisplay.style.display = "none";
		pageNum--;
		getContacts();
	}
	else {
		pageNum--;
		getContacts();
	}

}


function editMode(ID) {
	editFlag = 1; // turn = 1 later?

	concealContactButtons(ID);
	//let editbttn = document.getElementById("editButton");
	//let trashbttn = document.getElementById("trashButton");

	//editbttn.style.display = "none";
	//trashbttn.style.display = "none";

	//let instance = document.getElementById(editOrDeleteID);

	//let buttons = instance.getElementsByTagName("div");

	//instance.removeChild(buttons);

	let rowID = editOrDeleteID + "Element";

	let rowContent = document.getElementById(rowID);

	let email = rowContent.children[2].innerHTML;
	let firstname = rowContent.children[0].innerHTML;
	let lastname = rowContent.children[1].innerHTML;
	let phoneNumber = rowContent.children[3].children[0].innerHTML;

	let newInput = `
		<td><input class="form-control" type="text" id="newFirstName" value="${firstname}"></td>
		<td><input class="form-control" type="textEmail" id="newLastName" value="${lastname}"></td>
		<td><input class="form-control" type="text" id="newEmail" value="${email}"></td>
		<td class="phone-flex">
			<div><input class="form-control" type="text" id="newPhoneNumber" value="${phoneNumber}"></div>
			<div id="${ID}Edit">
				<div class="flex-row-save">
					<div class="save-box">
						<button type="button" id="saveButton" class="fa fa-check" aria-hidden="true" onclick="saveEdit()"></button>
					</div>
					<div class="cancel-box">
						<button type="button" id="cancelButton" class="fa fa-times" aria-hidden="true" onclick="cancelEdit()"></button>
					</div>
				</div>
			</div>
		</td>
	`

	document.getElementById(rowID).innerHTML = "";
	document.getElementById(rowID).innerHTML = newInput;
}

function cancelEdit() {
	editFlag = 0;
	getContacts();
}

function saveEdit() {

	//$statement->bind_param("ssssi", $in_data["first_name"], $in_data["last_name"], $in_data["email"], $in_data["phone_number"], $in_data["Id"]);

	let url = urlBase + '/edit_contact.' + extension;

	let email = document.getElementById("newEmail").value;
	let firstname = document.getElementById("newFirstName").value;
	let lastname = document.getElementById("newLastName").value;
	let phoneNumber = document.getElementById("newPhoneNumber").value;

	let tmp = { first_name: firstname, last_name: lastname, email: email, phone_number: phoneNumber, Id: editOrDeleteID };
	let jsonPayload = JSON.stringify(tmp);

	let xhr = new XMLHttpRequest();

	xhr.open("PUT", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				console.log("yay it updated!");
				editFlag = 0;

				getContacts();
			}
		};
		xhr.send(jsonPayload);

	}
	catch (err) {
		//document.querySelector("#data-output").innerHTML = err.message;
		editFlag = 0;
		console.log(err.message);
	}
}

function deleteContact() {
	let url = urlBase + '/delete_contact.' + extension;

	let tmp = { Id: editOrDeleteID };
	let jsonPayload = JSON.stringify(tmp);

	let xhr = new XMLHttpRequest();
	// open(method, url, async)
	xhr.open("DELETE", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				console.log("yay it deleted!");
				getContacts();
			}
		};
		xhr.send(jsonPayload);

	}
	catch (err) {
		//document.querySelector("#data-output").innerHTML = err.message;
		console.log(err.message);
	}

	//$(ID).parents("tr").remove();
}

function revealContactButtons(ID) {
	if (editFlag == 1) return;

	let instance = document.getElementById(ID);

	editOrDeleteID = ID;

	let out = `
		<div class="flex-row">
			<div class="edit-box">
				<button type="button" id="editButton" class="fa fa-pencil" aria-hidden="true" onclick="editMode(${ID})"></button>
			</div>
			<div class="delete-box">
				<button type="button" id="trashButton" class="fa fa-trash" aria-hidden="true" onclick="alert()"></button>
			</div>
		</div>
	`;

	//idea, put extra th tag to make it a little bigger, this will allow an extra td tag to be put in 

	instance.innerHTML = out;
}

function concealContactButtons(ID) {
	let instance = document.getElementById(ID);

	let out = ``;

	instance.innerHTML = out;
}
