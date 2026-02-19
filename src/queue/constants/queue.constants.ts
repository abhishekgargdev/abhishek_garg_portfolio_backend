// Queue Names
export const QUEUE_NAMES = {
  MAIL: 'mail-queue',
  NOTIFICATION: 'notification-queue',
  FILE_PROCESSING: 'file-processing-queue',
  ANALYTICS: 'analytics-queue',
  CLEANUP: 'cleanup-queue',
} as const;

// Job Names
export const MAIL_JOBS = {
  SEND_WELCOME_EMAIL: 'send-welcome-email',
  SEND_PASSWORD_RESET: 'send-password-reset',
  SEND_PASSWORD_RESET_CONFIRMATION: 'send-password-reset-confirmation',
  SEND_GENERIC_EMAIL: 'send-generic-email',
  SEND_USER_QUERY_NOTIFICATION: 'send-user-query-notification',
  SEND_USER_QUERY_CONFIRMATION: 'send-user-query-confirmation',
} as const;

export const NOTIFICATION_JOBS = {
  SEND_PUSH_NOTIFICATION: 'send-push-notification',
  SEND_SMS: 'send-sms',
} as const;

export const FILE_PROCESSING_JOBS = {
  PROCESS_IMAGE: 'process-image',
  GENERATE_THUMBNAIL: 'generate-thumbnail',
  COMPRESS_FILE: 'compress-file',
} as const;

export const ANALYTICS_JOBS = {
  TRACK_EVENT: 'track-event',
  GENERATE_REPORT: 'generate-report',
} as const;

export const CLEANUP_JOBS = {
  CLEANUP_EXPIRED_TOKENS: 'cleanup-expired-tokens',
  CLEANUP_OLD_LOGS: 'cleanup-old-logs',
  CLEANUP_TEMP_FILES: 'cleanup-temp-files',
} as const;

// Job Options
export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 1000,
  },
  removeOnComplete: true,
  removeOnFail: false,
};

export const HIGH_PRIORITY_JOB_OPTIONS = {
  ...DEFAULT_JOB_OPTIONS,
  priority: 1,
};

export const LOW_PRIORITY_JOB_OPTIONS = {
  ...DEFAULT_JOB_OPTIONS,
  priority: 10,
};
