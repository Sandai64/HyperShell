import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { icons, LucideAngularModule } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(LucideAngularModule.pick(icons))],
};
