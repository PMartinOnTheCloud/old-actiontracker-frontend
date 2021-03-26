
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {isNullOrUndefined} from 'actiontracker-entities';


@Injectable()
export class TranslationService {

    public availableLanguages = ['en', 'es', 'ca'];

    public constructor(public service: TranslateService) {

        console.log('constructor translation service');

        if(isNullOrUndefined(service.currentLang)) {
            const browserLang = service.getBrowserLang();

            service.addLangs(['en', 'es', 'ca']);
            service.setDefaultLang('en');
            service.use(browserLang.match(/en|es|ca/) ? browserLang : 'en');
        }

    }

}
