const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for course materials
const courseMaterialsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const courseDir = path.join(uploadsDir, 'course-materials');
    if (!fs.existsSync(courseDir)) {
      fs.mkdirSync(courseDir, { recursive: true });
    }
    cb(null, courseDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'course-material-' + uniqueSuffix + ext);
  }
});

// Configure storage for report attachments
const reportStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const reportDir = path.join(uploadsDir, 'report-attachments');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    cb(null, reportDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'report-attachment-' + uniqueSuffix + ext);
  }
});

// Configure storage for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileDir = path.join(uploadsDir, 'profiles');
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }
    cb(null, profileDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimes = {
    'image/jpeg': true,
    'image/jpg': true,
    'image/png': true,
    'image/gif': true,
    'application/pdf': true,
    'application/msword': true,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
    'application/vnd.ms-excel': true,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true,
    'text/plain': true,
    'application/zip': true,
    'application/x-rar-compressed': true
  };

  if (allowedMimes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, Word documents, Excel files, and text files are allowed.'), false);
  }
};

// Configure multer instances
const uploadCourseMaterials = multer({
  storage: courseMaterialsStorage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  }
});

const uploadReportAttachments = multer({
  storage: reportStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 3 // Maximum 3 files
  }
});

const uploadProfilePicture = multer({
  storage: profileStorage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

// Middleware to handle file upload errors
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Please upload a smaller file.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Please upload fewer files.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload.'
      });
    }
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

// Utility functions for file management
const fileUtils = {
  // Delete file from filesystem
  deleteFile: (filePath) => {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },

  // Get file information
  getFileInfo: (filename, category = 'course-materials') => {
    const filePath = path.join(uploadsDir, category, filename);
    
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            filename,
            path: filePath,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          });
        }
      });
    });
  },

  // Serve file for download
  serveFile: (res, filePath, originalName) => {
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
      res.sendFile(path.resolve(filePath));
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  },

  // Validate file type
  validateFileType: (filename) => {
    const ext = path.extname(filename).toLowerCase();
    const allowedExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', 
      '.xls', '.xlsx', '.txt', '.zip', '.rar'
    ];
    return allowedExtensions.includes(ext);
  },

  // Get file category path
  getCategoryPath: (category) => {
    return path.join(uploadsDir, category);
  }
};

module.exports = {
  uploadCourseMaterials,
  uploadReportAttachments,
  uploadProfilePicture,
  handleUploadErrors,
  fileUtils
};