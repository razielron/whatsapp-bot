import { z } from 'zod';

export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    InternalServerError = 500,
}

export enum ResponseStatus {
    Success,
    Failed,
    InternalServerError,
}

export class ServiceResponse<T = null> {
    success: boolean;
    message: string;
    responseObject: T;
    statusCode: number;

    constructor(status: ResponseStatus, message: string, responseObject: T, statusCode: number) {
        this.success = status === ResponseStatus.Success;
        this.message = message;
        this.responseObject = responseObject;
        this.statusCode = statusCode;
    }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        message: z.string(),
        responseObject: dataSchema.optional(),
        statusCode: z.number(),
    });
