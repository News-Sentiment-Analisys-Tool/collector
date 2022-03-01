import { Language } from '../constants/language'

export interface Information {
    id: string
    text: string
    created_at: string
    source_id: number
    company_id: number
    language: Language
    sentimentScore: number
}