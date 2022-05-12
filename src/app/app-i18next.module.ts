import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService, defaultInterpolationFormat } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './i18next/i18next-resources';

export function appInit(i18next: ITranslationService) {
  return () =>
    i18next
      .use<any>(LanguageDetector)
      .init({
        supportedLngs: ['en', 'ru'],
        fallbackLng: 'ru',
        debug: true,
        returnEmptyString: false,
        ns: ['translation', 'validation', 'error'],
        resources: resources,
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat),
        }
      });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
  },
];

@NgModule({
  imports: [I18NextModule.forRoot()],
  providers: [I18N_PROVIDERS],
  exports: [I18NextModule],
})
export class AppI18nextModule { }
