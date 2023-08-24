# Job board
Job board web app made with ReactJS, TailwindCSS and JAVA. Hosted using Tomcat web server and MySql as DBMS.

## Colors

[Colors](https://coolors.co/d8ddef-a0a4b8-7293a0-45b69c-21d19f)

## API

### Read

**Currently it's run locally !!!**

`/users`
get all users

    curl localhost:8080/users

`/users` with parameters can be used to find specific user

Parameters: *id*, *username*, *name*, *email*, *city*.

    curl localhost:8080/users?name=GuitarPro GET user GuitarPro

    curl localhost:8080/users?email=me@longolo.com GET user Langolo

    curl localhost:8080/users?city=Banja%20Luka GET users from Banja Luka(encode url!)

`/posts`
get all posts

    curl localhost:8080/posts

Parameters: *id* *title* *city* *type*

    curl localhost:8080/posts?city=Banja%20Luka GET posts from Banja Luka(encode url!)


calling /login via POST is used for login authentication


/update via POST to update post data (params : {id, title, qual, about, city, type})


### Register
calling /register via POST method is used to create a new user

    curl -X POST -d "name=MojaKompanija&username=mycomp11&city=Derventa&email=info@mycomp.com&about=empty&password=123456789" localhost:8080/register

If successful this JSON is returned:

    {"success":["mycomp11",1232]}


### Create post

### Delete

/post?delete=true&id=val to delete post

{simular use for /users (delete or update)}

/posts via POST method  to create a new post


### Update

#### User

#### Post