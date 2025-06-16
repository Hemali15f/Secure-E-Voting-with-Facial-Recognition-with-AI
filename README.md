The Secure E-Voting System is a Python-Flask-based web application that uses real-time facial recognition and AI for secure voter authentication. It combines email OTP verification, deep learning face detection, and a robust admin panel to ensure secure, transparent elections.

🛠️ Tech Stack
Language: Python (OpenCV, Dlib, Flask)
Frontend: HTML, CSS, JS
Database: MySQL
AI Models: Deep Learning CNN for facial recognition

📌 Key Features

Real-time facial recognition authentication

Email-based OTP verification

Admin and user dashboards

Vote fraud prevention

Audit logging and results management

🚀 How to Run the Project

Install Required Tools: Python, MySQL, pip packages from requirements.txt

Clone the repo & configure database credentials

Train or load face data (via webcam)

Run python app.py

Access via localhost:5000 in your browser

📌 Example Modules

face_recog.py, otp_verification.py, admin.py, voting.py

Templates for user and admin interfaces

📄 Notes
Requires webcam access. Ensure MySQL tables are created before testing.
