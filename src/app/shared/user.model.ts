
export enum Role{
  Normal='normal',
  Admin='admin'
}

export interface UserInfo{
  _id: string;
  email: string;
  userType: Role;
}

export interface User{
    userInfo: UserInfo;
    token: string;
}


