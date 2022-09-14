const urlBase = 'http://cop4331-group17-sp.info/php/api';
const extension = 'php';

let userId = -1;
let firstName = "";
let lastName = "";
let pageNum = 1;
let numOfContacts = 0;

// alert box
	if (document.getElementById) {
		// Swap the native alert for the custom
		// alert
		window.alert = function (alert_message) {
			custom_alert(alert_message);
		}
	}
function doLogin()
{
	userId = -1;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	//var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {username:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	
	let url = urlBase + '/login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				
				let jsonObject = JSON.parse( xhr.responseText );

				
		
				
				if(jsonObject.status == 'failure')
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
				
				userId = jsonObject.reponse.Id; //type Needs to be changed.
		
				firstName = jsonObject.response.FirstName;
				lastName = jsonObject.response.LastName;

				saveCookie();
	
				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function createAccount()
{

    userId = 0;
	/*
	firstName = "";
	lastName = "";
	*/
	
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;
	document.getElementById("createResult").innerHTML = "";

	
    
    let tmp = {first_name:firstname,last_name:lastname,username:username,password:password}
	let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + '/register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.response.Id;
		
				
				if(jsonObject.status == 'failure')
				{		
					document.getElementById("createResult").innerHTML = "Unable to create account";
					return;
				}
		
				firstName = jsonObject.response.FirstName;
				lastName = jsonObject.response.LastName;

				saveCookie();
	
				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}


	
/*
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: {
            jsonPayload}
        })
        
*/	
}


function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("welcomeTitle").innerHTML = "Welcome " + firstName + " " + lastName;
	}
}

function addUser()
{
	
}

function searchUser()
{
	
}
function custom_alert(){

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
		 let alert_title= alert_box.appendChild(alert_header_tag);
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
function click_cancel_button(){
	remove_custom_alert();
}
function click_confirm_button(){
	deleteUser();
	remove_custom_alert();
}
function remove_custom_alert() {
	let HTML_body = document.querySelector("body");
	let alert_container = document.getElementById("alert_container");
	HTML_body.removeChild(alert_container);
}
function deleteUser()
{

}

function getContacts()
{
	let url = urlBase + '/get_contacts.' + extension;

	let srch = document.getElementById("search").value;
	document.getElementById("pageNum").innerHTML = pageNum;
	
	let tmp = {id:userId,page:pageNum,search:srch};
	let jsonPayload = JSON.stringify( tmp );

	let xhr = new XMLHttpRequest();
    // open(method, url, async)
    xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
                let placeholder = document.querySelector("#data-output");
                let jsonObject = JSON.parse( xhr.responseText );

                let out = "";

				let result = jsonObject.response;

                for(let i=0; i<result.length; i++ ){
                    out += `
                        <tr> 
                            <td>${result[i].FirstName}</td>
                            <td>${result[i].LastName}</td>
                            <td>${result[i].Email}</td>
                            <td>${result[i].PhoneNumber}</td>
                        </tr>
                    `;
                }
                placeholder.innerHTML = out;
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
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

function incrementPageNum()
{
	pageNum++;
	getContacts()
}

function decrementPageNum()
{
	pageNum--;
	getContacts()
}