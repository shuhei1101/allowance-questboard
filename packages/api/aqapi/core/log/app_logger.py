import logging

from aqapi.core.config.log_config import LOG_CONF

class AppLogger:
    """アプリケーション全体で使用するロガー"""
    
    def __init__(self):
        self.logger = logging.getLogger(LOG_CONF.LOGGER_NAME)
        self.logger.setLevel(LOG_CONF.LOG_LEVEL)
        formatter = logging.Formatter(
            LOG_CONF.FORMAT,
            datefmt=LOG_CONF.DATE_FORMAT
        )

        # StreamHandler
        sh = logging.StreamHandler()
        sh.setFormatter(formatter)
        self.logger.addHandler(sh)

    def d(self, message: str):
        self.logger.debug(message)

    def i(self, message: str):
        self.logger.info(message)

    def w(self, message: str):
        self.logger.warning(message)

    def e(self, message: str):
        self.logger.error(message)

    def c(self, message: str):
        self.logger.critical(message)

logger = AppLogger()
