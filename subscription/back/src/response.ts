import { Response } from 'express';

interface SuccessResponse {
    success: boolean;
    message: string;
    data?: any;
}

interface ErrorResponse {
    success: boolean;
    message: string;
}

// Constants for common messages
const constants = {
    RequestSuccessful: 'Request was successful.',
    NotFoundError: 'Resource not found.',
    UnauthorizedError: 'Unauthorized access.',
    InternalServerError: 'An internal server error occurred.',
};

// Utility functions for responses
export function respondWithSuccess(res: Response, data: any): void {
    const response: SuccessResponse = {
        success: true,
        message: constants.RequestSuccessful,
        data,
    };
    res.status(200).json(response);
}

export function respondWithSuccessAndMessage(
    res: Response,
    message: string,
    data: any
): void {
    const response: SuccessResponse = {
        success: true,
        message,
        data,
    };
    res.status(200).json(response);
}

export function respondWithError(
    res: Response,
    status: number,
    message: string
): void {
    const response: ErrorResponse = {
        success: false,
        message,
    };
    res.status(status).json(response);
}

export function respondWithNotFoundError(res: Response): void {
    const response: ErrorResponse = {
        success: false,
        message: constants.NotFoundError,
    };
    res.status(404).json(response);
}

export function respondWithUnauthorizedError(res: Response): void {
    const response: ErrorResponse = {
        success: false,
        message: constants.UnauthorizedError,
    };
    res.status(401).json(response);
}

export function respondWithInternalServerError(
    res: Response,
    message: string = ''
): void {
    const response: ErrorResponse = {
        success: false,
        message: message || constants.InternalServerError,
    };
    res.status(500).json(response);
}

export function respondWithBadRequestError(
    res: Response,
    message: string
): void {
    const response: ErrorResponse = {
        success: false,
        message,
    };
    res.status(400).json(response);
}
