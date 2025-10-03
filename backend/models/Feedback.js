const { dbAll, dbGet, dbRun } = require('../config/database');

class Feedback {
  static async findAll() {
    return await dbAll(`
      SELECT f.*, 
             u1.first_name || ' ' || u1.last_name as author_name,
             u2.first_name || ' ' || u2.last_name as recipient_name,
             r.topic_taught, c.course_code, c.course_name
      FROM feedback f
      LEFT JOIN users u1 ON f.author_id = u1.id
      LEFT JOIN users u2 ON f.recipient_id = u2.id
      LEFT JOIN reports r ON f.report_id = r.id
      LEFT JOIN courses c ON r.course_id = c.id
      ORDER BY f.created_at DESC
    `);
  }

  static async findById(id) {
    return await dbGet(`
      SELECT f.*, 
             u1.first_name || ' ' || u1.last_name as author_name,
             u2.first_name || ' ' || u2.last_name as recipient_name,
             r.topic_taught, c.course_code, c.course_name
      FROM feedback f
      LEFT JOIN users u1 ON f.author_id = u1.id
      LEFT JOIN users u2 ON f.recipient_id = u2.id
      LEFT JOIN reports r ON f.report_id = r.id
      LEFT JOIN courses c ON r.course_id = c.id
      WHERE f.id = ?
    `, [id]);
  }

  static async findByRecipient(recipientId) {
    return await dbAll(`
      SELECT f.*, 
             u1.first_name || ' ' || u1.last_name as author_name,
             u2.first_name || ' ' || u2.last_name as recipient_name,
             r.topic_taught, c.course_code, c.course_name
      FROM feedback f
      LEFT JOIN users u1 ON f.author_id = u1.id
      LEFT JOIN users u2 ON f.recipient_id = u2.id
      LEFT JOIN reports r ON f.report_id = r.id
      LEFT JOIN courses c ON r.course_id = c.id
      WHERE f.recipient_id = ?
      ORDER BY f.created_at DESC
    `, [recipientId]);
  }

  static async findByAuthor(authorId) {
    return await dbAll(`
      SELECT f.*, 
             u1.first_name || ' ' || u1.last_name as author_name,
             u2.first_name || ' ' || u2.last_name as recipient_name,
             r.topic_taught, c.course_code, c.course_name
      FROM feedback f
      LEFT JOIN users u1 ON f.author_id = u1.id
      LEFT JOIN users u2 ON f.recipient_id = u2.id
      LEFT JOIN reports r ON f.report_id = r.id
      LEFT JOIN courses c ON r.course_id = c.id
      WHERE f.author_id = ?
      ORDER BY f.created_at DESC
    `, [authorId]);
  }

  static async findByReport(reportId) {
    return await dbAll(`
      SELECT f.*, 
             u1.first_name || ' ' || u1.last_name as author_name,
             u2.first_name || ' ' || u2.last_name as recipient_name,
             r.topic_taught, c.course_code, c.course_name
      FROM feedback f
      LEFT JOIN users u1 ON f.author_id = u1.id
      LEFT JOIN users u2 ON f.recipient_id = u2.id
      LEFT JOIN reports r ON f.report_id = r.id
      LEFT JOIN courses c ON r.course_id = c.id
      WHERE f.report_id = ?
      ORDER BY f.created_at DESC
    `, [reportId]);
  }

  static async create(feedbackData) {
    const { report_id, author_id, recipient_id, feedback_type, title, message, priority } = feedbackData;
    
    const result = await dbRun(
      `INSERT INTO feedback (report_id, author_id, recipient_id, feedback_type, title, message, priority) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [report_id, author_id, recipient_id, feedback_type, title, message, priority || 'medium']
    );
    
    return await this.findById(result.id);
  }

  static async update(id, feedbackData) {
    const fields = [];
    const values = [];
    
    Object.keys(feedbackData).forEach(key => {
      if (feedbackData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(feedbackData[key]);
      }
    });
    
    if (fields.length === 0) {
      return await this.findById(id);
    }
    
    values.push(id);
    
    await dbRun(
      `UPDATE feedback SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return await this.findById(id);
  }

  static async markAsRead(id) {
    await dbRun(
      `UPDATE feedback SET is_read = 1, read_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id]
    );
    
    return await this.findById(id);
  }

  static async markAsResolved(id) {
    await dbRun(
      `UPDATE feedback SET is_resolved = 1, resolved_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id]
    );
    
    return await this.findById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM feedback WHERE id = ?', [id]);
    return result.changes > 0;
  }

  static async getStats(recipientId = null) {
    let query = `
      SELECT 
        COUNT(*) as total_feedback,
        COUNT(CASE WHEN is_read = 0 THEN 1 END) as unread_count,
        COUNT(CASE WHEN is_resolved = 1 THEN 1 END) as resolved_count,
        COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_count,
        COUNT(CASE WHEN priority = 'medium' THEN 1 END) as medium_priority_count,
        COUNT(CASE WHEN priority = 'low' THEN 1 END) as low_priority_count
      FROM feedback
    `;
    
    const params = [];
    
    if (recipientId) {
      query += ' WHERE recipient_id = ?';
      params.push(recipientId);
    }
    
    const stats = await dbGet(query, params);
    return stats;
  }

  static async getRecentFeedback(limit = 10) {
    return await dbAll(`
      SELECT f.*, 
             u1.first_name || ' ' || u1.last_name as author_name,
             u2.first_name || ' ' || u2.last_name as recipient_name,
             r.topic_taught, c.course_code, c.course_name
      FROM feedback f
      LEFT JOIN users u1 ON f.author_id = u1.id
      LEFT JOIN users u2 ON f.recipient_id = u2.id
      LEFT JOIN reports r ON f.report_id = r.id
      LEFT JOIN courses c ON r.course_id = c.id
      ORDER BY f.created_at DESC
      LIMIT ?
    `, [limit]);
  }
}

module.exports = Feedback;