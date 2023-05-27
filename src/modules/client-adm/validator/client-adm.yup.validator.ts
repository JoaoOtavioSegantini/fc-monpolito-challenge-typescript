import ValidatorInterface from "../../@shared/validator/validator.interface";
import Client from "../domain/client.entity";
import * as yup from "yup";

export default class CustomerYupValidator
  implements ValidatorInterface<Client>
{
  validate(entity: Client): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          email: yup
            .string()
            .required("Email is required")
            .email("Email is not valid"),
        })
        .validateSync(
          {
            id: entity.id.id,
            name: entity.name,
            email: entity.email,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "client",
          message: error,
        });
      });
    }
  }
}
