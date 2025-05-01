
Sure! Below is a clean and professional `README.md` for your Next.js Notes app project, with clear structure, technology stack, usage instructions, route info, and Postman testing details:

---

# NotesBook 

A full-stack **Notes App** built with **Next.js**, allowing users to sign up, log in (with email/password or Google), and manage their personal notes in a dashboard. Authentication is required to access the dashboard and perform note operations.

##  Live Demo

**Deployed on Vercel**: [https://notesbook-roan.vercel.app/](https://notesbook-roan.vercel.app/)

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase (Google Login), JWT, bcryptjs
- **Database**: MongoDB (with Mongoose)
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify

---

##  Folder Structure

### Frontend Routes (in `/app` directory):

| Path                                | Purpose                |
|-------------------------------------|------------------------|
| `app/login/page.js`                | Login page             |
| `app/signup/page.js`               | Signup page            |
| `app/profile/page.js`              | User profile           |
| `app/notes/allnotes/page.js`       | View all notes         |
| `app/notes/create/page.js`         | Create a new note      |
| `app/notes/edit/[id]/page.js`      | Edit a note            |
| `app/notes/view/[id]/page.js`      | View a single note     |

### Components & Utilities:

- `src/components/` – Reusable React components
- `src/lib/firebase.js` – Firebase configuration
- `src/utility/googleLogin.js` – Google login utility function

---

##  Backend API Routes (in `/app/api`):

| Route                                      | Method     | Description                          |
|-------------------------------------------|------------|--------------------------------------|
| `/api/auth/signup`                        | `POST`     | Register a new user                  |
| `/api/auth/signin`                        | `POST`     | Sign in user with email & password   |
| `/api/auth/logout`                        | `GET`      | Logout the user                      |
| `/api/auth/google`                        | `POST`     | Login/register via Google OAuth      |
| `/api/notes`                               | `GET/POST` | Get all notes / Create new note      |
| `/api/notes/[id]`                          | `PUT/DELETE` | Update or delete a note by ID      |

### Models (in `app/api/model/`):

- `User.js` – Mongoose schema for users
- `Notes.js` – Mongoose schema for notes

---

##  Authentication

- **JWT-based authentication** is used to protect note-related routes.
- The token is stored and sent in **HTTP-only cookies**.
- Google login is handled via **Firebase**, and integrated with the app backend for storing user data.

---

## Postman API Testing

### 1. **Signup**

**POST** `/api/auth/signup`  
**Body** (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### 2. **Signin**

**POST** `/api/auth/signin`  
**Body** (JSON):
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### 3. **Google Login**

**POST** `/api/auth/google`  
**Body** (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/image.jpg"
}
```

---

### 4. **Create Note**

**POST** `/api/notes`  
**Headers**:
```
Cookie: token=your_jwt_token
```

**Body** (JSON):
```json
{
  "title": "My First Note",
  "content": "This is the content of the note."
}
```

---

### 5. **Get All Notes**

**GET** `/api/notes`  
**Headers**:
```
Cookie: token=your_jwt_token
```

---

### 6. **Edit Note**

**PUT** `/api/notes/{id}`  
**Headers**:
```
Cookie: token=your_jwt_token
```

**Body** (JSON):
```json
{
  "title": "Updated Note Title",
  "content": "Updated content of the note."
}
```

---

### 7. **Delete Note**

**DELETE** `/api/notes/{id}`  
**Headers**:
```
Cookie: token=your_jwt_token
```

---

##  Protected Features

You **must be logged in** (JWT token required) to:

- Access the dashboard
- View all notes
- Create, edit, or delete notes
- View user profile

---

## Author

**Md Shamim Akhter**    
[GitHub](https://github.com/techjmi)
visit More Website By Author :https://learningblog.fun/
---