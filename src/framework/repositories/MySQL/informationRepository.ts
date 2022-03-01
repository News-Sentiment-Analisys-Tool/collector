import { IInfomationRepository } from "../../../business/repositories/IInformationRepository";
import { InformationModel } from "../../models/information";

export class InformationRepository implements IInfomationRepository {
    async saveMany(informations: any[]): Promise<void> {
        await InformationModel.bulkCreate(
            informations,
            {  
                ignoreDuplicates: true
            }
        )
    }
}