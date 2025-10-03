const { dbAll, dbGet, dbRun } = require('../config/database');

class Class {
  static async findAll() {
    return await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id
      ORDER BY c.class_name
    `);
  }

  static async findById(id) {
    return await dbGet(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id 
      WHERE c.id = ?
    `, [id]);
  }

  static async findByLecturer(lecturerId) {
    return await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id
      WHERE c.lecturer_id = ?
      ORDER BY c.class_name
    `, [lecturerId]);
  }

  static async findByFaculty(faculty) {
    return await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as lecturer_name 
      FROM classes c 
      LEFT JOIN users u ON c.lecturer_id = u.id
      WHERE c.faculty = ?
      ORDER BY c.class_name
    `, [faculty]);
  }

  static async create(classData) {
    const { class_name, faculty, total_registered_students, venue, lecturer_id } = classData;
    
    const result = await dbRun(
      `INSERT INTO classes (class_name, faculty, total_registered_students, venue, lecturer_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [class_name, faculty, total_registered_students, venue, lecturer_id]
    );
    
    return await this.findById(result.id);
  }

  static async update(id, classData) {
    const fields = [];
    const values = [];
    
    Object.keys(classData).forEach(key => {
      if (classData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(classData[key]);
      }
    });
    
    if (fields.length === 0) {
      return await this.findById(id);
    }
    
    values.push(id);
    
    await dbRun(
      `UPDATE classes SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return await this.findById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM classes WHERE id = ?', [id]);
    return result.changes > 0;
  }
}

module.exports = Class;