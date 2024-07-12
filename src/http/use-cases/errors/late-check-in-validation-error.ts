export class LateCheckInValidationError extends Error {
  constructor() {
    super('CheckIn can only be validate until 20 minutes of his creation ')
  }
}
