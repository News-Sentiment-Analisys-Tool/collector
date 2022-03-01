import { ITweetRepository } from '../../../business/repositories/ITweetRepository'
import { Tweet } from '../../../domain/entities/tweet'

export class TweetRepository implements ITweetRepository {
    private memory: Tweet[] = []
    
    saveMany(tweets: Tweet[]): Promise<void> {
        throw new Error('Method not implemented.')
    }

    async save(tweet: Tweet): Promise<void> {
        this.memory.push(tweet)
    }
}