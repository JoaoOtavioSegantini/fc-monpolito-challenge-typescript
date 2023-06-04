import {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
} from "../facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

const facade = ClientAdmFacadeFactory.create();

const clientResolvers = {
  Mutation: {
    createUser(_: any, input: AddClientFacadeInputDto) {
      return facade.add(input);
    },
  },
  Query: {
    getClientById(_: any, input: FindClientFacadeInputDto) {
      return facade.find(input);
    },
  },
};

export default clientResolvers;
