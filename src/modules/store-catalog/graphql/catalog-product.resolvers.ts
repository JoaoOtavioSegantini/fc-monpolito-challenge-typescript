import { FindStoreCatalogFacadeInputDto } from "../facade/store-catalog.facade.interface";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

const facade = StoreCatalogFacadeFactory.create();

const catalogProductsResolver = {
  Query: {
    findAllProducts(_: any) {
      return facade.findAll();
    },
    findProduct(_: any, input: FindStoreCatalogFacadeInputDto) {
      return facade.find(input);
    },
  },
};

export default catalogProductsResolver;
