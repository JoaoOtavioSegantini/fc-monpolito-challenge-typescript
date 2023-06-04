import {
  CheckStockFacadeInputDto,
  AddProductFacadeInputDto,
} from "../facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../factory/facade.factory";

const facade = ProductAdmFacadeFactory.create();

const productAdmResolver = {
  Mutation: {
    addProduct(_: any, input: AddProductFacadeInputDto) {
      return facade.addProduct(input);
    },
  },
  Query: {
    checkStock(_: any, input: CheckStockFacadeInputDto) {
      return facade.checkStock(input);
    },
  },
};

export default productAdmResolver;
