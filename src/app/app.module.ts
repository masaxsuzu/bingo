import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioService } from './services/audio.service';
import { ConfirmService } from './services/confirm.service';
import { VersionService } from './services/version.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: AudioService, useValue: new AudioService('assets/drumroll.ogg', 'assets/cymbal.ogg') },
    { provide: ConfirmService, useValue: new ConfirmService() },
    { provide: VersionService, useValue: new VersionService(2, 1, 2, '106') }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
