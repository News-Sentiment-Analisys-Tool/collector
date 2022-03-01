import async from 'async'
import { ITweetRepository } from '../repositories/ITweetRepository'
import { ITwitterService } from '../services/ITwitterService'
import { Tweet } from '../../domain/entities/tweet'
import { COMPANY } from '../../domain/constants/company'

export class SaveB3TweetsUseCase {
    
    constructor(
        private tweetRepository: ITweetRepository,
        private twitterService: ITwitterService,
    ) {}

    private company:string[] = ['b3', 'B3SA3']
    private tweets:Tweet[]

    async execute():Promise<any> {
        try {
            this.tweets = await this.twitterService.listByCompany(this.company)
            console.log('saveB3TweetsUseCase::tweets amount', this.tweets.length)
            console.log('saveB3TweetsUseCase::tweets', this.tweets)

            const tweets = this.tweets.map(tweet => {
                const { text } = tweet
                return {
                    ...tweet,
                    text: text.replace(/[\u0800-\uFFFF]/g, ''),
                    company_id: COMPANY.B3
                } as Tweet
            })

            await this.tweetRepository.saveMany(tweets)
            console.log('saveB3TweetsUseCase::saved')

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