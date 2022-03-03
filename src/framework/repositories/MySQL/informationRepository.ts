import { Op } from "@sequelize/core";
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

    async listCompanyByDate(company: number, startDate: string, endDate: string): Promise<any> {
        console.log(company, startDate, endDate)
        return await InformationModel.findAll({
            where: {
                company_id: company,
                created_at: {
                    [Op.gte]: startDate as any,
                    [Op.lte]: endDate as any
                }
            }
        })
    }
}
