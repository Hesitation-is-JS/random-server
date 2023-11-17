export interface BaseSchema {
  type: "object";
  properties: {
    [key: string]: {
      type: "object" | "array" | "null" | "string" | "number" | "boolean";
    };
  };
  required?: string[];
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
