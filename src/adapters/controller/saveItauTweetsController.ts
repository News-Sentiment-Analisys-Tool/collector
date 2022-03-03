import { SaveItauTweetsUseCase } from '../../business/useCases/saveItauTweetsUseCase'
import { sequelize } from '../../framework/database/mysql';
import { TweetRepository } from '../../framework/repositories/MySQL/tweetRepository'
import { SqsService } from '../../framework/services/sqsService'
import { TwitterService } from '../../framework/services/twitterService'

export class SaveItauTweetsController {
    async run ():Promise<void> {
        try {
            const tweetRepositoryInMemory = new TweetRepository()
            const twitterService = new TwitterService()
            const sqsService = new SqsService()
        
            const saveItauTweetsUseCase = new SaveItauTweetsUseCase(
                tweetRepositoryInMemory,
                twitterService,
                sqsService
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
