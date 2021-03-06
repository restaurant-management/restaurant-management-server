# Some Enums

### Permission

```
role-management
user-management
bill-management
create-bill
update-preparing-bill-status
update-paid-bill-status
update-prepare-done-bill-status
update-delivering-bill-status
update-shipping-bill-status
update-Complete-bill-status
dish-management
daily-dish-management
```

### BillStatus

```
created
paid
preparing
prepare-done
delivering
shipping
complete
```

### DaySession

```
none
morning
noon
afternoon
evening
```

### DailyDishStatus

```
in-stock
out-of-stock
```

### TableStatus

```
free
full
```

# User

### Register:

`POST /api/users/register`

**body:** username, password, email, fullName?, birthday?

### Login:

`POST /api/users/login`

**body:** usernameOrEmail, password

### Get By Uuid:

`GET /api/users/uuid/:uuid`

### Get By Username: 					  

`GET /api/users/:username`

### Get By Email: 					    

`GET /api/users/email/:email`

### Get All: 						      

`GET /api/users/users?offset=1&length=2`

**query:** length?, offset?

### Edit Profile:					    

`PUT /api/users/:username`

**Need token with permission:** `user-management` or login with user have username equal to query param username

**body:** email?, fullName?, birthday?, avatar?

### Change password:

`PUT /api/users/:username/password`

**Need token with permission:** `user-management` and don't need old password.

**If token don't have that permission:** User of token have to be user in param and old password is required.

**body:** newPassword, oldPassword?

### Add permission:

`POST /api/users/:usename/permissions/:permission`

`POST /api/users/hierenlee/permissions/update-bill-status`

### Remove permisson:

`DELETE /api/users/:username/permissions/:permission`

`DELETE /api/users/hierenlee/permissions/update-bill-status`

### Change role:

`PUT /api/users/:username/role/:role-slug`

# Daily Dish

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

**query:** day?, dishId?, session?, length?, offset?

# Role

### Create role

`POST /api/roles`

**body:** name, slug?, description?, permission?

### Edit role

`PUT /api/roles/:role-slug`

**body:** slug?, name?, description?

### Get all role

`GET /api/roles`

### Get by slug

`GET /api/roles/:role-slug`

### Delete role

`DELETE /api/roles/:role-slug`

### Add permission

`POST /api/roles/:role-slug/permissions/:permission`

`POST /api/roles/staff/permissions/user-management`

### Delete permission

`DELETE /api/roles/:role-slug/permissions/:permission`

`DELETE /api/roles/staff/permissions/user-management`

# Dish

### Create dish

`POST /api/dishes`

**body:** name, description?, images?, defaultPrice?

### Delete dish

`DELETE /api/dishes/:dishId`

### Get by id

`GET /api/dishes/:dishId`

### Edit dish

`PUT /api/dishes/:dishId`

**body:** name?, description?, images?, defaultPrice?

### Get all

`GET /api/dishes`

# Bill

### Get All

`GET /api/bills`

**query:** length?, offset?

### Get all user bill

`GET /api/bills/user/:username`

**query:** length?, offset?

### Create bill

`POST /api/bills`

**Need Token**

**body:** dishIds, prices, quantities? (quantities.length, prices.length have to equal dishIds.length)

### Create custom bill (for Admin/Moderator)

`POST /api/bills/custom`

**body:** dishIds, day?, status?

### Edit bill

`PUT /api/bills/:billId`

**body: **day?, status?

### Update bill status

 **Just apply for bill-management**

`PUT /api/bills/:billId/created`

**Need corresponding permission:**

`PUT /api/bills/:billId/paid`

`PUT /api/bills/:billId/preparing`

`PUT /api/bills/:billId/prepare-done`

`PUT /api/bills/:billId/shipping`

`PUT /api/bills/:billId/complete`

### Get bill

`GET /api/bills/:billId`

**query:** length?, offset?

### Delete bill

`DELETE /api/bills/:billId`

### Add dish to bill

`POST /api/bills/4/dishes/2`

`POST /api/bills/:billId/dishes/:dishId`

### Remove dish to bill

`DELETE /api/bills/4/dishes/2`

`DELETE /api/bills/:billId/dishes/:dishId`
