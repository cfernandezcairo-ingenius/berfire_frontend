export interface IBillStatements {
  id: number,
  name: string,
  isPaid: boolean,
  isReturned: boolean,
  isPending: boolean,
  isSent: boolean,
  isUnPaid: boolean
}

export interface IDisplayedLabels {
  name: string,
  isBoolean: boolean
}
