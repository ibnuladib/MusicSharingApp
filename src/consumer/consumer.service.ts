import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { consumerDTO } from "./consumer.dto"
import { consumerEntity } from "./consumer.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { MoreThan, Repository } from "typeorm"

@Injectable()
export class consumerService{
    constructor(@InjectRepository(consumerEntity) private consumerRepository : Repository<consumerEntity>){}
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

    async dbCreateConsumer(newConsumer: consumerEntity):Promise<consumerEntity>{
        return this.consumerRepository.save(newConsumer)
    }

    async dbGetUsers():Promise<consumerEntity[]>{
        return this.consumerRepository.find()
    }

    // async dbGetUserById(myid:number):Promise<consumerEntity|null>{
    //     return this.consumerRepository.findOneBy({id:myid})
    // }

    async dbGetUserById(myid:number){
        const data = await this.consumerRepository.findOneBy({id:myid})
        // console.log(data)
        if (data !== null){
            return data
        }
        else{
            throw new HttpException("The ID doesn't exist",HttpStatus.NOT_FOUND)
        }
        
    }

    async dbGetUserByIdQuery(qry:any){
        const data = await this.consumerRepository.findOneBy({id:qry.id})
        // console.log(data)
        if (data !== null){
            return data
        }
        else{
            throw new HttpException("The ID doesn't exist",HttpStatus.NOT_FOUND)
        }
        
    }

    async dbUpdateUser(myid:number, updatedUser : consumerEntity) {
        await this.consumerRepository.update(myid,updatedUser);
        const founddata =  this.consumerRepository.findOneBy({id:myid})
         if(founddata!==null){
            return founddata
         }
         else {
            throw new HttpException("This Id does not exist",HttpStatus.NOT_FOUND)
         }
    }

    async dbDeleteUser(myid:number){
        const result = await this.consumerRepository.delete(myid)

        if (result.affected === 0 ){
            throw new HttpException("ID doesnt exist",HttpStatus.NOT_FOUND)
        }
        else{
            return {"msg":"User deleted successfully"}
        }

    }
    
    async dbInactive():Promise<consumerEntity[]>{
        return await this.consumerRepository.find(
            {
                where:{status:"inactive"}
            }
        )
    }

    async dbOlder():Promise<consumerEntity[]>{
        return await this.consumerRepository.find(
            {
                where:{age:MoreThan(40)}
            }
        )
    }
}

