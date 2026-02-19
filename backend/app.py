from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_NAME = "database.db"


# Database Connection Function

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


# Create Table If Not Exists

with get_db() as db:
    db.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            type TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL
        )
    """)



# GET All Transactions

@app.route("/transactions", methods=["GET"])
def get_transactions():
    db = get_db()
    rows = db.execute(
        "SELECT * FROM transactions ORDER BY date DESC"
    ).fetchall()

    return jsonify([dict(row) for row in rows])



# POST Add Transaction

@app.route("/transactions", methods=["POST"])
def add_transaction():
    data = request.json

    db = get_db()
    cursor = db.execute("""
        INSERT INTO transactions (amount, type, category, description, date)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["amount"],
        data["type"],
        data["category"],
        data.get("description", ""),
        data["date"]
    ))

    db.commit()

    return jsonify({"id": cursor.lastrowid})



# DELETE Transaction

@app.route("/transactions/<int:id>", methods=["DELETE"])
def delete_transaction(id):
    db = get_db()
    db.execute("DELETE FROM transactions WHERE id = ?", (id,))
    db.commit()

    return jsonify({"message": "Deleted"})



# GET Balance

@app.route("/balance", methods=["GET"])
def get_balance():
    db = get_db()
    row = db.execute("""
        SELECT
            SUM(CASE WHEN type='income' THEN amount ELSE 0 END) -
            SUM(CASE WHEN type='expense' THEN amount ELSE 0 END)
        AS balance
        FROM transactions
    """).fetchone()

    return jsonify({"balance": row["balance"] or 0})



if __name__ == "__main__":
    app.run(debug=True)