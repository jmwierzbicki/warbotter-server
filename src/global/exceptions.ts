import { HttpException, HttpStatus } from '@nestjs/common';

export class Exceptions {
  static resourceNotFound(msg = 'Resource does not exists') {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: msg,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  static missingPermissions(msg = 'Missing permissions to access this object') {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: msg,
      },
      HttpStatus.FORBIDDEN,
    );
  }

}
