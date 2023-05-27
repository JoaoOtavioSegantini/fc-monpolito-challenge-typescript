import ValidatorInterface from "../../@shared/validator/validator.interface";
import Client from "../domain/client.entity";
import ClientAdmYupValidator from "../validator/client-adm.yup.validator";

export default class ClientAdmValidatorFactory {
  static create(): ValidatorInterface<Client> {
    return new ClientAdmYupValidator();
  }
}
