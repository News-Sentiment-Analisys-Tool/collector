import { Word } from '../../../../domain/entities/word'
import { ILoughramMcdonaldRepository } from '../../../../business/repositories/ILoughramMcdonaldRepository'
import * as fs from "fs"
import * as path from "path"
import * as csv from 'csv-parser'
const lexicon = require('./dictionaries/LoughranMcDonald_MasterDictionary_2020.json')

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

    list():Word[] {
        return lexicon
    }
}