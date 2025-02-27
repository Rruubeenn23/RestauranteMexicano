import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';  // ✅ Solo se usa serverRoutes aquí

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes)  // ✅ Ya no genera errores
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
