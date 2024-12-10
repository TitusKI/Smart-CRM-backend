# 🌟 **Smart CRM Backend** 🌟  
The backend for **Smart CRM**, a comprehensive mobile app for managing customer relationships. This server handles data storage, user authentication, lead tracking, and analytics to ensure seamless operations for businesses.

---

## 🛠️ **Features**  
- **Authentication**:  
  Secure user sign-up and login using JWT.  
 

- **Contact Management**:  
  Add, edit, delete, and organize contacts.  
  Search and filter contact lists.  

- **Lead Management**:  
  Create, update, and delete leads.  
  Track lead statuses (Approved, Pending, Rejected).  

- **Analytics**:  
  Get insights into lead and user distributions.  

- **Notifications**:  
  Trigger notifications for leads and reminders.  

---

## 🎯 **API Endpoints Overview**  

### **Authentication**:  
- `POST /users/signUp` – User registration.  
- `POST /users/login` – User login.  
- `POST /users/logout` – User logout.  
- `POST /users/` – Register a user by admin.  
- `GET /users/` – Get all users by admin.  
- `GET /users/:id` – Get a specific user by admin.  
- `DELETE /users/:id` – Delete a user by admin.  

### **Contacts**:  
- `GET /contacts/` – Fetch all contacts.  
- `POST /contacts/` – Add a new contact.  
- `PUT /contacts/:id` – Update a contact.  
- `DELETE /contacts/:id` – Delete a contact.  

### **Leads**:  
- `GET /leads/` – Fetch all leads.  
- `POST /leads/` – Add a new lead.  
- `PUT /leads/:id` – Update lead details.  
- `DELETE /leads/:id` – Remove a lead.  

### **Notifications**:  
- `GET /notifications/` – Get all notifications.  
- `GET /notifications/:id/read` – Mark a notification as read.  

---

## 🔧 **Requirements**  

### 📁 Prerequisites  
- Node.js >= 21.7.1 
- MongoDB >= 8.0

### 📲 Installation | Clone the Repository

 **Clone the repository**:  
   ```bash
   git clone https://github.com/TitusKI/smart_crm_backend.git
   cd smart_crm_backend
💌 Contact
📧 Email: k.mariambezie@gmail.com
📞 Phone: +251-921889274

🌟 Support the Project: If you find this backend helpful, star the repository and join us in building smarter CRM solutions! 🚀
