const { dbAll, dbGet, dbRun } = require('../config/database');

class User {
  static async findAll() {
    return await dbAll(
      'SELECT id, email, first_name, last_name, role, faculty, department, student_id, employee_id, created_at FROM users'
    );
  }

  static async findById(id) {
    return await dbGet(
      'SELECT id, email, first_name, last_name, role, faculty, department, student_id, employee_id, created_at FROM users WHERE id = ?',
      [id]
    );
  }

  static async findByEmail(email) {
    return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async findByRole(role) {
    return await dbAll(
      'SELECT id, email, first_name, last_name, role, faculty, department, student_id, employee_id FROM users WHERE role = ?',
      [role]
    );
  }

  static async create(userData) {
    const { email, password, first_name, last_name, role, faculty, department, student_id, employee_id } = userData;
    
    const result = await dbRun(
      `INSERT INTO users (email, password, first_name, last_name, role, faculty, department, student_id, employee_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, password, first_name, last_name, role, faculty, department, student_id, employee_id]
    );
    
    return await this.findById(result.id);
  }

  static async update(id, userData) {
    const fields = [];
    const values = [];
    
    Object.keys(userData).forEach(key => {
      if (userData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(userData[key]);
      }
    });
    
    if (fields.length === 0) {
      return await this.findById(id);
    }
    
    values.push(id);
    
    await dbRun(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return await this.findById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM users WHERE id = ?', [id]);
    return result.changes > 0;
  }
}

module.exports = User;