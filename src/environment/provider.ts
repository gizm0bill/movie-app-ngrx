import { InjectionToken } from "@angular/core";
import { Environment } from "./model";
import env from "../environment";

export const ENV = new InjectionToken<Environment>( 'env', {
  providedIn: 'root',
  factory: () => new env()
} );
