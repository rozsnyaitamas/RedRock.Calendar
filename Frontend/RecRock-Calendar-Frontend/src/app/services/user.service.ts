import { Injectable } from '@angular/core';
import { UserDTO, UsersClient } from '@redrock/generated-clients/clients';
import { User } from '@redrock/models/user';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userClient!: UsersClient;

  constructor() {
    this.userClient = new UsersClient(environment.serverUrl);
  }

  public async get(): Promise<UserDTO[]> {
    return this.userClient.get();
  }

  public async getById(id: string | null): Promise<User> {
    return await this.userClient.getById(id).then((userDTO) => {
      return {
        id: userDTO.id,
        fullName: userDTO.fullName,
        userName: userDTO.userName,
        color: {
          primary: userDTO.primaryColor,
          secondary: userDTO.secondaryColor,
        },
      };
    });
  }

  public async login(username: string, password: string): Promise<UserDTO | null> {
    return await this.userClient
      .login({ userName: username, password: password })
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log(error);
        return null;
      }
      );
  }
}
