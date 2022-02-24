import { SaveB3TweetsUseCase } from '../../business/useCases/saveB3TweetsUseCase'
import { sequelize } from '../../framework/database/mysql';
import { TweetRepository } from '../../framework/repositories/MySQL/tweetRepository'
import { TwitterService } from '../../framework/services/twitterService'

export class SaveB3TweetsController {
    async run ():Promise<any> {
        try {
            const tweetRepositoryInMemory = new TweetRepository()
            const twitterService = new TwitterService()
        
            const saveItauTweetsUseCase = new SaveB3TweetsUseCase(
                tweetRepositoryInMemory,
                twitterService
            )
    
            await this.handleDBConnection()
            
            const success = await saveItauTweetsUseCase.execute()

            return {
                statusCode: 200,
                body: JSON.stringify({
                    body: {
                        message: {},
                        success
                    }
                })
            }

        } catch (error) {
            console.log({
                error
            })

            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: error,
                    success: false
                })
            }
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
