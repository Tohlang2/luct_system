const { dbAll, dbGet, dbRun } = require('../config/database');

class Course {
  static async findAll() {
    return await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id
      ORDER BY c.course_code
    `);
  }

  static async findById(id) {
    return await dbGet(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id 
      WHERE c.id = ?
    `, [id]);
  }

  static async findByFaculty(faculty) {
    return await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id
      WHERE c.faculty = ?
      ORDER BY c.course_code
    `, [faculty]);
  }

  static async findByProgramLeader(programLeaderId) {
    return await dbAll(`
      SELECT c.*, u.first_name || ' ' || u.last_name as program_leader_name 
      FROM courses c 
      LEFT JOIN users u ON c.program_leader_id = u.id
      WHERE c.program_leader_id = ?
      ORDER BY c.course_code
    `, [programLeaderId]);
  }

  static async create(courseData) {
    const { course_code, course_name, faculty, credits, program_leader_id } = courseData;
    
    const result = await dbRun(
      `INSERT INTO courses (course_code, course_name, faculty, credits, program_leader_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [course_code, course_name, faculty, credits, program_leader_id]
    );
    
    return await this.findById(result.id);
  }

  static async update(id, courseData) {
    const fields = [];
    const values = [];
    
    Object.keys(courseData).forEach(key => {
      if (courseData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(courseData[key]);
      }
    });
    
    if (fields.length === 0) {
      return await this.findById(id);
    }
    
    values.push(id);
    
    await dbRun(
      `UPDATE courses SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return await this.findById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM courses WHERE id = ?', [id]);
    return result.changes > 0;
  }
}

module.exports = Course;