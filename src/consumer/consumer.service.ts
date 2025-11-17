import { Injectable } from "@nestjs/common"
import { consumerDTO } from "./consumer.dto"

@Injectable()
export class consumerService{
    getConsumerService(): string{
        return "Hello Consumer!"
    }

    getParam(id):string{
        return `Your ID is ${id}`
    }

    createConsumer(mydata):consumerDTO{
        return mydata
    }

    updateOne(id:string):string{
        return `Updated ID = ${id}`
    }

    updateDTO(updateData:object):object{
        // return `Updated DTO:\n ${updateData.}`
        return {msg:"Updated Data:",updateData}
    }

    deleteData(id:string): string{
        return `Deleted the ID: ${id}`
    }

    getQuery(name:string):string{
        return `You're name is: ${name}`
    }
    
    validated(validatedData:consumerDTO):object{
        return {
            "name": validatedData.name,
            "email": validatedData.email,
            //"password": validatedData.password,
            "NID": validatedData.NID
        }
    }

}

