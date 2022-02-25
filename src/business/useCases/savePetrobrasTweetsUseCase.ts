import async from 'async'
import { ITweetRepository } from '../repositories/ITweetRepository'
import { ITwitterService } from '../services/ITwitterService'
import { Tweet } from '../../domain/entities/tweet'
import { COMPANY } from '../constants/company'

export class SavePetrobrasTweetsUseCase {
    
    constructor(
        private tweetRepository: ITweetRepository,
        private twitterService: ITwitterService,
    ) {}

    private company:string[] = ['petrobras', 'PETR4']
    private tweets:Tweet[]

    async execute():Promise<any> {
        try {
            this.tweets = await this.twitterService.listByCompany(this.company)
            console.log('savePetrobrasTweetsUseCase::tweets amount', this.tweets.length)
            console.log('savePetrobrasTweetsUseCase::tweets', this.tweets)

            const tweets = this.tweets.map(tweet => {
                const { text } = tweet
                return {
                    ...tweet,
                    text: text.replace(/[\u0800-\uFFFF]/g, ''),
                    company_id: COMPANY.PETROBRAS
                } as Tweet
            })

            await this.tweetRepository.saveMany(tweets)
            console.log('savePetrobrasTweetsUseCase::saved')

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