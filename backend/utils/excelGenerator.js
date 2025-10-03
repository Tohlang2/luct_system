const xlsx = require('xlsx');

const excelGenerator = {
  generateReportsExcel(reports) {
    // Create workbook
    const workbook = xlsx.utils.book_new();
    
    // Prepare data for Excel
    const excelData = reports.map(report => ({
      'Faculty': report.faculty_name,
      'Class': report.class_name,
      'Week': report.week_of_reporting,
      'Date': report.date_of_lecture,
      'Course Code': report.course_code,
      'Course Name': report.course_name,
      'Lecturer': `${report.first_name} ${report.last_name}`,
      'Students Present': report.actual_students_present,
      'Total Students': report.total_registered_students,
      'Venue': report.venue,
      'Scheduled Time': report.scheduled_lecture_time,
      'Topic Taught': report.topic_taught,
      'Learning Outcomes': report.learning_outcomes,
      'Recommendations': report.recommendations
    }));

    // Create worksheet
    const worksheet = xlsx.utils.json_to_sheet(excelData);
    
    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Reports');
    
    // Generate buffer
    const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    return excelBuffer;
  },

  generateCoursesExcel(courses) {
    const workbook = xlsx.utils.book_new();
    
    const excelData = courses.map(course => ({
      'Course Code': course.course_code,
      'Course Name': course.course_name,
      'Faculty': course.faculty,
      'Credits': course.credits,
      'Program Leader': course.program_leader_name
    }));

    const worksheet = xlsx.utils.json_to_sheet(excelData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Courses');
    
    return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }
};

module.exports = excelGenerator;