import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication, configService: ConfigService) {
  const backendUrl = configService.get<string>('BACKEND_URL') || 'http://localhost:3000';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'local';

  const config = new DocumentBuilder()
    .setTitle('Abhishek Garg Portfolio Backend')
    .setDescription('API documentation for Abhishek Garg Portfolio Backend')
    .setVersion('1.0.0')
    .addServer(backendUrl, `${nodeEnv.charAt(0).toUpperCase() + nodeEnv.slice(1)} Environment`)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Upload', 'File upload endpoints')
    .addTag('Health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: true,
    },
    customCss: `
      .topbar { display: none; }
      .swagger-ui .info { margin: 20px 0; }
    `,
  });

  console.log(`📚 Swagger docs available at: ${backendUrl}/docs`);
}
