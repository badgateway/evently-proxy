import { Middleware } from '@curveball/core';

type Options = {
  bookmark: string;
  token: string;
}

export default function (options: Options): Middleware {

  return async ctx => {

    const request = new Request(
      new URL(ctx.request.requestTarget, options.bookmark),
      {
        method: ctx.method,
        headers: {
          Authorization: `Bearer ${options.token}`,
          Accept: 'application/json',
        }
      }
    );
    const response = await fetch(request);

    ctx.status = response.status;
    ctx.response.body = await response.json();
    ctx.response.type = 'application/json';

  };

}
