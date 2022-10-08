import { Injectable, NestMiddleware, RawBodyRequest } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyKey } from 'discord-interactions';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private publicKey = process.env.DISCORD_PUBLIC_KEY;

  use(req: RawBodyRequest<Request>, res: Response, next: NextFunction) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    const isValidRequest = verifyKey(
      req.rawBody,
      signature,
      timestamp,
      this.publicKey,
    );
    if (!isValidRequest) {
      console.log('invalid validation');
      return res.status(401).end('Bad request signature');
    }
    console.log('discord authorized!');
    next();
  }
}
