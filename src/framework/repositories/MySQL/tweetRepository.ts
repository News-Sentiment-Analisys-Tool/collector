import { ITweetRepository } from '../../../business/repositories/ITweetRepository'
import { Tweet } from '../../../domain/entities/tweet'
import { TweetModel } from '../../models/tweet'

export class TweetRepository implements ITweetRepository {
    async save(tweet: Tweet): Promise<void> {
        await TweetModel.create({
            ...tweet
        })
    }

    async saveMany(tweets: any[]): Promise<void> {
        await TweetModel.bulkCreate(
        tweets,
        {
            ignoreDuplicates: true
        })
    }
}