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

### Register [^2]

calling /register via POST method is used to create a new user

```powershell
curl -X POST -d "name=MojaKompanija&username=mycomp11&city=Derventa&email=info@mycomp.com&about=empty&password=123456789" localhost:8080/register
```

If successful this JSON is returned:

```JSON
{
    "success": ["mycomp11",1232]
}
```

New session is opened for user

### Login [^2]

calling /login via POST is used for login authentication

```powershell
curl -X POST -d "username=tritol22&password=123456789" localhost:8080/login
```

```JSON
{
    "success": ["tritol22",1123]
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
    "success": 6744
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
    "response": 1
}
```

Use this as a binary confirmation.


### Update


#### User

```powershell
```

#### Post

```powershell

```

/update via POST to update post data (params : {id, title, qual, about, city, type})

[^1]: **Examples are run locally for now!!!**

[^2]: **Currently unsafe!** this issue will be addressed in [#42](https://github.com/Blagoja95/job-board-web-app/issues/42)