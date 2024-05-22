interface LogManagerInterface {
  info(message: string): void
  error(message: string): void
}

export class ConsoleLogManager implements LogManagerInterface {
  public info(message: string) {
    console.info('bouclier', message)
  }

  public error(message: string) {
    console.error('bouclier', message)
  }
}
