const validateReport = (req, res, next) => {
  const {
    faculty_name, class_name, week_of_reporting, date_of_lecture, course_id,
    actual_students_present, total_registered_students, venue, scheduled_lecture_time,
    topic_taught, lecturer_name, learning_outcomes
  } = req.body;

  const errors = [];

  if (!faculty_name) errors.push('Faculty name is required');
  if (!class_name) errors.push('Class name is required');
  if (!week_of_reporting) errors.push('Week of reporting is required');
  if (!date_of_lecture) errors.push('Date of lecture is required');
  if (!course_id) errors.push('Course is required');
  if (!actual_students_present) errors.push('Actual students present is required');
  if (!total_registered_students) errors.push('Total registered students is required');
  if (!venue) errors.push('Venue is required');
  if (!scheduled_lecture_time) errors.push('Scheduled lecture time is required');
  if (!topic_taught) errors.push('Topic taught is required');
  if (!lecturer_name) errors.push('Lecturer name is required');
  if (!learning_outcomes) errors.push('Learning outcomes are required');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateRating = (req, res, next) => {
  const { report_id, rating_value, comment } = req.body;

  const errors = [];

  if (!report_id) errors.push('Report ID is required');
  if (!rating_value || rating_value < 1 || rating_value > 5) {
    errors.push('Rating value must be between 1 and 5');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateReport,
  validateRating
};