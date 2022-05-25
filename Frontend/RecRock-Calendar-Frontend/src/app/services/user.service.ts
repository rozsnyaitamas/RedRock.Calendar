import { Injectable } from '@angular/core';
import { UsersAPIClient } from '@redrock/generated-html-client/services/users/users-api-client.service';
import { User } from '@redrock/models/user';
import { UserDTO } from '@redrock/generated-html-client/models';
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
}

