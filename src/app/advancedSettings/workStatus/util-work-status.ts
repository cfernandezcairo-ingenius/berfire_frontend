
export function getPayloadWorkStatus(id: number, fg:any):any {
  let payload:any;
  if (id === 0) {
    payload = {
      name: fg.get('name')?.value,
      description: fg.get('description')?.value,
    }
  } else {
    payload = {
      id: id,
      name: fg.get('name')?.value,
      description: fg.get('description')?.value,
    }
  }
  return payload;
}
