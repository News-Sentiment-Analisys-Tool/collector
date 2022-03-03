import { SaveBradescoTweetsUseCase } from '../../business/useCases/saveBradescoTweetsUseCase'
import { sequelize } from '../../framework/database/mysql';
import { TweetRepository } from '../../framework/repositories/MySQL/tweetRepository'
import { SqsService } from '../../framework/services/sqsService'
import { TwitterService } from '../../framework/services/twitterService'


export class SaveBradescoTweetsController {
    async run ():Promise<void> {
        try {
            const tweetRepositoryInMemory = new TweetRepository()
            const twitterService = new TwitterService()
            const sqsService = new SqsService()
        
            const saveBradescoTweetsUseCase = new SaveBradescoTweetsUseCase(
                tweetRepositoryInMemory,
                twitterService,
                sqsService
            )

            await this.handleDBConnection()
            
            await saveBradescoTweetsUseCase.execute()

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
