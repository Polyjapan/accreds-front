export class User {
  id: number;
  email: string;
  details: UserDetails;
}

export class UserDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
