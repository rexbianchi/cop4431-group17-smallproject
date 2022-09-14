const urlBase = 'http://cop4331-group17-sp.info/php/api';
const extension = 'php';

let userId = -1;
let firstName = "";
let lastName = "";
let pageNum = 1;
let numOfContacts = 0;

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
				userId = jsonObject.response.Id; //type Needs to be changed.
		
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