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

1. **`/admin/update`**: Update the admin, for that the logged in user needs to be an admin and send the parameters, email and admin (true or false)

2. **`/admin/list`**: Lists all admins, for that it needs to be a logged in admin

### Products:

1. **`/product`**: List all products

2. **`/product/:id`**: List a especific product with id

3. **`/product/image/:id`**: List a especific image with id

4. **`/product/:id/images`**: List all images with especific product id

to use the routes below you need to be logged in as an admin and send a barear token which is given to you after login

1. **`/product/create`**: Create product and for that you need to send, the name, description, price and amount

2. **`/product/create/images/:id`** Create images with especific product_id and send by a mutlipart/form-data with the name images

3. **`/product/delete/:id`**: Delete a nproduct with a especific id

4. **`/product/delete/image/:id`** Delete an image with a specific id