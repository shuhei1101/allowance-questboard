
from aqapi.login.domain.value_object.user_id import UserId


class User:
    def __init__(self, id: UserId):
        self.id = id

    