export interface BaseSchema {
  type: "object" | "array" | "null" | "string" | "number" | "boolean";
  properties?: {
    [key: string]: BaseSchema;
  };
  format?: string;
  required?: string[];
  additionalProperties?: boolean;
}

export interface ResponseSchema {
  [key: string]: BaseSchema;
}

export interface ValidationSchema {
  body?: BaseSchema;
  querystring?: BaseSchema;
  params?: BaseSchema;
  headers?: BaseSchema;
  response?: {
    [key: string]: BaseSchema;
  };
  summary?: string;
  description?: string;
  tags?: string[];
}
