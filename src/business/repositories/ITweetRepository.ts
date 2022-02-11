import { Tweet } from '../../domain/entities/tweet'

export interface ITweetRepository {
    save(data: Tweet): Promise<void>
}