import { ITranslateService } from '../../business/services/ITranslateService'
import { Language } from '../../domain/constants/language'

export class HandlePreProcessingUseCase {
    
    private readonly sourceLanguage: Language = 'pt'
    private readonly targetLanguage: Language = 'en'

    constructor (
        private setence: string,
        private translateService: ITranslateService
    ) {}

    async getPreProcessedSetence () {
        await this.translate()
        this.removeLinks()
        this.removeBreakLine()
        this.removePunctuation()
        this.removeNumbers()
        this.removeSymbols()
        this.removeStopwords()
        this.removeExtraSpaces()

        return await this.setence
    }

    async translate () {
        this.setence = await this.translateService.translate(this.setence, this.sourceLanguage, this.targetLanguage)
    }

    removeLinks () {
        const urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/gi
        this.setence = this.setence.replace(urlRegex, ' ')
    }

    removeBreakLine () {
        const breakLineRegex = /(\r\n|\n|\r)/gm
        this.setence = this.setence.replace(breakLineRegex, ' ')
    }

    removePunctuation () {
        const punctuationRegex = /[.,\/#!%\^&\*;:{}=\-_`~()@?]/g
        this.setence = this.setence.replace(punctuationRegex, ' ')
    }

    removeSymbols () {
        const symbolRegex = /(R|US)\$|million|billion/g
        this.setence = this.setence.replace(symbolRegex, ' ')
    }

    removeNumbers () {
        const numbersRegex = /\d+/g
        this.setence = this.setence.replace(numbersRegex, ' ')
    }

    removeStopwords () {
        const stopwordsRegex = /(\bfrom\b|\band\b|\bon\b|\bin\b|\ba\b|\ban\b|\bof\b|\bthat\b|\bthese\b|\bthose\b|\bthis\b|\bto\b|\b(t|T)he\b|\bfor\b)/g
        this.setence = this.setence.replace(stopwordsRegex, ' ')
    }

    removeExtraSpaces () {
        const extraSpacesRegex = /\s\s+/g
        this.setence = this.setence.replace(extraSpacesRegex, ' ')
    }
}
