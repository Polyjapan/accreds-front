import {FullAccredType} from './accredType';

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
}

export class FullAccred {
  accred: Accred;
  type: FullAccredType;
}

export enum AccredStatus {
  GRANTED = 'Granted', DELIVERED = 'Delivered', RECOVERED = 'Recovered'
}

export function statusToString(status: AccredStatus) {
  switch (status) {
    case AccredStatus.GRANTED:
      return 'Prêt';
    case AccredStatus.DELIVERED:
      return 'Délivré';
    case AccredStatus.RECOVERED:
      return 'Récupéré';
  }

}
