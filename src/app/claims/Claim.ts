import { ClaimStatus } from './ClaimStatus';

export class Claim {
  id: number;
  requestId: number;
  status: ClaimStatus;
  topic: number;
  scheme: number;
  issuer: string;
  signature: string;
  data: string;
  uri: string;
}
