import logging
from logging.handlers import TimedRotatingFileHandler

from aqapi.core.config.log_config import LOG_CONF

def build_logger():
    logger = logging.getLogger(LOG_CONF.LOGGER_NAME)
    logger.setLevel(LOG_CONF.LOG_LEVEL)

    formatter = logging.Formatter(
        LOG_CONF.FORMAT,
        datefmt=LOG_CONF.DATE_FORMAT
    )

    # StreamHandler
    sh = logging.StreamHandler()
    sh.setFormatter(formatter)
    logger.addHandler(sh)

    # TimedRotatingFileHandler
    trfh = TimedRotatingFileHandler(
        filename=LOG_CONF.OUTPUT_PATH, 
        when=LOG_CONF.WHEN, 
        interval=LOG_CONF.INTERVAL, 
        backupCount=LOG_CONF.BACKUP_COUNT
    )
    trfh.setFormatter(formatter)
    logger.addHandler(trfh)

LOGGER = build_logger()
