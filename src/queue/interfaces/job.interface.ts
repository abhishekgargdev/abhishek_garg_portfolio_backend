// Mail Job Interfaces
export interface WelcomeEmailJob {
  email: string;
  userName: string;
}

export interface PasswordResetEmailJob {
  email: string;
  userName: string;
  resetToken: string;
}

export interface PasswordResetConfirmationJob {
  email: string;
  userName: string;
}

export interface GenericEmailJob {
  email: string;
  subject: string;
  htmlContent: string;
}

// Notification Job Interfaces
export interface PushNotificationJob {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export interface SmsNotificationJob {
  phoneNumber: string;
  message: string;
}

// File Processing Job Interfaces
export interface ProcessImageJob {
  fileId: string;
  filePath: string;
  options?: {
    resize?: { width: number; height: number };
    format?: 'jpeg' | 'png' | 'webp';
    quality?: number;
  };
}

export interface GenerateThumbnailJob {
  fileId: string;
  filePath: string;
  thumbnailSize: { width: number; height: number };
}

export interface CompressFileJob {
  fileId: string;
  filePath: string;
  compressionLevel?: number;
}

// Analytics Job Interfaces
export interface TrackEventJob {
  userId?: string;
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
}

export interface GenerateReportJob {
  reportType: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  filters?: Record<string, unknown>;
}

// Cleanup Job Interfaces
export interface CleanupExpiredTokensJob {
  olderThan?: Date;
}

export interface CleanupOldLogsJob {
  retentionDays: number;
}

export interface CleanupTempFilesJob {
  olderThanHours: number;
}

// Union type for all jobs
export type MailJobData =
  | WelcomeEmailJob
  | PasswordResetEmailJob
  | PasswordResetConfirmationJob
  | GenericEmailJob;

export type NotificationJobData = PushNotificationJob | SmsNotificationJob;

export type FileProcessingJobData =
  | ProcessImageJob
  | GenerateThumbnailJob
  | CompressFileJob;

export type AnalyticsJobData = TrackEventJob | GenerateReportJob;

export type CleanupJobData =
  | CleanupExpiredTokensJob
  | CleanupOldLogsJob
  | CleanupTempFilesJob;
