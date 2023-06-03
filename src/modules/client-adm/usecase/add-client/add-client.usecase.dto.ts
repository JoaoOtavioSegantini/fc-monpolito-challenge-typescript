export interface AddClientInputDto {
  id?: string;
  name: string;
  email: string;
  number?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  complement?: string;
  street?: string;
  document?: string;
}

export interface AddClientOutputDto {
  id: string;
  name: string;
  email: string;
  number?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  complement?: string;
  street?: string;
  createdAt: Date;
  updatedAt: Date;
}
