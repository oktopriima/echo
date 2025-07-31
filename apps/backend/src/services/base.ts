import {ServiceResponse} from "src/services/response";
import {HttpStatus} from "src/utils/http_status";

export class ServiceBase {
  success<T = any>(result: T, message: string = "true"): ServiceResponse<T> {
    return new ServiceResponse(result, message, true).setHttpCode(HttpStatus.OK);
  }

  error<T = any>(result: T, message: string = "error", status: boolean = false): ServiceResponse<T> {
    return new ServiceResponse(result, message, status).setHttpCode(HttpStatus.BAD_REQUEST);
  }

  catchError<T = any>(error: unknown, result: T, message: string = "error"): ServiceResponse<T> {
    if (error instanceof Error) {
      console.error("Caught error:", {
        message: error.message,
        file: (error.stack || "").split("\n")[1]?.trim(),
      });
    } else {
      console.error("Unknown error:", error);
    }

    return new ServiceResponse(result, message, false).setHttpCode(HttpStatus.BAD_REQUEST);
  }
}
