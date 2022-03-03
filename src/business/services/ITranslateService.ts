import { Language } from '../../domain/constants/language'

export interface ITranslateService {
    translate(setence: string, sourceLanguageCode: Language, TargetLanguageCode: Language):Promise<string>
}