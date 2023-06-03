export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  document?: string;
  city?: string;
  complement?: string;
  street?: string;
  number?: string;
  state?: string;
  zipCode?: string;
  createdAt: Date;
  updatedAt: Date;
}
