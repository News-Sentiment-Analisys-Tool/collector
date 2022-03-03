export interface IMessageService {
    send(queueName: string, messageBody: string): Promise<void>
}