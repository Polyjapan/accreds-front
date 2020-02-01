import {FullStaffAccount, User} from './user';
import {AccredStatus} from './accred';

export class AccredLog {
  accredLogId: number;
  accredLogTime: string;
  accredId: number;
  authoredByAdmin?: number;
  authoredByStaff?: number;
  sourceState: AccredStatus;
  targetState: AccredStatus;
  remarks: string;
  accredNumber: string;
}

export class FullAccredLog {
  log: AccredLog;
  admin?: User;
  staff?: FullStaffAccount;
}
