export class PhysicalAccredType {
  physicalAccredTypeId?: number;
  physicalAccredTypeName: string;
  physicalAccredTypeNumbered: boolean;
}

export class AccredType {
  accredTypeId?: number;
  accredTypeName: string;
  requiresSignature: boolean;
  isTemporary: boolean;
}

export class FullAccredType {
  accredType: AccredType;
  physicalAccredType?: PhysicalAccredType;
}
