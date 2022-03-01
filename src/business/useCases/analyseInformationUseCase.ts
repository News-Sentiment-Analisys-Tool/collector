import { Tweet } from '../../domain/entities/tweet'
import { Information } from '../../domain/entities/information'
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

    private informations: Information[] = []

    async execute(tweets: Tweet[]): Promise<void> {
        const dictionary = await this.loughramMcDonaldRepository.list()

        for (const tweet of tweets) {
            const handlePreProcessmentUseCase = new HandlePreProcessingUseCase(tweet.text, this.translateService)

            const sentence = await handlePreProcessmentUseCase.getPreProcessedSetence()

            let sentimentScore = 0

            let text = sentence

            for (const word of text.split(' ')) {
                let wordObj = dictionary[word.toUpperCase()]
                
                if (wordObj) {
                    if (wordObj.Positive === '2009') sentimentScore += 1
                    if (wordObj.Negative === '2009') sentimentScore -= 1
                    //console.log(wordObj.Word, sentimentScore)
                }   
            }
    
            const information: Information = {
                id: tweet.id,
                text: sentence,
                source_id: 1,
                company_id: tweet.company_id,
                language: 'en',
                sentimentScore: sentimentScore,
                created_at: tweet.created_at
            }

            this.informations.push(information)

            console.log(information)
        }
    }
}