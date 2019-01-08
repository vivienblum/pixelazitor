import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { MatButtonModule } from "@angular/material/button"
import { MatSliderModule } from "@angular/material/slider"

import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { UploadComponent } from "./upload/upload.component"
import { environment } from "../environments/environment"
import { PixelateComponent } from "./pixelate/pixelate.component"
import { CanvasPixelateComponent } from "./canvas-pixelate/canvas-pixelate.component"

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "upload", component: UploadComponent },
  { path: "pixelate", component: PixelateComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    PixelateComponent,
    CanvasPixelateComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
