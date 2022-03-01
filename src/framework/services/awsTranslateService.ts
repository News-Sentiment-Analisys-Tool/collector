import * as AWS from 'aws-sdk'
import { Language } from '../../business/constants/language'
import { ITranslateService } from '../../business/services/ITranslateService'

export class AwsTranslateService implements ITranslateService {
    
    private readonly resource: AWS.Translate
    
    constructor () {
        this.resource = new AWS.Translate()
    }

    translate(setence: string, sourceLanguageCode: Language, targetLanguageCode: Language): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const translateParams: AWS.Translate.Types.TranslateTextRequest = {
                Text: setence,
                SourceLanguageCode: sourceLanguageCode,
                TargetLanguageCode: targetLanguageCode
            }

            const translatedSetence: AWS.Translate.Types.TranslateTextResponse = await this.resource.translateText(translateParams).promise()

            if (translatedSetence) {
                resolve(translatedSetence.TranslatedText)
            } 

            reject('setence translation error')
        })
    }


}