import { Information } from '../../domain/entities/information'
import { Company } from '../../domain/constants/company'
export interface IInfomationRepository {
    saveMany(informations: Information[]): Promise<void>
    listCompanyByDate(company: Company, startDate: string, endDate: string): Promise<Information[]>
}