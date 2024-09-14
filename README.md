<img width="1428" alt="Captura de pantalla 2024-09-15 a la(s) 3 22 59 a  m" src="https://github.com/user-attachments/assets/1220d066-50c6-443e-a198-35a98e3efb22">

# TaskApp Install

- pnpm install

## Setup Frontend

### Run
- pnpm nx run task-web:serve


# TaskApp Backend

This API allows managing users and tasks, providing authentication, task assignment, and user role management.

## Setup Backend

### Step 1: Create Database Container
Navigate to the root folder and execute the following command to create a container for the database:

```bash
sh tools/scripts/sql-start.sh
```

### Step 2: Navigate to the API
Move to the task API directory:

```bash
cd apps/task-api
```

### Step 3: Apply Migrations
Run the following command to apply the database migrations:

```bash
sh migrations-apply.sh
```

### Step 4: Apply Seeders
Execute the following command to seed the database with initial data:

```bash
sh seeder-apply.sh
```

## Running the Backend

To start the server, navigate to the root folder and run:

```bash
pnpm nx run task-api:serve:development
```

The server will be accessible at `http://localhost:3333`.

## API Documentation

### Base URL
All endpoints are prefixed with:

```
http://localhost:3333
```

### Authentication

Most API endpoints require authentication using Bearer tokens. To get a token, use the `/api/login` endpoint as described below.

### Endpoints

---

#### **Login**
- **URL**: `POST /api/login`
- **Description**: Authenticate and receive a Bearer token.
  
**Request Body**:
```json
{
  "email": "admin@seed.com",
  "password": "password"
}
```

**Response**:
```json
{
  "token": "your_generated_token"
}
```

Use this token to authorize requests by including it in the `Authorization` header.

---

### **Users**

#### Get All Users
- **URL**: `GET /api/users`
- **Authorization**: Bearer token required

**Response**:
```json
{
  "results": [
    {
      "id": "user_id_1",
      "email": "admin@seed.com",
      "roles": ["admin"],
      "username": "John Doe Admin"
    },
    {
      "id": "user_id_2",
      "email": "johndoe@example.com",
      "roles": ["user"],
      "username": "michaellidno"
    }
  ]
}
```

#### Update User Profile
- **URL**: `POST /api/users/update-profile`
- **Authorization**: Bearer token required

**Request Body**:
```json
{
  "username": "Mike",
  "roles": ["admin"]
}
```

**Response**:
```json
{
  "ok": true,
  "userId": "user_id_3"
}
```

#### Create User
- **URL**: `POST /api/users`
- **Authorization**: Bearer token required

**Request Body**:
```json
{
  "username": "MichaelHenao",
  "email": "mayxool2.11@example.com",
  "password": "your_secure_password"
}
```

**Response**:
```json
{
  "ok": true,
  "user": "new_user_id"
}
```

---

### **Tasks**

#### Get All Tasks
- **URL**: `GET /api/tasks`
- **Authorization**: Bearer token required

**Response**:
```json
{
  "results": [
    {
      "id": "task_id_1",
      "title": "task1",
      "description": "short description",
      "status": "pending",
      "user_id": "user_id_2",
      "createdAt": "2024-09-14T07:02:18.000Z",
      "updatedAt": "2024-09-14T07:02:18.000Z"
    }
  ]
}
```

#### Create Task
- **URL**: `POST /api/tasks`
- **Authorization**: Bearer token required

**Request Body**:
```json
{
  "title": "task1",
  "description": "short description",
  "status": "pending",
  "user_id": "user_id_3"
}
```

**Response**:
```json
{
  "ok": true,
  "task": "new_task_id"
}
```

#### Update Task
- **URL**: `PATCH /api/tasks/{taskId}`
- **Authorization**: Bearer token required

**Request Body**:
```json
{
  "title": "updated_task_title",
  "description": "long description",
  "status": "completed",
  "user_id": "user_id_2"
}
```

**Response**:
```json
{
  "ok": true,
  "task": "updated_task_id"
}
```

---

## Notes
- Ensure your environment is properly set up with all dependencies.
- The API uses JWT tokens for secure authentication, so make sure to handle tokens properly when making requests.

