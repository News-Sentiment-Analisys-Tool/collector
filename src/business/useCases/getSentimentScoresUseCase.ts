import { Information } from '../../domain/entities/information'
import { IInfomationRepository } from '../repositories/IInformationRepository'
import { IGetSentimentScoresDto } from '../../business/dto/getSentimentScores'

export class GetSentimentScoresUseCase {
    constructor (
        private readonly informationRepository: IInfomationRepository
    ) {}

    async execute(dto: IGetSentimentScoresDto): Promise<Information[]> {
        try {

            const { companyId, startDate, endDate } = dto

            const informations: Information[] = await this.informationRepository.listCompanyByDate(
                companyId,
                startDate.substring(0, 10),
                endDate.substring(0, 10)
            )

            return Promise.resolve(informations)

        } catch (error) {
            return Promise.reject({
                success: false,
                message: error
            })
        }
    }
}