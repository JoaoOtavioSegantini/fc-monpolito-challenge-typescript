import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import Invoice from "../domain/invoice.entity";

export default class InvoiceYupValidator
  implements ValidatorInterface<Invoice>
{
  validate(entity: Invoice): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          address: yup.object().required("Address is required"),
          items: yup
            .array()
            .required("Items is required")
            .of(
              yup.object().shape({
                id: yup.object(),
                name: yup.string().required("Name is required"),
                price: yup.number().required("Price is required"),
              })
            ),
        })
        .validateSync(
          {
            id: entity.id.id,
            name: entity.name,
            address: entity.address,
            items: entity.items,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "invoice",
          message: error,
        });
      });
    }
  }
}
