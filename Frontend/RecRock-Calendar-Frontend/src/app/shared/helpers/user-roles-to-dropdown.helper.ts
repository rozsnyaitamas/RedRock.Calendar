import { UserRole } from "@redrock/generated-html-client/models";

export class UserRolesToDropdownHelper {
  public static GenerateDropdownValuesFromUserRoles(): UserRolesDropdownListType[] {
    let rolesAndValuesList: (string|UserRole)[] = Object.values(UserRole);
    const excludeRole = UserRole.PropertyOwner.valueOf(); // The role of property owner

    let iterator = 0;
    let rolesList: UserRolesDropdownListType[] = [];
    for(let i=0; i<rolesAndValuesList.length/2; i++){
      if(i !== excludeRole){
        rolesList[iterator] = { viewValue: rolesAndValuesList[i].toString(), value: i};
        iterator++;
      }
    }
    return rolesList;
  }
}

export interface UserRolesDropdownListType {
  value: number;
  viewValue: string
}
