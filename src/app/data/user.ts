import {VipDesk} from './vipDesk';

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

export class StaffAccount {
  staffAccountId: number;
  eventId: number;
  vipDeskId: number;
  name: string;
  authoredBy: string;
  authoredAt: Date;
}

export class FullStaffAccount {
  account: StaffAccount;
  vipDesk: VipDesk;
}
