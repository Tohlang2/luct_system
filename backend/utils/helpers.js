// Utility helper functions

const helpers = {
  // Format date to YYYY-MM-DD
  formatDate: (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // Format time to HH:MM
  formatTime: (time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  },

  // Calculate attendance percentage
  calculateAttendancePercentage: (present, total) => {
    if (!total || total === 0) return 0;
    return Math.round((present / total) * 100);
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Generate random password
  generatePassword: (length = 8) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  },

  // Sanitize input for SQL (basic protection)
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input.replace(/'/g, "''").replace(/--/g, '').replace(/;/g, '');
  },

  // Parse query parameters for filtering
  parseQueryParams: (query) => {
    const filters = {};
    const validFilters = ['faculty', 'course_id', 'lecturer_name', 'status', 'date_from', 'date_to'];
    
    validFilters.forEach(filter => {
      if (query[filter]) {
        filters[filter] = query[filter];
      }
    });

    // Handle pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    filters.page = page;
    filters.limit = limit;
    filters.offset = offset;

    return filters;
  },

  // Build WHERE clause for SQL queries
  buildWhereClause: (filters) => {
    const conditions = [];
    const values = [];

    Object.keys(filters).forEach(key => {
      if (key === 'date_from') {
        conditions.push('date_of_lecture >= ?');
        values.push(filters[key]);
      } else if (key === 'date_to') {
        conditions.push('date_of_lecture <= ?');
        values.push(filters[key]);
      } else if (key === 'lecturer_name') {
        conditions.push('lecturer_name LIKE ?');
        values.push(`%${filters[key]}%`);
      } else if (!['page', 'limit', 'offset'].includes(key)) {
        conditions.push(`${key} = ?`);
        values.push(filters[key]);
      }
    });

    return {
      clause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
      values
    };
  },

  // Calculate average rating
  calculateAverageRating: (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating_value, 0);
    return Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal place
  },

  // Get status color based on percentage
  getStatusColor: (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  },

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

module.exports = helpers;