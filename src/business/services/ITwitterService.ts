import { Tweet } from "../../domain/entities/tweet";

export interface ITwitterService {
    listBetweenDate(begin: Date, end: Date): Promise<Tweet[]>
}