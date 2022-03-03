import { APIGatewayProxyEvent } from 'aws-lambda'
import { IGetSentimentScoresDto } from '../../../business/dto/getSentimentScores'

export class InputGetSentimentScoresSerializer {
    serialize (event: any) {
        const params = event.queryStringParameters

        const { companyId, startDate, endDate } = params

        const getSentimentScoresDto: IGetSentimentScoresDto = {
            companyId,
            startDate,
            endDate
        }

        return getSentimentScoresDto
    }
}