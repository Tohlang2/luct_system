const path = require('path');

// Main configuration object
const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  
  // Server configuration
  server: {
    port: parseInt(process.env.PORT) || 5000,
    host: process.env.HOST || 'localhost',
    apiPrefix: process.env.API_PREFIX || '/api',
    docsPath: process.env.DOCS_PATH || '/api-docs'
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'luct-faculty-system-super-secret-key-2024-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'luct-refresh-token-secret-2024-change-in-production',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },

  // Database configuration
  database: {
    client: process.env.DB_CLIENT || 'sqlite3',
    connection: {
      filename: process.env.DB_PATH || path.join(__dirname, '../luct_faculty.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, '../migrations')
    },
    seeds: {
      directory: path.join(__dirname, '../seeds')
    }
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  },

  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    maxFiles: parseInt(process.env.MAX_FILES) || 5,
    uploadPath: process.env.UPLOAD_PATH || path.join(__dirname, '../uploads'),
    allowedMimeTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain').split(','),
    
    // Upload paths for different categories
    paths: {
      courseMaterials: 'course-materials',
      reportAttachments: 'report-attachments',
      profiles: 'profiles',
      temp: 'temp'
    }
  },

  // Security configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // limit each IP to 100 requests per windowMs
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"]
        }
      }
    }
  },

  // Email configuration (for future use)
  email: {
    enabled: process.env.FEATURE_EMAIL_NOTIFICATIONS === 'true',
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    },
    from: {
      email: process.env.FROM_EMAIL || 'noreply@luct.edu',
      name: process.env.FROM_NAME || 'LUCT Faculty System'
    }
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || path.join(__dirname, '../logs/app.log'),
    maxSize: process.env.LOG_MAX_SIZE || '10m',
    maxFiles: parseInt(process.env.LOG_MAX_FILES) || 5,
    format: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
  },

  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'luct-session-secret-2024-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.SESSION_MAX_AGE) || 24 * 60 * 60 * 1000 // 24 hours
    }
  },

  // Feature flags
  features: {
    fileUploads: process.env.FEATURE_FILE_UPLOADS !== 'false',
    emailNotifications: process.env.FEATURE_EMAIL_NOTIFICATIONS === 'true',
    smsNotifications: process.env.FEATURE_SMS_NOTIFICATIONS === 'true',
    advancedSearch: process.env.FEATURE_ADVANCED_SEARCH !== 'false',
    reportExport: process.env.FEATURE_REPORT_EXPORT !== 'false',
    bulkActions: process.env.FEATURE_BULK_ACTIONS === 'true'
  },

  // External services configuration
  external: {
    // AWS S3 configuration (for cloud storage)
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
      bucketName: process.env.AWS_BUCKET_NAME || 'luct-faculty-files'
    },

    // Google services configuration
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },

    // Cloud storage provider
    storage: {
      provider: process.env.CLOUD_STORAGE_PROVIDER || 'local' // 'local', 'aws', 'google'
    }
  },

  // Monitoring and analytics
  monitoring: {
    enabled: process.env.ENABLE_METRICS === 'true',
    port: parseInt(process.env.METRICS_PORT) || 9090,
    healthChecks: process.env.ENABLE_HEALTH_CHECKS !== 'false',
    metrics: {
      collectionTimeout: 5000
    }
  },

  // Cache configuration
  cache: {
    enabled: !!process.env.REDIS_URL,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.CACHE_TTL) || 3600, // 1 hour
    prefix: 'luct:'
  },

  // Development settings
  development: {
    debug: process.env.DEBUG === 'true',
    seedDatabase: process.env.SEED_DATABASE !== 'false',
    enableSwagger: process.env.ENABLE_SWAGGER !== 'false'
  },

  // API versioning
  api: {
    version: process.env.API_VERSION || 'v1',
    basePath: `/api/${process.env.API_VERSION || 'v1'}`,
    deprecatedRoutes: []
  },

  // Application-specific settings
  app: {
    name: 'LUCT Faculty Reporting System',
    version: '1.0.0',
    description: 'A comprehensive faculty reporting and management system for LUCT',
    contact: {
      name: 'LUCT IT Support',
      email: 'it-support@luct.edu'
    },
    // Pagination defaults
    pagination: {
      defaultLimit: 10,
      maxLimit: 100
    },
    // Report settings
    reports: {
      autoApprove: false,
      requireFeedback: false,
      maxReportsPerDay: 5
    },
    // Rating settings
    ratings: {
      minRating: 1,
      maxRating: 5,
      requireComment: false
    }
  }
};

// Environment-specific overrides
if (config.env === 'production') {
  config.development.debug = false;
  config.development.seedDatabase = false;
  config.security.rateLimit.max = 50; // More restrictive in production
  config.cors.origin = process.env.CORS_ORIGIN || 'https://your-production-domain.com';
  config.session.cookie.secure = true;
}

if (config.env === 'test') {
  config.database.connection.filename = ':memory:';
  config.development.seedDatabase = true;
  config.logging.level = 'error';
}

// Helper functions
config.isProduction = () => config.env === 'production';
config.isDevelopment = () => config.env === 'development';
config.isTest = () => config.env === 'test';

// Export configuration
module.exports = config;