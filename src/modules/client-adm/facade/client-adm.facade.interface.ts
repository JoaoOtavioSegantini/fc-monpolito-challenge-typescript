export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  document?: string;
  city?: string;
  complement?: string;
  street?: string;
  number?: string;
  state?: string;
  zipCode?: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
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

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}
