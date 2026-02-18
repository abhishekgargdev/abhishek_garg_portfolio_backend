import { ConfigService } from '@nestjs/config';

/**
 * Environment configuration factory that provides environment-specific configurations.
 * Based on NODE_ENV (local, dev, prod), it prefixes the environment variables accordingly.
 * 
 * Usage:
 * - For local environment: NODE_ENV=local -> uses LOCAL_* keys
 * - For dev environment: NODE_ENV=dev -> uses DEV_* keys
 * - For prod environment: NODE_ENV=prod -> uses PROD_* keys
 * 
 * Example:
 * - NODE_ENV=local, get('PORT') -> returns LOCAL_PORT value
 * - NODE_ENV=dev, get('PORT') -> returns DEV_PORT value
 * - NODE_ENV=prod, get('PORT') -> returns PROD_PORT value
 */

export interface EnvConfigOptions {
  /** The base key name without prefix */
  key: string;
  /** Default value if the key is not found */
  defaultValue?: string;
}

export class EnvConfigService {
  private readonly prefix: string;
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
    // Get NODE_ENV, default to 'local' if not set
    const nodeEnv = this.configService.get<string>('NODE_ENV') || 'local';
    
    // Set prefix based on NODE_ENV
    this.prefix = this.getPrefix(nodeEnv);
  }

  private getPrefix(nodeEnv: string): string {
    switch (nodeEnv.toLowerCase()) {
      case 'local':
        return 'LOCAL';
      case 'dev':
        return 'DEV';
      case 'prod':
        return 'PROD';
      default:
        return 'LOCAL';
    }
  }

  /**
   * Get a configuration value with the appropriate prefix
   * @param key - The base key name (without prefix)
   * @param defaultValue - Optional default value if not found
   */
  get<T = string>(key: string, defaultValue?: T): T {
    const prefixedKey = `${this.prefix}_${key}`;
    return this.configService.get<T>(prefixedKey) || defaultValue as T;
  }

  /**
   * Get a required configuration value - throws error if not found
   * @param key - The base key name (without prefix)
   */
  getOrThrow<T = string>(key: string): T {
    const prefixedKey = `${this.prefix}_${key}`;
    return this.configService.getOrThrow<T>(prefixedKey);
  }

  /**
   * Get the current environment name
   */
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'local';
  }

  /**
   * Get the prefix being used
   */
  getCurrentPrefix(): string {
    return this.prefix;
  }
}

/**
 * Factory function to create EnvConfigService instance
 * This can be used as a provider factory in NestJS
 */
export const envConfigFactory = {
  provide: EnvConfigService,
  useFactory: (configService: ConfigService): EnvConfigService => {
    return new EnvConfigService(configService);
  },
  inject: [ConfigService],
};
