import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { environment } from '../environments/environment';
import { PixelateComponent } from './pixelate/pixelate.component';
import { CanvasPixelateComponent } from './canvas-pixelate/canvas-pixelate.component';
import { StepperComponent } from './stepper/stepper.component';
import { MatchComponent } from './match/match.component';
import { MatchResultComponent } from './match-result/match-result.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionCreationComponent } from './collection-creation/collection-creation.component';
import { CollectionItemsComponent } from './collection-items/collection-items.component';
import { ItemCreationComponent } from './item-creation/item-creation.component';
import { ColorBadgeComponent } from './color-badge/color-badge.component';
import { ItemsCreationComponent } from './items-creation/items-creation.component';
import { PatternImagesComponent } from './pattern-images/pattern-images.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'upload', component: StepperComponent },
    { path: 'match/:id', component: MatchResultComponent },
    { path: 'admin', component: CollectionsComponent },
    { path: 'admin/collections/:id', component: CollectionItemsComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UploadComponent,
        PixelateComponent,
        CanvasPixelateComponent,
        StepperComponent,
        MatchComponent,
        MatchResultComponent,
        ItemsComponent,
        ItemComponent,
        ItemListComponent,
        CollectionsComponent,
        CollectionCreationComponent,
        CollectionItemsComponent,
        ItemCreationComponent,
        ColorBadgeComponent,
        ItemsCreationComponent,
        PatternImagesComponent,
    ],
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true }),
        BrowserModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
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
        MatToolbarModule,
        MatDialogModule,
        MatCheckboxModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
