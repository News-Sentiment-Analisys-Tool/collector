import { ITweetRepository } from '../../../business/repositories/ITweetRepository'
import { Tweet } from '../../../domain/entities/tweet'

export class TweetRepository implements ITweetRepository {
    private memory: Tweet[] = []

    async save(tweet: Tweet): Promise<void> {
        this.memory.push(tweet)
    }
}