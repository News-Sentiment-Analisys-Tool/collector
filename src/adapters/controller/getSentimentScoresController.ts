import { Information } from "../../domain/entities/information";
import { GetSentimentScoresUseCase } from "../../business/useCases/getSentimentScoresUseCase";
import { InformationRepository } from "../../framework/repositories/MySQL/informationRepository";
import { IGetSentimentScoresDto } from '../../business/dto/getSentimentScores'

export class GetSentimentScoresController {
    async run(dto: IGetSentimentScoresDto): Promise<Information[]> {
        try {

            const informationRepository = new InformationRepository()
            const getSentimentScoresUseCase = new GetSentimentScoresUseCase(
                informationRepository
            )

            const informations:Information[] = await getSentimentScoresUseCase.execute(dto)

            return Promise.resolve(informations)

        } catch (error) {
            return Promise.reject({
                error
            })
        }
    }
}