import { MixedSchema } from "yup";
declare module 'yup' {
    interface MixedSchema<TType, TContext, TDefault, TFlags> {
        oneOfSchemas(schemas: TType[]): this;
    }
  }
  