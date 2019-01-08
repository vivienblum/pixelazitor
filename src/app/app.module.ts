import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { MatButtonModule } from "@angular/material/button"
import { MatSliderModule } from "@angular/material/slider"
import { MatStepperModule } from "@angular/material/stepper"

import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { UploadComponent } from "./upload/upload.component"
import { environment } from "../environments/environment"
import { PixelateComponent } from "./pixelate/pixelate.component"
import { CanvasPixelateComponent } from "./canvas-pixelate/canvas-pixelate.component"
import { StepperComponent } from "./stepper/stepper.component"

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "upload", component: StepperComponent },
  { path: "pixelate", component: PixelateComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    PixelateComponent,
    CanvasPixelateComponent,
    StepperComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
