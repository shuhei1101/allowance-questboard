import * as log from "jsr:@std/log";

export class AppLogger {
  private static initialized = false;
  public static I: log.Logger;

  static initialize() {
    if (this.initialized) return;

    log.setup({
      handlers: {
        stringFmt: new log.ConsoleHandler("DEBUG", {
          formatter: (record) =>
            `${record.datetime.toISOString()},${record.levelName},${record.msg}`,
        }),
      },

      loggers: {
        default: {
          level: "DEBUG",
          handlers: ["stringFmt"],
        },
      },
    });
    this.I = log.getLogger();
  }
}

// 動作確認
if (import.meta.main) {
  AppLogger.initialize();
  AppLogger.I.info("AppLogger initialized successfully.");
  AppLogger.I.debug("This is a debug message.");
  AppLogger.I.error("This is an error message.");
}
