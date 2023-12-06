export class ErrorHandler extends Error {
  public name: string;
  public statusCode: number;

  constructor(msg: string, statusCode: number, name: string) {
    super(msg);
    this.name = name;
    this.statusCode = statusCode;
  }
}
