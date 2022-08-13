import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@mfe/ui';
import {
  Auth0Service,
  AuthGuard,
  AUTH_CONFIG,
  AUTH_SERVICE,
  DataModule,
  MyAuthService,
} from '@mfe/data';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';

const authConfig = {
  loginPageUrl: '/login',
  domain: 'dev-pmz1v-rd.us.auth0.com',
  clientId: 'd5n1iaymu906aIrm1DgPpLY4Zi0VoulX',
  useCookiesForTransactions: true,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
};

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    UiModule,
    DataModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-pmz1v-rd.us.auth0.com',
      clientId: 'd5n1iaymu906aIrm1DgPpLY4Zi0VoulX',
      useCookiesForTransactions: true,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
    StoreModule.forRoot({}),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(
      [
        {
          path: 'shop',
          loadChildren: () =>
            import('shop/Module').then((m) => m.RemoteEntryModule),
          canActivate: [AuthGuard],
        },
        {
          path: 'cart',
          loadChildren: () =>
            import('cart/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'about',
          loadChildren: () =>
            import('about/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'login',
          loadChildren: () =>
            import('login/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: '',
          component: NxWelcomeComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking', enableTracing: false }
    ),
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: Auth0Service, // TODO: here you can define the auth service, for exmaple: MyAuthService is used for API auth,
      // useClass: MyAuthService, // TODO: here you can define the auth service, for exmaple: MyAuthService is used for API auth,
    },
    {
      provide: AUTH_CONFIG,
      useValue: authConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
