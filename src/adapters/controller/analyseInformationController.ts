import { Tweet } from '../../domain/entities/tweet'
import { AwsTranslateService } from '../../framework/services/awsTranslateService'
import { LoughramMcDonaldRepository } from '../../framework/repositories/Csv/LoughramMcdonald/loughramMcDonaldRepository'
import { InformationRepository } from '../../framework/repositories/MySQL/informationRepository'
import { AnalyseInformationUseCase } from '../../business/useCases/analyseInformationUseCase'
import { sequelize } from '../../framework/database/mysql'
export class AnalyseInformationController {
    async run(tweets: Tweet[]):Promise<void> {
        console.log('init::start analyse information')
        
        try {
            const awsTranslateService = new AwsTranslateService()
            const loughramMcDonaldRepository = new LoughramMcDonaldRepository()
            const informationRepository = new InformationRepository()
            const analyseInformationUseCase = new AnalyseInformationUseCase(
                awsTranslateService,
                loughramMcDonaldRepository,
                informationRepository
            )
    
            await this.handleDBConnection()

            await analyseInformationUseCase.execute(tweets)
            
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