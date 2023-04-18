# job-posting-web-app
Job posting web app made with JS JAVA, hosted using Tomcat server and MySql for storing data

## Colors

[Colors](https://coolors.co/d8ddef-a0a4b8-7293a0-45b69c-21d19f)

Main : 
BG:


## URI

/users

return all users

/users with parameters can be use to find specific user, update or delete user

calling /register via POST method is used to create a new user

calling /login via POST is used for login authentication


/posts get json of all available  posts

/posts?param=val to search for specific search

/post?update=true&where=val&what=val to update

/post?delete=true&id=val to delete post 

{simular use for /users (delete or update)}

/posts via POST method  to create a new post (TODO)
