import { Information } from '../../domain/entities/information'

export interface IInfomationRepository {
    saveMany(informations: Information[]): Promise<void>
}