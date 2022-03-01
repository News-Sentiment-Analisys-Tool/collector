import { Word } from '../../domain/entities/word'

export interface ILoughramMcdonaldRepository {
    load(): void
    list(): Word[]
}