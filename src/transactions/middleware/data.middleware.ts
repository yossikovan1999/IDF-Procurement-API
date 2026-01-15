import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class DataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    if(!req.body.purchases){
      throw new BadRequestException()
    }
    
    req.body = req.body.purchases
    next();
  }
}