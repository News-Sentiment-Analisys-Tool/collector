import { ITweetRepository } from '../repositories/ITweetRepository'
import { ITwitterService } from '../services/ITwitterService'
import { ISaveTweetDto } from '../dto/saveTweetDto'

export class SaveTweetsUseCase {
    
    constructor(
        private tweetRepository: ITweetRepository,
        private twitterService: ITwitterService
    ) {}

    async execute(data: ISaveTweetDto) {

        const tweets = await this.twitterService.listBetweenDate(new Date('2022-01-01'), new Date('2022-01-02'))

        for await (const tweet of tweets) {
            await this.tweetRepository.save(tweet)
        }

        return data
    }
}