import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"

import { MatButtonModule } from "@angular/material/button"
import { MatSliderModule } from "@angular/material/slider"
import { MatStepperModule } from "@angular/material/stepper"
import { MatListModule } from "@angular/material/list"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatIconModule } from "@angular/material/icon"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import { MatGridListModule } from "@angular/material/grid-list"
import { MatDividerModule } from "@angular/material/divider"
import { MatChipsModule } from "@angular/material/chips"
import { MatBadgeModule } from "@angular/material/badge"
import { MatToolbarModule } from "@angular/material/toolbar"

import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { UploadComponent } from "./upload/upload.component"
import { environment } from "../environments/environment"
import { PixelateComponent } from "./pixelate/pixelate.component"
import { CanvasPixelateComponent } from "./canvas-pixelate/canvas-pixelate.component"
import { StepperComponent } from "./stepper/stepper.component"
import { MatchComponent } from "./match/match.component"
import { ItemsComponent } from "./items/items.component"
import { PatternComponent } from "./pattern/pattern.component"
import { CanvasPatternComponent } from "./canvas-pattern/canvas-pattern.component"
import { CanvasPatternImagesComponent } from "./canvas-pattern-images/canvas-pattern-images.component"
import { CollectionsComponent } from "./collections/collections.component"
import { CollectionCreationComponent } from "./collection-creation/collection-creation.component"
import { CollectionItemsComponent } from "./collection-items/collection-items.component"
import { ItemCreationComponent } from "./item-creation/item-creation.component"
import { ColorBadgeComponent } from "./color-badge/color-badge.component"
import { ItemsCreationComponent } from "./items-creation/items-creation.component"

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "upload", component: StepperComponent },
  { path: "admin", component: CollectionsComponent },
  { path: "admin/collections/:id", component: CollectionItemsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    PixelateComponent,
    CanvasPixelateComponent,
    StepperComponent,
    MatchComponent,
    ItemsComponent,
    PatternComponent,
    CanvasPatternComponent,
    CanvasPatternImagesComponent,
    CollectionsComponent,
    CollectionCreationComponent,
    CollectionItemsComponent,
    ItemCreationComponent,
    ColorBadgeComponent,
    ItemsCreationComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatBadgeModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
