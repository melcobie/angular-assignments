
export enum Role{
  Normal='Normal',
  Admin='Admin'
}

export interface UserInfo{
  _id: string;
  email: string;
  userType: Role;
  name: string;
}

export interface User{
    userInfo: UserInfo;
    token: string;
}


