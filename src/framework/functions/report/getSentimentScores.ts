'use strict'

import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda"
import { GetSentimentScoresController } from '../../../adapters/controller/getSentimentScoresController'
import { InputGetSentimentScoresSerializer } from '../../../adapters/serializers/sentimentScores/inputGetSentimentScores'

exports.handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log('init::start get sentiment scores')

    const inputGetSentimentScoresSerializer = new InputGetSentimentScoresSerializer

    const inputGetSentimentScoresDto = inputGetSentimentScoresSerializer.serialize(event)

    const getSentimentScoresController = new GetSentimentScoresController()

    const informations = await getSentimentScoresController.run(inputGetSentimentScoresDto)

    return {
        statusCode: 200,
        body: JSON.stringify(informations)
    }
}