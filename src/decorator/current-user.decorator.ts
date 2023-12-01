import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type CurrentUser = {
  id: string;
  role: string;
};

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<CurrentUser> => {
    return context.switchToHttp().getRequest().user;
  },
);
