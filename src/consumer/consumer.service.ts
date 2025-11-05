import { Injectable } from "@nestjs/common"

@Injectable()
export class consumerService{
    getConsumerService(): string{
        return "Hello Consumer!"
    }

    getParam(id):string{
        return `Your ID is ${id}`
    }

    createConsumer(mydata):object{
        return mydata
    }

    updateOne(id:string):string{
        return `Updated ID = ${id}`
    }

    updateDTO(updateData:object):object{
        // return `Updated DTO:\n ${updateData.}`
        return updateData
    }

    deleteData(id:string): string{
        return `Deleted the ID: ${id}`
    }

    getQuery(name:string):string{
        return `You're name is: ${name}`
    }
    

}

