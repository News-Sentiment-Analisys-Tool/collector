import { SavePetrobrasTweetsUseCase } from '../../business/useCases/savePetrobrasTweetsUseCase'
import { sequelize } from '../../framework/database/mysql';
import { TweetRepository } from '../../framework/repositories/MySQL/tweetRepository'
import { TwitterService } from '../../framework/services/twitterService'

export class SavePetrobrasTweetsController {
    async run ():Promise<void> {
        try {
            const tweetRepositoryInMemory = new TweetRepository()
            const twitterService = new TwitterService()
        
            const saveItauTweetsUseCase = new SavePetrobrasTweetsUseCase(
                tweetRepositoryInMemory,
                twitterService
            )
    
            await this.handleDBConnection()
            
            await saveItauTweetsUseCase.execute()

        } catch (error) {
            console.log({
                error
            })
        }
    }

    async handleDBConnection():Promise<void> {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.')
          } catch (error) {
            console.error('Unable to connect to the database:', error)
            throw (error)
          }
    }
}
