/* eslint-disable */
/**
 * Generated data model types.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 */

import type {
  DataModelFromSchemaDefinition,
  DocumentByName,
  TableNamesInDataModel,
  VectorIndexNames,
} from "convex/server";
import type { GenericId } from "convex/values";
import type schema from "../schema";

/**
 * The names of all of your Convex tables.
 */
export type TableNames = TableNamesInDataModel<DataModel>;

/**
 * The type of a document stored in Convex.
 */
export type Doc<TableName extends TableNames> = DocumentByName<
  DataModel,
  TableName
>;

/**
 * An identifier for a document of a specific type.
 */
export type Id<TableName extends TableNames | string = string> = GenericId<TableName>;

/**
 * A type describing your entire Convex data model, including table and index definitions.
 */
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
