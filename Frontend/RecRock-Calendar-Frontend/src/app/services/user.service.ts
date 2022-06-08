import { Injectable } from '@angular/core';
import { UsersAPIClient } from '@redrock/generated-html-client/services/users/users-api-client.service';
import { User } from '@redrock/models/user';
import {
  UserChangePasswordDTO,
  UserDTO,
  UserUpdateDTO,
} from '@redrock/generated-html-client/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly api: UsersAPIClient) {}

  public async getById(id: string): Promise<User> {
    return firstValueFrom(this.api.getById({ id: id })).then((userDTO) => {
      return {
        id: userDTO.id,
        fullName: userDTO.fullName,
        userName: userDTO.userName,
        color: {
          primary: userDTO.primaryColor,
          secondary: userDTO.secondaryColor,
        },
        role: userDTO.role
      };
    });
  }

  public async login(username: string, password: string): Promise<UserDTO> {
    return firstValueFrom(
      this.api.login({ userParam: { userName: username, password: password } })
    ).then((data: any) => {
      return data;
    });
  }

  public async updateUser(id: string, user: UserUpdateDTO): Promise<UserDTO> {
    return firstValueFrom(this.api.update({ id: id, userDTO: user })).then(
      (data: any) => {
        return data;
      }
    );
  }

  public async changePassword(id: string, passwords: UserChangePasswordDTO) {
    return firstValueFrom(
      this.api.changePassword({ id: id, passwords: passwords })
    ).then((data: any) => {
      return data;
    });
  }
}
