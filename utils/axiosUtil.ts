export type HttpError<T> = {
  body: T;
  message: string;
  code: string | number;
};

type CreateErrorArgs = {
  message: string;
  code?: string | number;
  body?: any;
};

export const createError = ({
  message,
  code = 500,
  body = {},
}: CreateErrorArgs): HttpError<any> => {
  return {
    message,
    code,
    body,
  };
};
