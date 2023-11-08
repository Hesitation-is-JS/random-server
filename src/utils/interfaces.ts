interface Property {
  [key: string]: {
    type: "object" | "array" | "null" | "string" | "number" | "boolean" | "any";
  };
}

export interface ResponseSchema {
  [key: number]: BaseSchema;
}

export interface BaseSchema {
  type: "object";
  properties: Property;
  required?: string[];
}

export interface ValidationSchema {
  body?: BaseSchema;
  querystring?: BaseSchema;
  params?: BaseSchema;
  headers?: BaseSchema;
  response?: ResponseSchema;
  summary?: string;
  description?: string;
  tags?: string[];
}
