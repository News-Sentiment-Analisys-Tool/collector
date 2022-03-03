import { Company } from '../../domain/constants/company'

export interface IGetSentimentScoresDto {
    companyId: Company
    startDate: string
    endDate: string
}