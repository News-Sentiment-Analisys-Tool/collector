import { Language } from '../constants/language'

export interface ITranslateService {
    translate(setence: string, sourceLanguageCode: Language, TargetLanguageCode: Language):Promise<string>
}