/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 */

import {
  ActionBuilder,
  HttpEndpoint,
  MutationBuilder,
  QueryBuilder,
  GenericDatabaseReader,
  GenericDatabaseWriter,
  GenericQueryCtx,
  GenericMutationCtx,
  GenericActionCtx,
} from "convex/server";
import { DataModel } from "./dataModel";

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type ActionCtx = GenericActionCtx<DataModel>;

export type DatabaseReader = GenericDatabaseReader<DataModel>;
export type DatabaseWriter = GenericDatabaseWriter<DataModel>;

/**
 * Define a query in this Convex app's public API.
 */
export declare const query: QueryBuilder<DataModel, "public">;

/**
 * Define an internal query.
 */
export declare const internalQuery: QueryBuilder<DataModel, "internal">;

/**
 * Define a mutation in this Convex app's public API.
 */
export declare const mutation: MutationBuilder<DataModel, "public">;

/**
 * Define an internal mutation.
 */
export declare const internalMutation: MutationBuilder<DataModel, "internal">;

/**
 * Define an action in this Convex app's public API.
 */
export declare const action: ActionBuilder<DataModel, "public">;

/**
 * Define an internal action.
 */
export declare const internalAction: ActionBuilder<DataModel, "internal">;

export declare const httpEndpoint: (
  handler: (ctx: GenericActionCtx<DataModel>, request: Request) => Promise<Response>
) => HttpEndpoint;
