# restaurant-management-server

## Daily Dish
### Edit daily dish: 				  

`PUT /api/dailyDishes?day=2019-05-04&session=none&dishId=2`

**body:** status?, price?

### Get all daily dish: 			

`GET /api/dailyDishes?length=2&offset=3`

**query:** length?, offset?


### Delete daily dish: 				

`DELETE /api/dailyDishes?day=2019-05-04&dishId=2&session=none`

### Create daily dish:				

`POST /api/dailyDishes`

**body:** day?, dishId, session? status?, price?

### Get by:

`GET /api/dailyDishes/getBy?day=2019-05-04&dishId=2&session=none`

**query:** day?, dishId?, session? status?, price?, length?, offset?

## User

### Register:

`POST /api/users/register`

**body:** username, password, email, fullName?, birthday?

### Login:

`POST /api/users/login`

**body:** usernameOrEmail, password

### GetByUuid:

`GET /api/users/uuid/:uuid`

### GetByUsername: 					  

`GET /api/users/:username`

### GetByEmail: 					    

`GET /api/users/email/:email`

### GetAll: 						      

`GET /api/users/users?offset=1&length=2`

**query:** length?, offset?

### EditProfile:					    

`PUT /api/users/:username`

**body:** email?, fullName?, birthday?
