import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { consumerDTO, loginDTO } from "./consumer.dto"
import { consumerEntity } from "./consumer.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { MoreThan, Repository } from "typeorm"
import { consumerLikesEntity } from "./consumerLikes.entity"
import { consumerCommentsEntity } from "./consumerComments.entity"

@Injectable()
export class consumerService {
  constructor(
    @InjectRepository(consumerEntity) private consumerRepository: Repository<consumerEntity>,
    @InjectRepository(consumerCommentsEntity) private consCommentRepo: Repository<consumerCommentsEntity>
  ) { }


  @InjectRepository(consumerLikesEntity)
  private likeRepo: Repository<consumerLikesEntity>

  @InjectRepository(consumerCommentsEntity)
  private commentRepo: Repository<consumerCommentsEntity>

  getConsumerService(): string {
    return "Hello Consumer!"
  }

  getParam(id): string {
    return `Your ID is ${id}`
  }

  createConsumer(mydata): consumerDTO {
    return mydata
  }

  updateOne(id: string): string {
    return `Updated ID = ${id}`
  }

  updateDTO(updateData: object): object {
    // return `Updated DTO:\n ${updateData.}`
    return { msg: "Updated Data:", updateData }
  }

  deleteData(id: string): string {
    return `Deleted the ID: ${id}`
  }

  getQuery(name: string): string {
    return `You're name is: ${name}`
  }

  validated(validatedData: consumerDTO): object {
    return {
      "name": validatedData.fullname,
      "email": validatedData.email,
      //"password": validatedData.password,
      "NID": validatedData.NID
    }
  }

  async dbCreateConsumer(newConsumer: consumerEntity): Promise<consumerEntity> {
    return this.consumerRepository.save(newConsumer)
  }

  async dbGetUsers(): Promise<consumerEntity[]> {
    return this.consumerRepository.find()
  }

  // async dbGetUserById(myid:number):Promise<consumerEntity|null>{
  //     return this.consumerRepository.findOneBy({id:myid})
  // }

  async dbGetUserById(myid: number) {
    const data = await this.consumerRepository.findOneBy({ id: myid })
    // console.log(data)
    if (data !== null) {
      return data
    }
    else {
      throw new HttpException("The ID doesn't exist", HttpStatus.NOT_FOUND)
    }

  }



  async dbGetUserByIdQuery(qry: any) {
    const data = await this.consumerRepository.findOneBy({ id: qry.id })
    // console.log(data)
    if (data !== null) {
      return data
    }
    else {
      throw new HttpException("The ID doesn't exist", HttpStatus.NOT_FOUND)
    }

  }

  async dbUpdateUser(myid: string, updatedUser: consumerEntity) {
    await this.consumerRepository.update(myid, updatedUser);
    const founddata = this.consumerRepository.findOneBy({ fullName: myid })
    if (founddata !== null) {
      return founddata
    }
    else {
      throw new HttpException("This Id does not exist", HttpStatus.NOT_FOUND)
    }
  }

  async dbDeleteUser(myid: number) {
    const user = await this.consumerRepository.findOne({
      where: { id: myid }
    });

    if (!user) {
      throw new HttpException("ID doesn't exist", HttpStatus.NOT_FOUND);
    }

    // Manually delete all related likes (OneToOne relationship)
    await this.likeRepo.delete({ consumerID: { id: myid } });

    // Manually delete all related comments (OneToMany relationship)
    await this.commentRepo.delete({ consumerID: { id: myid } });

    // Now delete the user
    await this.consumerRepository.delete(myid);

    return { "msg": "User deleted successfully" };
  }

  async dbInactive(): Promise<consumerEntity[]> {
    return await this.consumerRepository.find(
      {
        where: { status: "inactive" }
      }
    )
  }

  async dbOlder(): Promise<consumerEntity[]> {
    return await this.consumerRepository.find(
      {
        where: { age: MoreThan(40) }
      }
    )
  }

  async dbGetUserByName(usrname: string): Promise<consumerEntity[]> {
    const data = await this.consumerRepository.find(
      {
        where: { fullName: usrname }
      }
    )
    // console.log(data)
    if (data !== null) {
      return data
    }
    else {
      throw new HttpException("The ID doesn't exist", HttpStatus.NOT_FOUND)
    }

  }

