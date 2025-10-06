// const Database=require('better-sqlite3');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./employee.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS employee (
    emp_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    position TEXT NOT NULL,
    contact_no INTEGER NOT NULL,
    role TEXT NOT NULL
  )
`);

    module.exports=db;