const urlBase = 'http://cop4331-group17-sp.info/php/api';
const extension = 'php';

let userId = -1;
let firstName = "";
let lastName = "";

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
				userId = jsonObject.id;
		
				//need to completel if statement
				if(userId < 0)
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

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
	firstName = "";
	lastName = "";
	
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;

    
    let tmp = {first_name:firstname,last_name:lastname,username:username,password:password}
	let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + '/register.' + extension;


    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: {
            jsonPayload}
        })
        
	
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
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}
function addUser()
{
	
	
}

function searchUser()
{
	
}

function getContact()
{
	let url = urlBase + '/get_contacts.' + extension;

    // open(method, url, async)
    xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
                console.log("Hello There");

                let placeholder = document.querySelector("#data-output");
                let jsonObject = JSON.parse( xhr.responseText );

                let out = "";

                for(let i=0; i<jsonObject.results.length; i+=4 ){
                    out += `
                        <tr> 
                            <td>${jsonObject.results[i]}</td>
                            <td>${jsonObject.results[i+1]}</td>
                            <td>${jsonObject.results[i+2]}</td>
                            <td>${jsonObject.results[i+3]}</td>
                        </tr>
                    `;
                }
                placeholder.innerHTML = out;
            }
        }
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.querySelector("#data-output").innerHTML = err.message;
    }
}