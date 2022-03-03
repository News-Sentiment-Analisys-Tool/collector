'use strict'

import { AnalyseInformationController } from '../../../adapters/controller/analyseInformationController'
import { SQSEvent } from 'aws-lambda'
import { Tweet } from '../../../domain/entities/tweet'

//const tweets: Tweet[] = require('../../../tweets.json')

exports.handler = async (
    event: SQSEvent
) => {
    const record = event.Records[0]
    console.log('record', record)

    const body = JSON.parse(record.body)
    console.log('body', body)

    const tweets: Tweet[] = body

    const analyseInformationController = new AnalyseInformationController()

    await analyseInformationController.run(tweets)
}