import async from 'async'
import { ITweetRepository } from '../repositories/ITweetRepository'
import { ITwitterService } from '../services/ITwitterService'
import { Tweet } from '../../domain/entities/tweet'
import { COMPANY } from '../constants/company'

export class SaveItauTweetsUseCase {
    
    constructor(
        private tweetRepository: ITweetRepository,
        private twitterService: ITwitterService,
    ) {}

    private company:string[] = ['itau', 'ITUB4']
    private tweets:Tweet[]

    async execute():Promise<any> {
        try {
            this.tweets = await this.twitterService.listByCompany(this.company)
            console.log('saveItauTweetsUseCase::tweets amount', this.tweets.length)
            console.log('saveItauTweetsUseCase::tweets', this.tweets)

            async.eachLimit(
                this.tweets,
                250,
                async (tweet, callback) => {                    
                    try {
                        const { text } = tweet
                        await this.tweetRepository.save({
                            ...tweet,
                            text: text.replace(/[\u0800-\uFFFF]/g, ''),
                            company_id: COMPANY.ITAU
                        } as Tweet)
                        console.log('saveItauTweetsUseCase::saved', tweet.id)
                    } catch(error) {
                        console.log("saveItauTweetsUseCase::error", error)
                    }
                    callback()
                })  
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