  // Consumer Likes - Single favorite song per user (upsert)
  async dbCreateLike(newLike: consumerLikesEntity): Promise<consumerLikesEntity> {
    // Check if user already has a favorite song
    const existingLike = await this.likeRepo.findOne({
      where: { consumerID: { id: newLike.consumerID.id } },
      relations: ['consumerID']
    });

    if (existingLike) {
      // Update existing favorite
      existingLike.songID = newLike.songID;
      existingLike.songName = newLike.songName;
      return this.likeRepo.save(existingLike);
    }

    // Create new favorite
    return this.likeRepo.save(newLike);
  }

  async getAllLikes(): Promise<consumerLikesEntity[]> {
    return this.likeRepo.find()
  }

  async getLikeById(id: number): Promise<consumerLikesEntity> {
    const like = await this.likeRepo.findOne({ where: { id } })
    if (!like) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }
    return like
  }

  async deleteLike(id: number): Promise<void> {
    const result = await this.likeRepo.delete(id)
    if (result.affected === 0) {
      throw new HttpException("Like ID doesn't exist", HttpStatus.NOT_FOUND)
    }
  }


  // Consumer Comments 
  async createComment(newComment: consumerCommentsEntity): Promise<consumerCommentsEntity> {
    return this.commentRepo.save(newComment)
  }

  async getAllComments(): Promise<consumerCommentsEntity[]> {
    return this.commentRepo.find({
      relations: ['consumerID'],
      select: {
        id: true,
        comment: true,
        consumerID: {
          id: true,
          fullName: true
        }
      }
    })
  }

  async getCommentById(id: number): Promise<consumerCommentsEntity> {
    const comment = await this.commentRepo.findOne({ where: { id } })
    if (!comment) {
      throw new HttpException("Comment not found", HttpStatus.NOT_FOUND)
    }
    return comment
  }

  async deleteComment(id: number): Promise<void> {
    const result = await this.commentRepo.delete(id)
    if (result.affected === 0) {
      throw new HttpException("Comment ID doesn't exist", HttpStatus.NOT_FOUND)
    }
  }

  async findOne(logindata: loginDTO): Promise<any> {
    return await this.consumerRepository.findOneBy({ email: logindata.email });
  }


  //    async dbUserFromComment(cmtid:number){ //consume
  //         const data = await this.commentRepo.findOne({
  //             where:{id:cmtid},
  //             relations:['consumerID']
  //         }
  //         )

  //         if (data !== null){
  //             return data
  //         }
  //         else{
  //             throw new HttpException("The ID doesn't exist",HttpStatus.NOT_FOUND)
  //         }

  //     }     

  async dbUserFromComment(cmtid: number) {
    const data = await this.commentRepo.findOne({
      where: { id: cmtid },
      relations: ['consumerID'],
      // select: {
      //   id: true,
      //   consumerID: {
      //     id: true,
      //     fullName: true,   //  only get consumer name
      //   }
      // }
    });

    if (!data) {
      throw new HttpException("The ID doesn't exist", HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async dbUserFromLike(likeid: number) {
    const data = await this.likeRepo.findOne({
      where: { id: likeid },
      relations: ['consumerID'],
    });

    if (!data) {
      throw new HttpException("The ID doesn't exist", HttpStatus.NOT_FOUND);
    }

    return data;


  }

  async dbLikeFromUser(userid: number) {
    const like = await this.likeRepo.findOne({
      where: { consumerID: { id: userid } },
      relations: ['consumerID'],
    });

    if (!like) {
      throw new HttpException("No favorite song set", HttpStatus.NOT_FOUND);
    }

    return like;
  }

  async updateProfilePicture(id: number, filename: string) {
    const user = await this.consumerRepository.findOneBy({ id });
    if (user) {
      user.profilePicture = filename;
      return this.consumerRepository.save(user);
    }
    return null;
  }

  async dbCommentFromUser(userid: number) {
    const data = await this.consumerRepository.findOne({
      where: { id: userid },
      relations: ['consumerComments'],
    });
    if (!data) {
      throw new HttpException("The ID doesn't exist", HttpStatus.NOT_FOUND);
    }

    return data;
  }
}
