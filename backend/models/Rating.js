const { dbAll, dbGet, dbRun } = require('../config/database');

class Rating {
  static async findAll() {
    return await dbAll(`
      SELECT r.*, rep.course_id, c.course_code, c.course_name, 
             u.first_name || ' ' || u.last_name as student_name,
             rep.lecturer_name
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      JOIN courses c ON rep.course_id = c.id
      JOIN users u ON r.student_id = u.id
      ORDER BY r.created_at DESC
    `);
  }

  static async findById(id) {
    return await dbGet(`
      SELECT r.*, rep.course_id, c.course_code, c.course_name, 
             u.first_name || ' ' || u.last_name as student_name,
             rep.lecturer_name
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      JOIN courses c ON rep.course_id = c.id
      JOIN users u ON r.student_id = u.id
      WHERE r.id = ?
    `, [id]);
  }

  static async findByReport(reportId) {
    return await dbAll(`
      SELECT r.*, u.first_name || ' ' || u.last_name as student_name
      FROM ratings r
      JOIN users u ON r.student_id = u.id
      WHERE r.report_id = ?
      ORDER BY r.created_at DESC
    `, [reportId]);
  }

  static async findByStudent(studentId) {
    return await dbAll(`
      SELECT r.*, rep.course_id, c.course_code, c.course_name, rep.lecturer_name
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      JOIN courses c ON rep.course_id = c.id
      WHERE r.student_id = ?
      ORDER BY r.created_at DESC
    `, [studentId]);
  }

  static async findByLecturer(lecturerName) {
    return await dbAll(`
      SELECT r.*, rep.course_id, c.course_code, c.course_name, 
             u.first_name || ' ' || u.last_name as student_name,
             rep.lecturer_name
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      JOIN courses c ON rep.course_id = c.id
      JOIN users u ON r.student_id = u.id
      WHERE rep.lecturer_name LIKE ?
      ORDER BY r.created_at DESC
    `, [`%${lecturerName}%`]);
  }

  static async create(ratingData) {
    const { report_id, student_id, rating_value, comment } = ratingData;

    // Check for existing rating
    const existing = await dbGet(
      'SELECT id FROM ratings WHERE report_id = ? AND student_id = ?',
      [report_id, student_id]
    );

    if (existing) {
      throw new Error('Student has already rated this report');
    }

    const result = await dbRun(
      `INSERT INTO ratings (report_id, student_id, rating_value, comment) 
       VALUES (?, ?, ?, ?)`,
      [report_id, student_id, rating_value, comment]
    );

    return await this.findById(result.id);
  }

  static async update(id, ratingData) {
    const fields = [];
    const values = [];

    Object.keys(ratingData).forEach(key => {
      if (ratingData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(ratingData[key]);
      }
    });

    if (fields.length === 0) {
      return await this.findById(id);
    }

    values.push(id);

    await dbRun(
      `UPDATE ratings SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return await this.findById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM ratings WHERE id = ?', [id]);
    return result.changes > 0;
  }

  static async getAverageRating(reportId) {
    const result = await dbGet(`
      SELECT 
        AVG(rating_value) as average_rating,
        COUNT(*) as total_ratings
      FROM ratings 
      WHERE report_id = ?
    `, [reportId]);

    return result;
  }

  static async getLecturerStats(lecturerName) {
    const stats = await dbAll(`
      SELECT 
        AVG(r.rating_value) as average_rating,
        COUNT(r.id) as total_ratings,
        COUNT(DISTINCT r.report_id) as rated_reports
      FROM ratings r
      JOIN reports rep ON r.report_id = rep.id
      WHERE rep.lecturer_name LIKE ?
    `, [`%${lecturerName}%`]);

    return stats[0];
  }
}

module.exports = Rating;