<h1 align="center">Routes</h1>

<br>

<h3>Base url: localhost:3000/api</h3>

<br>

### Users:

1. **`/users/create`**: Create a new user, sending, name, email and password

2. **`/users/resetpassword/:id`**: Reset password, sending newPassword

to use the routes below you need to be logged in and send a barear token which is given to you after logging in

1. **`/users/all`**: List all users.

2. **`/users/`**: Get user logged id by the request id.

3. **`/users/update`**: Update user logged in by request id and send information for update, information can be sent user and email both are optional

4. **`/users/delete/:id`**: Delete user by id sendend

5. **`/users/avatar`**: Update avatar user getting a multipart with avatar as prefix and value as image

### Auth:

1. **`/auth`**: Authenticating the user, just send the correct email and password

### Admin:

1. **`/admin`**: Update the admin, for that the logged in user needs to be an admin and send the parameters, email and admin (true or false)

2. **`/admin/list`**: Lists all admins, for that it needs to be a logged in admin