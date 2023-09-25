import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

const validationMessage = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ status:false, errors: errors.array() });
    };
};

export default validationMessage