# Job board

Job board web app made with ReactJS, TailwindCSS and JAVA. Hosted using Tomcat web server and MySql as DBMS.

## Colors

[Colors](https://coolors.co/d8ddef-a0a4b8-7293a0-45b69c-21d19f)

## API [^1]

### GET

`/users`
get all users

```powershell
curl localhost:8080/users
```

`/users` with parameters can be used to find specific user

Parameters: *id*, *username*, *name*, *email*, *city*.

```powershell

curl localhost:8080/users?name=GuitarPro GET user GuitarPro

curl localhost:8080/users?email=me@longolo.com GET user Langolo

curl localhost:8080/users?city=Banja%20Luka GET users from Banja Luka(encode url!)
```

Response JSON:

```JSON
{
  "results": 1,
  "users": [
    {
      "city": "Banja Luka",
      "name": "GuitarPro",
      "about": "Prodajemo gitare!",
      "id": 1881,
      "email": "info@guitarpro.com",
      "username": "guitar22"
    }
  ]
}
```

`/posts`
get all posts

```powershell

curl localhost:8080/posts
```

Parameters: *id* *title* *city* *type*

```powershell

curl localhost:8080/posts?city=Banja%20Luka GET posts from Banja Luka(encode url!)
```

```JSON
{
	"results":2,
	"posts":[
		{
			"date":"2022-08-15",
			"companyID":"1123",
			"city":"Banja Luka",
			"companyName":"Tritol doo",
			"about":"InterPO je u potrazi za strucnim i motivisanim web programerom koji ce se pridruziti na?em timu. Kao web programer u InterPO-u, vasa uloga bice da radite na razvoju i odr?avanju visokokvalitetnih web aplikacija za nase klijente. Va?e zaduzenje ?e obuhvatiti pisanje cistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web resenja.",
			"qual":"Trazimo osobu koja poseduje iskustvo u programiranju na front-end i\/ili back-endu i koja poznaje razlicite tehnologije kao sto su HTML, CSS, JavaScript, PHP i MySQL. Takodje, vazno nam je da imate iskustvo u radu sa razlicitim razvojnim alatima i okvirima kao sto su React, Angular, Vue.js, Laravel, Symfony i slicno.",
			"id":12301,
			"title":"Potreban WEB programer",
			"type":"Remote"
		},
		{
			"date":"2023-04-29",
			"companyID":"1149",
			"city":"Banja Luka",
			"companyName":"BestTri",
			"about":" ...",
			"qual":"- dobro poznavanje rada sa Adobe Ilustratorom i Photoshop-om,\n- osnovno poznavanje rada sa ostalim Adobe alatima\n",
			"id":5848,
			"title":"Trazi se Graficki dizajner",
			"type":"Remote"
		}
	]
}
```

If no user or posts are found, users or posts property with empty array is returned.

```powershell
curl localhost:8080/users?name=notAnUser
```

```JSON
{
  "results": 0,
  "posts": []
}
```

If using incorrect request following response is returned:

```JSON
{
  "results": 0,
  "info": "Wrong request!"
}
```

### Login and registration of users

#### Register [^2]

calling /register via POST method is used to create a new user

```powershell
curl -X POST -d "name=MojaKompanija&username=mycomp11&city=Derventa&email=info@mycomp.com&about=empty&password=123456789" localhost:8080/register
```

If successful this JSON is returned:

```JSON
{
    "register" :
    {
        "success": ["mycomp11",604],
        "status": 1
    }
}
```

New session is created for newly created user

#### Login [^2]

calling /login via POST is used for login authentication

```powershell
curl -X POST -d "username=tritol22&password=123456789" localhost:8080/login
```

```JSON
{
    "login":
    {
        "success":["tritol22",1123],
        "status":1
    }
}
```

New session is created for loged user

#### Hendling wrong requests

##### No paramateres

If login or register request is send without parameters

```powershell
curl -X POST localhost:8080/login

// or

curl -X POST localhost:8080/register

```

error json response is returned

```JSON
{
  "register": // or login
  {
    "status": 0,
    "info": "Incorrect or missing parameters!"
  }
}
```

##### Empty parameters value

If any of paramater is empty string

```powershell
curl -X POST -d "name=Tritol&email=" localhost:8080/register
```

Error JSON response is returned

```JSON
{
  "register": 
    {
      "status": 0,
      "info": "Email is empty!"
    }
}
```

##### No user

On login if no user is found following json response is returned

```JSON
{
    "login":
    {
        "status":0,
        "info":"There is no user with provided credentials!"
    }
}
```

#### Incorect password

If password is wrong following json response is returned

```JSON
{
    "login":
    {
        "status":0,
        "info":"Incorrect password!"
    }
}
```

### Create post

Create network request using POST method

Requested parameters: *companyID*, *companyName*, *title*, *type*, *city*, *about* and *qual*

```powershell
curl -X POST -d "companyID=1123&companyName=Tritol DOO&title=Test title&type=full time&city=Trebinje&about=Loking for&qual=Java" localhost:8080/posts
```

If successful response JSON with new post ID will return

```JSON
{
    "posts":
    {
        "id":8717,
        "status":1
    }
}
```

If no parameters provided

```JSON
{
    "register":
    {
        "status":0,
        "info":"No parameters provided!"
    }
}
```

If any of parameter is empty:

```JSON
{
    "register":
    {
        "status":0,
        "info":"About is empty!"
    }
}
```
### Delete [^2]

Create network request using DELETE method

Request parameter is *id* of the desired post or user.

#### Post

```powershell
curl -X DELETE localhost:8080/posts?id=1686
```

#### User

```powershell
curl -X DELETE localhost:8080/users?id=971
```

#### Response

If successful response JSON with number that is greater than zero (rows affected) is return.

```JSON
{
  "response": 1
}
```

If unsuccessful then zero is return

```JSON
{
  "response": 0
}
```

Use this as a binary confirmation.

### Update

Send POST request on `/users/update` or `/posts/update`

#### User

Paramaters that can be updated[^3]: *name*, *email*, *about* and *city*

```powershell
curl -X POST -d "id=1123&name=NEW NAME&email=new@new.com&about=...&city=NEW CITY" localhost:8080/users/update
```

Response json:

```json
{
    "update":
    {
        "id":1123,
        "status":1,
        "info":"User profile is successfully updated!"
    }
}
```

Status property can be `0` or `1`. Use this as a binary confirmation of a request success.

Let us check result of an update

```powershell
curl localhost:8080/users?id=1123
```

Before:

```json
{
    "results":1,
    "users":
    [
        {
            "city":"Banja Luka",
            "name":"Tritol doo",
            "about":"Tritol kompanija Banja Luka",
            "id":1123,
            "email":"email@tritol.me",
            "username":"tritol22"
        }
    ]
}
```

After update:

```json
{
    "results":1,
    "users":
    [
        {
            "city":"NEW CITY",
            "name":"NEW NAME",
            "about":"...",
            "id":1123,
            "email":"new@new.com",
            "username":"tritol22"
        }
    ]
}
```

#### Post

Paramaters that can be updated[^3]: *title*, *type*, *about*, *city* and *qual* (qualification). 

```powershell
 curl -X POST -d "id=10000&title=NEW TITLE&type=NEW TYPE&city=Laktasi&about=...&qual=..." localhost:8080/posts/update
```

Response json:
```JSON
{
    "update":
    {
        "id":10000,
        "status":1,
        "info":"Post is successfully updated!"
    }
}
```

Status property can be `0` or `1`. Use this as a binary confirmation of a request success.

Let us check result of an update

```powershell
curl localhost:8080/posts?id=10000
```

Before

```json
{
    "results":1,
    "posts":
    [
        {
            "date":"2022-12-12",
            "companyID":"293",
            "city":"Laktasi",
            "companyName":"Longolo",
            "about":"Trazi se programer sa 2 godine iskustva u java i java script tehnologijama",
            "qual":"srednja strucna sprema",
            "id":10000,
            "title":"Trazi se programer",
            "type":"Stalno zaposlenje"
        }
    ]
}
```

After update

```json
{
    "results":1,
    "posts":[
        {
            "date":"2022-12-12",
            "companyID":"293",
            "city":"Laktasi",
            "companyName":"Longolo",
            "about":"...",
            "qual":"...",
            "id":10000,
            "title":"NEW TITLE",
            "type":"NEW TYPE"
        }
    ]
}
```

#### Handling incorrect requests

When no parmaters is provided
```JSON
{
    "update":
    {
        "status":0,
        "info":"No parameters provided!"
    }
}
```

When any of a parameters are empty

```JSON
{
    "update":
    {
        "status":0,
        "info":"Title is empty!"
    }
}
```

/update via POST to update post data (params : {id, title, qual, about, city, type})

[^1]: **Examples are run locally for now!!!**

[^2]: **Currently unsafe!** this issue will be addressed
in [#42](https://github.com/Blagoja95/job-board-web-app/issues/42)

[^3]: **PRONE TO CHANGE** What can be update and how it will be updated will probably be changed in future