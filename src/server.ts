import { Server } from 'http';
import app from './app';
import config from './config';

async function bootstrap() {
  const server: Server = app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    // errorLogger.error(error);
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
