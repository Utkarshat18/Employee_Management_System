const db = require("../database/db");

// ADD EMPLOYEE
const addemp = (req, res) => {
  const { emp_id, name, email, position, contact_no,role } = req.body;

  db.get("SELECT * FROM employee WHERE emp_id = ?", [emp_id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", success: false });
    }

    if (row) {
      return res.status(409).json({ message: "Employee already exists", success: false });
    }

    db.run(
      "INSERT INTO employee (emp_id, name, email, position, contact_no,role) VALUES (?, ?, ?, ?, ?,?)",
      [emp_id, name, email, position, contact_no,role],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Insert failed", success: false });
        }

        return res.status(201).json({
          message: "Employee added successfully",
          success: true,
        });
      }
    );
  });
};

// GET ALL EMPLOYEES
const getemp = (req, res) => {
  db.all("SELECT * FROM employee", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database query failed", success: false });
    }

    return res.status(200).json({ message: "Data retrieved successfully", success: true, data: rows });
  });
};

// UPDATE EMPLOYEE
const updateemp = (req, res) => {
  const { id } = req.params;
  const { name, email, position, contact_no ,role} = req.body;

  const fields = [];
  const values = [];

  if (name) { fields.push("name = ?"); values.push(name); }
  if (email) { fields.push("email = ?"); values.push(email); }
  if (position) { fields.push("position = ?"); values.push(position); }
  if (contact_no) { fields.push("contact_no = ?"); values.push(contact_no); }
  if (rolw) {fields.push("role=?");values.push(role);}

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  const query = `UPDATE employee SET ${fields.join(", ")} WHERE emp_id = ?`;
  values.push(id);

  db.run(query, values, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Update failed", success: false });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Employee not found", success: false });
    }

    return res.json({ message: "Employee updated successfully", success: true });
  });
};

// DELETE EMPLOYEE
const deleteemp = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM employee WHERE emp_id = ?", [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Delete failed", success: false });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Employee not found", success: false });
    }

    return res.status(200).json({ message: "Employee deleted successfully", success: true });
  });
};

module.exports = { addemp, getemp, updateemp, deleteemp };
