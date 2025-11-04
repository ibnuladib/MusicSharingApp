import { Injectable } from "@nestjs/common"

@Injectable()
export class consumerService{
    getConsumerService(): string{
        return "Hello user!"
    }

    createConsumer(mydata):object{
        return mydata
    }

}

