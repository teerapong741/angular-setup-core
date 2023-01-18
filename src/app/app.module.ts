import { AuthState } from 'src/app/core/auth/auth.state';
import { appRoutes } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

import { ngxsConfig, ngxsDevToolsConfig } from './../ngxs.config';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

import { NgxsModule } from '@ngxs/store';
import { Stores } from './stores';
import { CoreModule } from './core/core.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { allIcons, HeroIconModule } from 'ng-heroicon';
// import { allIcons, HeroIconModule } from 'ng-heroicon';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Ngxs
    NgxsModule.forRoot(Stores, ngxsConfig),
    NgxsStoragePluginModule.forRoot({
      key: ['auth'],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(ngxsDevToolsConfig),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,

    // 3rd party modules that require global configuration via forRoot
    HeroIconModule.forRoot(
      {
        ...allIcons,
      },
      {
        defaultHostDisplay: 'inlineBlock',
        attachDefaultDimensionsIfNoneFound: true,
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
