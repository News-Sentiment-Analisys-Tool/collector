
import * as express from 'express'
import * as cors from 'cors'
import { Router, Request, Response } from 'express'
import { GetSentimentScoresController } from '../../adapters/controller/getSentimentScoresController'
import { InputGetSentimentScoresSerializer } from '../../adapters/serializers/sentimentScores/inputGetSentimentScores'

const app = express()

const route = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
  }));

route.get('/report', async (req: Request, res: Response) => {
    const inputGetSentimentScoresSerializer = new InputGetSentimentScoresSerializer

    const inputGetSentimentScoresDto = inputGetSentimentScoresSerializer.serialize({
        queryStringParameters: req.query
    })

    const getSentimentScoresController = new GetSentimentScoresController()

    const informations = await getSentimentScoresController.run(inputGetSentimentScoresDto)

    res.json({
        ...informations
    })
})

app.use(route)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
