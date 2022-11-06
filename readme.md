<h1 align="center">Make Users</h1>

<p align="center">a simple crud to create, get by id, get all users, delete, reset password, update user and authenticate user</p>

&nbsp;

<p>BASE URL: localhost:3000/api/users</p>

&nbsp;

<h3>Get all users</h3>
<p>to access this route you need to be authenticated</p>

```https
URL: http://localhost:3000/api/users

result:

[
	{
		"id": "bea329d1-9105-402a-934f-93573d26e035",
		"name": "fulano",
		"email": "fulano@hotmail.com"
	}
]
```

<h3>Get user by id</h3>

```https
URL: http://localhost:3000/api/users/:id

result: 

{
	"id": "bea329d1-9105-402a-934f-93573d26e035",
	"name": "fulano",
	"email": "fulano@hotmail.com"
}
```

<h3>Create user</h3>

```https
URL: http://localhost:3000/api/users/create

body:
  {
    "name": "fulano",
    "email": "fulano@email.com",
    "password": "123456"
  }

result:

{
	"id": "bea329d1-9105-402a-934f-93573d26e035",
	"name": "fulano",
	"email": "fulano@email.com",
	"password": "$2b$08$NQ.C9er9Ldsw/ZuQNvuflOTwv8OlKAu5qBmb15oDWr9vxw2r/hzoC"
}
```

<h3>Update user</h3>
<p>both are optional in body</p>
<p>to access this route you need to be authenticated</p>

```https
URL: http://localhost:3000/api/users/update/:id

body: 
  {
    "name": "fulano2",
    "email": "fulano@hotmail.com"
  }

result: 204 (no content)
```

<h3>Reset password</h3>

```https
URL: http://localhost:3000/api/users/resetpassword/:id

body:
  {
    "newPassword": "1234"
  }

result: 204 (no content)
```

<h3>Delete user</h3>
<p>to access this route you need to be authenticated</p>

```https
URL: http://localhost:3000/api/users/delete/:id

result: 204 (no content)
```

&nbsp;

<h2 align="center">Authenticate</h2>

&nbsp;

<h3>Auth</h3>

```https
URL: http://localhost:3000/api/users/auth

body:
  {
    "email": "fulano@hotmail.com",
    "password": "1234"
  }

result: 

{
	"user": {
		"id": "bea329d1-9105-402a-934f-93573d26e035",
		"name": "fulano",
		"email": "fulano@hotmail.com",
		"password": "$2b$08$BjZ5E0.P2K8i180hKnfs4e6NiZxatuMwpsIxe7AUmh9L4qTa5hmpu"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJlYTMyOWQxLTkxMDUtNDAyYS05MzRmLTkzNTczZDI2ZTAzNSIsImlhdCI6MTY2Nzc0MjA2MCwiZXhwIjoxNjY3NzQ1NjYwfQ.wLJfJ37ZW8sNnRairF0WgyDPAHYREZnyVu-0L1fmaoY"
}
```