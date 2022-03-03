import * as AWS from 'aws-sdk'
import { IMessageService } from '../../business/services/IMessageService'

export class SqsService implements IMessageService {
    
    private readonly resource: AWS.SQS;

    constructor () {
        this.resource = new AWS.SQS()
    }
    
    send(queueName: string, messageBody: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const queueUrl = await this.getQueueUrl(queueName)

            if(!queueUrl) {
                reject(`sqs::sqs queue url error from ${queueName}`)
            }

            const params: AWS.SQS.SendMessageRequest = {
                QueueUrl: queueUrl,
                MessageBody: messageBody
            }

            const message: AWS.SQS.SendMessageResult = await this.resource.sendMessage(params).promise()

            if(!message) {
                reject(`sqs::sqs send message error from ${queueName} with body ${messageBody}`)
            }
        })
    }

    getQueueUrl(queueName: string): Promise<string> {
        return new Promise(async (resolve, reject) => {

            const params: AWS.SQS.GetQueueUrlRequest = {
                QueueName: queueName
            }

            const result: AWS.SQS.GetQueueUrlResult = await this.resource.getQueueUrl(params).promise()

            if (result) {
                resolve(result.QueueUrl!)
            }

            reject(`sqs::sqs queue url error from ${queueName}`)
        })
    }
}