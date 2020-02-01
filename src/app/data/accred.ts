import {FullAccredType} from './accredType';
import {User} from './user';

export class Accred {
  accredId?: number;
  eventId: number;
  firstname: string = '';
  lastname: string = '';
  bodyName: string = '';
  stageName: string = '';
  details?: string;
  authoredBy: number;
  accredTypeId: number;
  status: AccredStatus = AccredStatus.GRANTED;
  preferedVipDesk: number;
  mustContactAdmin = false;
  requireRealNameOnDelivery = false;
}

export class FullAccred {
  accred: Accred;
  type: FullAccredType;
  author: User;
  desk: string;
}

export enum AccredStatus {
  GRANTED = 'Granted', DELIVERED = 'Delivered', RECOVERED = 'Recovered'
}

export function statusToString(status: AccredStatus) {
  switch (status) {
    case AccredStatus.GRANTED:
      return 'Prêt à être accueilli';
    case AccredStatus.DELIVERED:
      return 'Accueilli';
    case AccredStatus.RECOVERED:
      return 'Parti';
  }

}
