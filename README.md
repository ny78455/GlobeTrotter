# 🌍 GlobeTrotter – Personalized Travel Planning Platform  

## 📌 Overview  
**GlobeTrotter** is a personalized, intelligent, and collaborative travel planning application designed to simplify multi-city trip planning. It allows users to create customized itineraries, manage budgets, explore destinations, and share their trips with others.  

Built using **Python**, **MySQL**, **React**, and **Flask**, the platform ensures a smooth, responsive, and interactive travel planning experience.  

---

## 🎯 Problem Statement  
Travel planning often involves juggling multiple destinations, activities, dates, and budgets across different platforms. The goal of **GlobeTrotter** is to centralize this process into one user-friendly application that offers:  

- Flexible **multi-city itinerary creation**  
- Integrated **budget & cost tracking**  
- **Activity & destination discovery** through search  
- **Collaborative sharing** of trip plans  
- Real-time **calendar & timeline visualization**  

---

## 🚀 Features  

### **Authentication**  
- User Signup/Login with Email & Password  
- Profile Management & Preferences  
- Secure Authentication Flow  

### **Trip Planning**  
- **Dashboard**: View upcoming trips, popular cities, and recommendations  
- **Create Trip**: Set trip name, dates, and description with optional cover photo  
- **My Trips**: Manage and edit existing trips  
- **Itinerary Builder**: Add cities, dates, and activities in an interactive format  
- **Itinerary View**: Day-wise or city-wise trip visualization  
- **Trip Calendar/Timeline**: Calendar-based trip flow management  

### **Exploration & Activities**  
- **City Search**: Find cities by name, country, or popularity  
- **Activity Search**: Browse and filter activities by cost, duration, and category  
- **Recommendations**: Suggested destinations & activities based on preferences  

### **Budget Management**  
- **Cost Breakdown**: Transportation, accommodation, meals, and activities  
- **Alerts** for over-budget days  
- **Visual Analytics**: Pie/Bar charts for cost distribution  

### **Sharing & Collaboration**  
- Public/Private itinerary sharing with unique URLs  
- Social media integration  
- **Copy Trip** feature for inspiration  

### **Admin & Analytics (Optional)**  
- Track user activity, top destinations, and platform trends  
- Manage users and reported itineraries  

---

## 🛠 Tech Stack  

### **Frontend**  
- **React.js** – For a responsive, component-driven UI  
- **Axios / Fetch API** – For communication with backend APIs  
- **Chart.js / Recharts** – For visualizing budgets, timelines, and trends  

### **Backend**  
- **Flask (Python)** – Lightweight, fast, and scalable backend framework  
- **Flask-RESTful** – For API creation  
- **Flask-JWT / Flask-Login** – For authentication & session management  

### **Database**  
- **MySQL** – Relational database for storing users, trips, activities, budgets, and shared itineraries  

### **Other Tools**  
- **SQLAlchemy / Flask SQLAlchemy** – ORM for database interactions  
- **Cloud Storage (Optional)** – For storing trip cover photos and shared images  

---

## 📂 Project Structure  
```
GlobeTrotter/
│── backend/               # Flask backend
│   ├── app.py              # Main backend entry point
│   ├── models.py           # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── static/uploads/     # Uploaded trip images
│
│── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Pages (Dashboard, Create Trip, My Trips, etc.)
│   │   ├── services/       # API calls
│   │   └── App.js          # App entry point
│
│── README.md
│── requirements.txt        # Python dependencies
│── package.json            # React dependencies
```

---

## ⚙️ Installation & Setup  

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/GlobeTrotter.git
cd GlobeTrotter
```

### **2️⃣ Backend Setup (Flask + MySQL)**
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create MySQL database
mysql -u root -p
CREATE DATABASE globetrotter;

# Run the Flask server
flask run
```

### **3️⃣ Frontend Setup (React)**
```bash
cd frontend
npm install
npm start
```

---

## 📊 Future Enhancements  
- **AI-powered itinerary suggestions** based on user preferences  
- **Real-time currency conversion** for trip budgeting  
- **Offline mode** for travelers without internet access  
- **Integration with Booking APIs** (Hotels, Flights, Activities)  

---

## 🤝 Contributing  
We welcome contributions! Please fork the repo, create a new branch, and submit a pull request with clear commit messages.  

---

## 📜 License  
This project is licensed under the **MIT License** – feel free to use and modify for personal or commercial purposes.  
