import { Word } from '../../../../domain/entities/word'
import { ILoughramMcdonaldRepository } from '../../../../business/repositories/ILoughramMcdonaldRepository'
import * as fs from "fs"
import * as path from "path"
import * as csv from 'csv-parser'
import axios from 'axios'

export class LoughramMcDonaldRepository implements ILoughramMcdonaldRepository {

    private words: Word[] = []

    load():void {
        const filePath = path.resolve(__dirname, 'dictionaries/LoughranMcDonald_MasterDictionary_2020')
        fs.createReadStream(filePath + '.csv')
        .pipe(csv())
        .on('data', (data: Word) => this.words.push(data))
        .on('end', () => {
            fs.writeFile(filePath + '.json', JSON.stringify(this.words), () => {})
        });
    }

    async list(): Promise<object> {
        let lexicon = {}

        const response = await axios.get('https://raw.githubusercontent.com/News-Sentiment-Analisys-Tool/collector/feature/%235-Analisador-de-dados/src/framework/repositories/Csv/LoughramMcdonald/dictionaries/LoughranMcDonald_MasterDictionary_2020.json')
        
        const lexiconJson = response.data
        
        for (const word of lexiconJson) {
            lexicon[word.Word] = word
        }
        return lexicon
    }
}