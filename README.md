An Expense Tracker web application built with:

- Frontend: React (Vite), HTML, CSS
- Backend: Python + Flask (REST API)
- Database: SQLite

This app allows users to:
- Add income and expenses
- View transaction history
- Delete transactions
- Automatically calculate current balance



      **INSTALATION**

  

1. Create new project and clone the repository with theses commands in your terminal:
     
       git clone https://github.com/fmierzwa27/expense-tracker.git
       cd expense-tracker

2. Setup backend:

    Open terminal and run:

       cd backend
       python -m venv venv
 
    Windows:

       venv\Scripts\activate
  
    Mac/Linux:

       source venv/bin/activate
  
    Install dependencies:

       pip install -r requirements.txt
   
    Run backend server:
   
       python app.py
   
    Backend will run at:

       http://127.0.0.1:5000

4. Setup frontend

   Open new terminal and run:

       cd frontend
       npm install
       npm run dev
   
   Frontend runs at:

       http://localhost:5173
