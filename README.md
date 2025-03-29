# **Job Portal System - Full-Stack CRUD Application Development with DevOps Practices**

## **Objective**

This project expands on an initial starter project  **Node.js, React.js, and MongoDB**. implementing full CRUD operations **(Create, Read, Update, Delete) operations** for a real-world Job Portal System application. This system enables job posting, application management, and employer profile handling, following industry-standard best practices including:

* **Project Management with JIRA**
* **Requirement Diagram using SysML**
* **Version Control using GitHub**
* **CI/CD Integration for Automated Deployment**

## **Requirements**

### **1. Choose a Real-World Application**

The Job Portal System allows authenticated employers to:

Post job listings

Manage job applications

Update employer profiles

### **2. Project Management with JIRA and SysML**

* Create a **JIRA project** and define:
  * **Epic** Job Management, Application Processing, Profile Management
  * **User Stories** Posting jobs, Viewing applicants, Managing employer profiles
  * **Child issues & Subtasks** Broken down development tasks such as UI creation, form validation, backend integration
  * **Sprint Planning** Organized into manageable sprints, tracked through JIRA
* Document your JIRA **https://zhang314hh.atlassian.net/jira/software/projects/JPS/boards/3/backlog** in the project README.
* Draw a requirements diagram

### **3. Backend Development (Node.js + Express + MongoDB)**

* Create a user-friendly interface to interact with API**Adding and updating job listings, Managing job applications, Employer profile CRUD operations**
* Implement **forms** for adding and updating records.
* Display data using  **tables, cards, or lists**

### **4. Frontend Development (React.js)**

* Create a user-friendly interface to interact with API **Posting and editing job listings, Viewing and managing applications, Editing employer profiles**.
* Implement **forms** for adding, showing, deleting and updating records.
* Display data using  **tables, cards, or lists**

### **5. Authentication & Authorization**

* Ensure **only authenticated users** can access and perform CRUD operations.
* Use **JWT (JSON Web Tokens)** for user authentication (Use the task manager one from .env file).

### **6. GitHub Version Control & Branching Strategy**

* Use **GitHub for version control** and maintain:
  * `main` branch (stable production-ready code)
  * Feature branches (`feature/application-management`) for each new functionality
* Follow proper **commit messages** and  **pull request (PR) reviews** .

### **7. CI/CD Pipeline Setup**

* Implement a **CI/CD pipeline using GitHub Actions** to:
  * Automatically **run tests** on every commit/pull request (Optional).
  * Deploy the **backend** to **AWS** .
  * Deploy the **frontend** to **AWS**.
* Document your  **CI/CD workflow in the README** .

## **Submission Requirements**

* **JIRA Project Board URL** (user stories ).
* **Requirment diagram** (Using project features)
* **GitHub Repository** (`backend/` and `frontend/`).
* **README.md** with:

  * Project setup instructions
  # Clone the repository
   git clone <https://github.com/Lovoxi/Job-Portal-System.git>
   cd <job-portal-system>

  # Install all dependencies
   npm run install-all

  # Configure backend environment variables
  cd backend
  cp .env.example .env
  # Edit your MongoDB URI and JWT_SECRET in the .env file

  # Run the project
  npm run dev

  * CI/CD pipeline details.
  * CI/CD using GitHub Actions:
  * Automated deployment triggered on commits to the main branch
  * Backend and frontend automatically deployed to AWS EC2

