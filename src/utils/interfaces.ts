export interface BaseSchema {
  type: "object";
  properties: {
    [key: string]: {
      type: "object" | "array" | "null" | "string" | "number" | "boolean";
      format?: string;
    };
  };
  required?: string[];
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
