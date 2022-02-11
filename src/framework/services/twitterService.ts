import axios from 'axios'
import { ITwitterService } from "../../business/services/ITwitterService"
import { Tweet } from "../../domain/entities/tweet"

export class TwitterService implements ITwitterService {
    
    private url = 'https://api.twitter.com/2/tweets'
    private barearToken = process.env.BAREAR_TOKEN
    
    async listBetweenDate(begin: Date, end: Date): Promise<Tweet[]> {
        
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.barearToken}`
        }

        const since_id = '1491932837041389600'
        const start_time = `&start_time=${new Date('2022-02-09').toISOString()}`
        const next_token = 'b26v89c19zqg8o3fpe75bitx2p03l8pyyppeloplj1qpp'

        this.url += `/search/recent?query=itau&max_results=100&tweet.fields=created_at&next_token=${next_token}`

        const response = await axios.get(this.url, { headers });
        
        return new Promise((resolve, reject) => {
            if(response.data.data) {
                resolve(response.data.data)
            } else {
                reject([])
            }
        })
    }
    
}