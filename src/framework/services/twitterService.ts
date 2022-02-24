import { fail, rejects } from 'assert'
import axios from 'axios'
import { ITwitterService } from "../../business/services/ITwitterService"
import { Tweet } from "../../domain/entities/tweet"

export class TwitterService implements ITwitterService {
    
    private url = 'https://api.twitter.com/2'
    private barearToken = process.env.BAREAR_TOKEN
    

    async getUsername(author_id: string): Promise<string> {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.barearToken}`
        }

        console.log("twitterService::headers", headers)
        
        this.url = `/users/${author_id}`

        const response = await axios.get(this.url, { headers })

        console.log(response.data.data)

        return new Promise((resolve, reject) => {
            if(response.data.data) {
                resolve(response.data.data)
            } else {
                reject({
                    statusCode: response.status,
                    message: 'Get Username Failed'
                })
            }
        })
    }

    async listByCompany(keywords: string[]): Promise<Tweet[]> {
        
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.barearToken}`
        }

        this.url += `/tweets/search/recent?query=(`
        this.url += ` -from:itaucultural -from:itau -from:itaucorretora -from:itauSocial`
        this.url += ` -from:petrobras -from:postospetrobras`
        this.url += ` -from:Bradesco -from:bradescoseguros`
        this.url += ` -from:B3_Oficial`
        this.url += ` is:verified -is:retweet (${keywords[0]} OR ${keywords[1]}) lang:pt)`
        this.url += `&max_results=100`
        this.url += `&tweet.fields=created_at,author_id`

        console.log("twitterService::headers", headers)
        console.log("twitterService::url", this.url)

        const response = await axios.get(this.url, { headers })

        return new Promise((resolve, reject) => {
            if(response.data.data) {
                resolve(response.data.data)
            } else {
                reject({
                    statusCode: response.status,
                    message: 'failed'
                })
            }
        })
    }
    
}