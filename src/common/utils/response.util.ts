import { ApiResponse } from '../interfaces/api-response.interface';
import { StatusCode } from '../constants/status-codes.constant';

export class ResponseUtil {
  static success<T>(
    data: T,
    message: string,
    statusCode: StatusCode = 200,
  ): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      statusCode,
    };
  }

  static error(
    message: string,
    statusCode: StatusCode = 500,
    data?: any,
  ): ApiResponse {
    return {
      success: false,
      data,
      message,
      statusCode,
    };
  }
}
