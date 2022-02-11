import 'dotenv/config'
import { SaveTweetsUseCase } from './business/useCases/saveTweetsUseCase'
import { TweetRepositoryInMemory } from './framework/repositories/tweetRepositoryInMemory'
import { TwitterService } from './framework/services/twitterService'

const execute = async () => {

    const tweetRepositoryInMemory = new TweetRepositoryInMemory()
    const twitterService = new TwitterService()

    const saveTweetsUseCase = new SaveTweetsUseCase(
        tweetRepositoryInMemory,
        twitterService
    )

    saveTweetsUseCase.execute({
        text: "Ola mundo",
        createdAt: new Date()
    })
}

execute()