import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ENV } from "../environment/provider";

export const tmdbAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const env = inject( ENV );

  // Clone the request and add the API key as a header
  if (request.url.startsWith(env.apiUrl)) {
    return next( request.clone({
      setHeaders: {
        Authorization: `Bearer ${env.apiKey}`
      }
    }));
  }

  return next(request);
};
