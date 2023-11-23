import { ErrorResponse } from ".";
import { MysqlErrorKeys } from "./MysqlErrorkeys";

export interface DrizzleError {
  type: string;
  message: string;
  stack: string;
  code: MysqlErrorKeys;
  errno: string;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

export function isDrizzleError(error: any) {
  return error && error.sqlMessage !== undefined;
}

export default class DrizzleErrorHandler {
  constructor(private readonly error: DrizzleError) {}

  public getResponse(): ErrorResponse {
    switch (this.error.code) {
      case MysqlErrorKeys.ER_DUP_ENTRY:
        return {
          message: this.formatDuplicateEntryError(this.error.message),
          status: 409,
        };
      case MysqlErrorKeys.ER_NO_REFERENCED_ROW_2:
        return {
          message: this.formatForeignKeyNotFoundError(this.error.message),
          status: 404,
        };

      default:
        break;
    }

    return {
      message: this.error.message,
      status: 500,
    };
  }

  private formatDuplicateEntryError(message: string) {
    const regex = /Duplicate entry '(.+?)' for key '(.+?)'/;
    const match = message.match(regex);

    if (match) {
      const [_error, _duplicateValue, keyName] = match;
      const [tableName, _columnName] = keyName.split(".");
      return `${tableName} already exists`;
    } else {
      return "Unable to process the request due to a database error";
    }
  }

  private formatForeignKeyNotFoundError(message: string) {
    const regex =
      /.*CONSTRAINT `(.+?)` FOREIGN KEY \(`(.+?)`\) REFERENCES `(.+?)` \(`(.+?)`\)/;
    const match = message.match(regex);

    if (match) {
      const [
        _error,
        _constraintName,
        _columnName,
        referencedTable,
        _referencedColumn,
      ] = match;
      return `Record '${referencedTable}' was not found for this relation`;
    } else {
      return "Unable to process the request due to a database error";
    }
  }
}
