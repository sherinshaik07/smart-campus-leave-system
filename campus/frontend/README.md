# Smart Campus Leave & Exit Management System 🎓🚪

A full-stack web application designed to digitize and streamline the traditional college leave process. It replaces paperwork and manual communication with a multi-level approval workflow, digital OTP exit passes, and real-time tracking.

## 📖 Problem Statement
Traditional college leave processes rely heavily on paperwork and manual communication, making leave approval and student exit tracking difficult to manage efficiently. Tracking whether a student has actually left the campus is also a major security concern.

## 💡 Solution
A centralized platform where students submit leave requests, mentors and HODs approve them digitally, and a secure 6-digit OTP-based exit pass is generated. The gatekeeper (watchman) verifies this OTP to record the exit, ensuring complete campus security and an unbroken audit trail.

---

## 🛠️ Tech Stack

**Backend:**
* Java 21
* Spring Boot 3
* Spring Security & JWT (JSON Web Tokens)
* Spring Data JPA & Hibernate
* Spring Boot Mail (Gmail SMTP)

**Frontend:**
* React.js
* React Router
* Axios
* Tailwind CSS

**Database & Tools:**
* MySQL (Database)
* Git & GitHub
* Postman
* Maven

---

## 👥 User Roles & Features

* **Student:** Registers, applies for leave, tracks approval timeline, receives OTP on email, shows OTP at the gate.
* **Mentor:** Views pending requests, approves or rejects with a reason.
* **HOD:** Final approver, generates a 6-digit OTP upon approval.
* **Watchman:** Verifies OTP at the gate, records exit time.
* **Admin:** Views system-wide statistics, all users, all leave requests, and the complete audit trail.

---

## 🔄 Approval Workflow

1. **Student** submits a leave request.
2. **Mentor** reviews and approves/rejects (with reason).
3. **HOD** reviews and gives final approval.
4. **System** generates a 6-digit OTP and emails it to the student.
5. **Student** arrives at the gate and provides the OTP.
6. **Watchman** verifies the OTP and the exit is recorded.

---

## 🔌 API Endpoints

All endpoints (except Authentication and Registration) require a valid JWT Token in the `Authorization` header (`Bearer <token>`).

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | Authenticate and receive JWT token | Public |

### 🎓 Student (`/api/student`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/leave` | Submit a new leave request | Student |
| `GET` | `/leaves` | Get the logged-in student's leave history | Student |

### 🧑‍🏫 Mentor (`/api/mentor`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/pending` | Get all leaves pending mentor approval | Mentor |
| `GET` | `/history` | Get all leave history | Mentor |
| `PUT` | `/approve/{id}` | Approve a specific leave request | Mentor |
| `PUT` | `/reject/{id}` | Reject a leave request (requires reason) | Mentor |

### 🏛️ HOD (`/api/hod`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/pending` | Get leaves approved by mentor, pending HOD | HOD |
| `GET` | `/history` | Get all leave history | HOD |
| `PUT` | `/approve/{id}` | Final approval (Generates 6-digit OTP) | HOD |
| `PUT` | `/reject/{id}` | Reject a leave request (requires reason) | HOD |

### 🚪 Watchman (`/api/watchman`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/scan` | Verify OTP and record student exit | Watchman |

### 👑 Admin (`/api/admin`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/leaves` | View all leave requests in the system | Admin |
| `GET` | `/users` | View all registered users | Admin |
| `GET` | `/stats` | Get system statistics (Total, Pending, etc.) | Admin |

---

## 🔒 Key Security & Technical Highlights

* **JWT Authentication:** Secure, stateless authentication with role-based access control (RBAC).
* **BCrypt Hashing:** All user passwords are securely hashed before database storage.
* **OTP Security:** OTPs are valid for 2 hours and are strictly **one-time-use**.
* **Concurrency Control:** Transactional database logic is used to prevent race conditions during OTP verification (prevents duplicate gate scans).
* **Smart Email Routing:** 
  * *Demo Mode:* Emails are skipped for `@college.edu`, `.in`, or `.edu` domains. OTP is shown on screen for testing.
  * *Production Mode:* Real students receive real OTPs via Spring Boot Mail.

---

## 🔑 Demo Accounts (For Testing)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | `student@cse.in` | `123456` |
| **Mentor** | `mentor@clg.in` | `123456` |
| **HOD** | `hod@clg.in` | `123456` |
| **Watchman**| `watchman@clg.in` | `123456` |
| **Admin** | `admin@clg.in` | `123456` |

*(Note: Because these demo emails end with `.in`, the system skips sending real emails and displays the OTP directly on the screen for easy testing).*

---

## ⚙️ Local Setup & Installation

### Prerequisites
* Java 21
* Node.js & npm
* MySQL

### 1. Database Setup
Create a MySQL database named `smart_campus_db`.

### 2. Backend Setup
1. Navigate to the `backend` folder.
2. Rename `application.properties.example` to `application.properties`.
3. Fill in your local database credentials and Gmail App Password in the `application.properties` file.
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run

3. **Frontend Setup:** Navigate to the `frontend` folder. Run `npm install` and then `npm start`.

---
*Developed by Shaik Sherin*