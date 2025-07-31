interface ResponseContract<T = any> {
  status(): boolean;

  message(): string;

  result(): T;

  httpCode(): number;

  ok(): boolean;

  fail(): boolean;
}

export class ServiceResponse<T = any> implements ResponseContract<T> {
  private http_code: number = 200;

  constructor(
    private _result: T,
    private _message: string,
    private _status: boolean = true
  ) {
  }

  setHttpCode(httpCode: number): this {
    this.http_code = httpCode;
    return this;
  }

  status(): boolean {
    return this._status;
  }

  message(): string {
    return this._message;
  }

  result(): T {
    return this._result;
  }

  httpCode(): number {
    return this.http_code;
  }

  ok(): boolean {
    return this.http_code === 200;
  }

  fail(): boolean {
    return this.http_code !== 200;
  }
}
