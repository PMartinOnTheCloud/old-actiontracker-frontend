
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatMenuModule, MatTableModule, MatCheckboxModule,
    MatDialogModule,
    MatSortModule, MatCheckbox, MatDatepickerModule, MatButtonToggleModule, MatSlideToggleModule, MatListModule,
    MatStepperModule, MatSelectModule,
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatIconModule} from '@angular/material/icon';
import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './components/app.component';
import {LoginComponent, LoginService} from './components/login';
import {TestComponent} from './components/test/test.component';
import {AppRouter} from './components/router/app-router.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ValidatorInputComponent} from './components/validator-input/validator-input.component';
import {DashboardElementComponent} from './components/dashboard-element/dashboard-element.component';
import {EntityModifierComponent} from './components/entity-modifier/entity-modifier.component';
import {EntityService} from './services/EntityService';
import {TableComponent} from './components/table/table.component';
import {ChangeDataDialogComponent} from './components/change-data-dialog/change-data-dialog.component';
import {KeysPipe, StringifyPipe} from './pipes';
import {FormBuilderComponent} from './components/form-builder/form-builder.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ResizeService} from "./services/ResizeService";
import {ThemeService} from './services/ThemeService';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ConfirmDialogComponent} from './components/message-dialog/message-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RecoverUserOrPasswordComponent } from './components/recover-user-or-password/recover-user-or-password.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SimpleHttpService} from './services/SimpleHttpService';
import {TranslationService} from './services/TranslationService';
import { ControlUsersComponent } from './components/control-users/control-users.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
        LoginComponent,
        DashboardComponent,
        ValidatorInputComponent,
        KeysPipe,
        StringifyPipe,
        DashboardElementComponent,
        EntityModifierComponent,
        TableComponent,
        ChangeDataDialogComponent,
        FormBuilderComponent,
        NavbarComponent,
        PageNotFoundComponent,
        ConfirmDialogComponent,
        UserProfileComponent,
        RecoverUserOrPasswordComponent,
        ControlUsersComponent,
        // MapComponent,
    ],
    entryComponents: [
        ChangeDataDialogComponent,
        ConfirmDialogComponent,
        ValidatorInputComponent,
        MatCheckbox,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        AppRouter,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        ChartsModule,
        MatMenuModule,
        MatSortModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatListModule,
        MatStepperModule,
        MatSelectModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyAwM538hHsLiBFVBVY6ViEvwTENZnbzXqU'
        // })

    ],
    providers: [LoginService, EntityService, ResizeService, ThemeService, SimpleHttpService, TranslationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
