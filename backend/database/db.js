const Database=require('better-sqlite3');
const db=new Database('employee.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS employee(
    emp_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    position TEXT NOT NULL,
    contact_no INTEGER NOT NULL
    )
    `).run();

    module.exports=db;