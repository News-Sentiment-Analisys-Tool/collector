import { Tweet } from '../../domain/entities/tweet'
import { ITranslateService } from '../services/ITranslateService'
import { ILoughramMcdonaldRepository } from '../repositories/ILoughramMcdonaldRepository'
import { IInfomationRepository } from '../repositories/IInformationRepository'
import { HandlePreProcessingUseCase } from './handlePreProcessmentUseCase' 

export class AnalyseInformationUseCase {
    constructor (
        private readonly translateService: ITranslateService,
        private readonly loughramMcDonaldRepository: ILoughramMcdonaldRepository,
        private readonly informationRepository: IInfomationRepository
    ) {}

    async execute(tweets: Tweet[]): Promise<void> {
        const handlePreProcessmentUseCase = new HandlePreProcessingUseCase(tweets[8].text, this.translateService)

        const setence = await handlePreProcessmentUseCase.getPreProcessedSetence()

        const words = this.loughramMcDonaldRepository.list()

        let dictionary = {}
        let score

        for (const word of words) {
            dictionary[word.Word] = word
        }
        console.log(setence)
        for (const word of setence.split(' ')) {
            score = 0
            let wordObj = dictionary[word.toUpperCase()]
            
            if (wordObj) {
                if (wordObj.Positive === '2009') score += 1
                if (wordObj.Negative === '2009') score -= 1
                console.log(wordObj.Word, 'Final Score: ', score)
            }   
        }
    }
}