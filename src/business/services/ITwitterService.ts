import { Tweet } from "../../domain/entities/tweet";

export interface ITwitterService {
    listByCompany(keywords: string[]): Promise<Tweet[]>
    getUsername(author_id: string): Promise<string>
}