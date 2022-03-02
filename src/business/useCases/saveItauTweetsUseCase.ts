import async from 'async'
import { ITweetRepository } from '../repositories/ITweetRepository'
import { ITwitterService } from '../services/ITwitterService'
import { IMessageService } from '../services/IMessageService'
import { Tweet } from '../../domain/entities/tweet'
import { COMPANY } from '../../domain/constants/company'

export class SaveItauTweetsUseCase {
    
    constructor(
        private tweetRepository: ITweetRepository,
        private twitterService: ITwitterService,
        private messageService: IMessageService,
    ) {}

    private queueName:string = 'informationToBeAnalysedSqsQueueName'
    private company:string[] = ['itau', 'ITUB4']
    private tweets:Tweet[]

    async execute():Promise<any> {
        try {
            this.tweets = await this.twitterService.listByCompany(this.company)
            console.log('saveItauTweetsUseCase::tweets amount', this.tweets.length)
            console.log('saveItauTweetsUseCase::tweets', this.tweets)

            const tweets = this.tweets.map(tweet => {
                const { text } = tweet
                return {
                    ...tweet,
                    text: text.replace(/[\u0800-\uFFFF]/g, ''),
                    company_id: COMPANY.ITAU
                } as Tweet
            })

            await this.tweetRepository.saveMany(tweets)
            console.log('saveItauTweetsUseCase::saved')

            await this.messageService.send(this.queueName, JSON.stringify(tweets))
            console.log('saveItauTweetsUseCase::tweets message sent')

        } catch (error) {
            return Promise.resolve({
                success: false,
                message: error
            })
        }

        return Promise.resolve({
            success: true, 
            data: this.tweets
        })
    }
}