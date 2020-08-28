import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AudioService } from './services/audio.service';
import { ConfirmService } from './services/confirm.service';
import { VersionService } from './services/version.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfigComponent } from './pages/config/config.component';

const appRoutes: Routes = [
  { path: 'experimental', component: ConfigComponent },
  { path: '',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: AudioService, useValue: new AudioService('assets/drumroll.ogg', 'assets/cymbal.ogg') },
    { provide: VersionService, useValue: new VersionService(3, 3, 0, '111') }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
