const { dbAll, dbGet, dbRun } = require('../config/database');

class Report {
  static async findAll(options = {}) {
    let query = `
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id
    `;
    let params = [];

    // Apply filters based on options
    if (options.lecturerId) {
      query += ` WHERE r.lecturer_name LIKE '%' || (SELECT first_name || ' ' || last_name FROM users WHERE id = ?) || '%'`;
      params.push(options.lecturerId);
    } else if (options.faculty) {
      query += ` WHERE c.faculty = ?`;
      params.push(options.faculty);
    } else if (options.courseId) {
      query += ` WHERE r.course_id = ?`;
      params.push(options.courseId);
    }

    query += ` ORDER BY r.date_of_lecture DESC, r.created_at DESC`;

    return await dbAll(query, params);
  }

  static async findById(id) {
    return await dbGet(`
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id 
      WHERE r.id = ?
    `, [id]);
  }

  static async findByCourse(courseId) {
    return await dbAll(`
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id
      WHERE r.course_id = ?
      ORDER BY r.date_of_lecture DESC
    `, [courseId]);
  }

  static async findByLecturer(lecturerName) {
    return await dbAll(`
      SELECT r.*, c.course_code, c.course_name 
      FROM reports r 
      JOIN courses c ON r.course_id = c.id
      WHERE r.lecturer_name LIKE ?
      ORDER BY r.date_of_lecture DESC
    `, [`%${lecturerName}%`]);
  }

  static async create(reportData) {
    const {
      faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
      actual_students_present, total_registered_students, venue, scheduled_lecture_time,
      topic_taught, lecturer_name, learning_outcomes, challenges, recommendations
    } = reportData;

    const result = await dbRun(
      `INSERT INTO reports (
        faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
        actual_students_present, total_registered_students, venue, scheduled_lecture_time,
        topic_taught, lecturer_name, learning_outcomes, challenges, recommendations
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
        actual_students_present, total_registered_students, venue, scheduled_lecture_time,
        topic_taught, lecturer_name, learning_outcomes, challenges, recommendations
      ]
    );

    return await this.findById(result.id);
  }

  static async update(id, reportData) {
    const fields = [];
    const values = [];

    Object.keys(reportData).forEach(key => {
      if (reportData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(reportData[key]);
      }
    });

    if (fields.length === 0) {
      return await this.findById(id);
    }

    values.push(id);

    await dbRun(
      `UPDATE reports SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return await this.findById(id);
  }

  static async addFeedback(id, feedback_text, feedback_by) {
    await dbRun(
      `UPDATE reports SET feedback_text = ?, feedback_by = ?, feedback_at = CURRENT_TIMESTAMP, status = 'reviewed' WHERE id = ?`,
      [feedback_text, feedback_by, id]
    );

    return await this.findById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM reports WHERE id = ?', [id]);
    return result.changes > 0;
  }

  static async getStats() {
    const stats = await dbAll(`
      SELECT 
        COUNT(*) as total_reports,
        COUNT(DISTINCT lecturer_name) as total_lecturers,
        COUNT(DISTINCT course_id) as total_courses,
        AVG(actual_students_present * 1.0 / total_registered_students) * 100 as avg_attendance_rate
      FROM reports
    `);

    return stats[0];
  }
}

module.exports = Report;