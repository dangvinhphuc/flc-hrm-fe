import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';
import {
  SolutionOutline,
  FieldTimeOutline,
  DollarOutline,
  SettingOutline,
  GlobalOutline,
  UserOutline,
  TeamOutline,
  SearchOutline,
  MenuOutline,
  WarningOutline,
  EyeInvisibleOutline,
  MoreOutline,
} from '@ant-design/icons-angular/icons';
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: NZ_ICONS,
      useValue: [
        SolutionOutline,
        FieldTimeOutline,
        DollarOutline,
        SettingOutline,
        GlobalOutline,
        UserOutline,
        TeamOutline,
        SearchOutline,
        MenuOutline,
        WarningOutline,
        EyeInvisibleOutline,
        MoreOutline,
      ],
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
};
