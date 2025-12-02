// src/app/core/mappers/user.mapper.ts

import { UpdateUserDto, UserDto } from "../dtos/user.dto";
import { User } from "../models/entities/user.model";

export class UserMapper {
  static fromApi(userDto: Partial<UserDto>): User {
    return {
      id: userDto.id!,
      email: userDto.email!,
      firstName: userDto.firstName ?? '',
      lastName: userDto.lastName ?? '',
      phoneNumber: userDto.phoneNumber ?? '',
      physicalAddress: userDto.physicalAddress ?? '',
      type: userDto.type!,
      img: userDto.img ?? null,
      created: userDto.created ? new Date(userDto.created) : null,
      modified: userDto.modified ? new Date(userDto.modified) : null,
    };
  }

  static toUpdateDto(model: Partial<User>): UpdateUserDto {
    return {
      firstName: model.firstName,
      lastName: model.lastName,
      phoneNumber: model.phoneNumber,
      physicalAddress: model.physicalAddress
    };
  }
}
