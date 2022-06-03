import { StorageConstants } from "@redrock/storage.constans";

export class StorageHelper {

  public static setUserId(storage: Storage, id: string): void {
    storage.setItem(StorageConstants.userId, id);
  }

  public static getUserId(storage: Storage): string | null {
    return storage.getItem(StorageConstants.userId);
  }

  public static setUserFullName(storage: Storage, fullName: string): void {
    storage.setItem(StorageConstants.userFullName, fullName);
  }

  public static getUserFullName(storage: Storage): string | null {
    return storage.getItem(StorageConstants.userFullName);
  }

  public static setUserName(storage: Storage, name: string): void {
    storage.setItem(StorageConstants.userName, name);
  }

  public static getUserName(storage: Storage): string | null {
    return storage.getItem(StorageConstants.userName);
  }

  public static setUserPassword(storage: Storage, password: string): void {
    storage.setItem(StorageConstants.userPassword, password);
  }

  public static getUserPassword(storage: Storage): string | null {
    return storage.getItem(StorageConstants.userPassword);
  }

  public static setUser(storage: Storage, id: string, name: string, fullName: string, password: string) {
    this.setUserId(storage, id);
    this.setUserName(storage, name);
    this.setUserFullName(storage, fullName);
    this.setUserPassword(storage, password);
  }

  public static removeUser(storage: Storage) {
    storage.removeItem(StorageConstants.userId);
    storage.removeItem(StorageConstants.userFullName);
    storage.removeItem(StorageConstants.userName);
    storage.removeItem(StorageConstants.userPassword);
  }

}
