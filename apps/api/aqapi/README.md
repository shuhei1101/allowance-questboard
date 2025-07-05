# API Directory Structure

This directory contains the feature-based API structure for the Supabase allowance questboard API.

## Architecture Overview

The structure follows clean architecture principles with clear separation of concerns:

```
aqapi/
  user/                    # Feature: User management
    service/              # Business logic and use cases
    domain/               # Domain models and business rules
      model/              # Domain entities
      value/              # Value objects
    repository/           # Data access interfaces
    dao/                  # Data access implementations
      entity/             # Database entities
```

## Directory Structure Explanation

### Service Layer (`service/`)
Contains business logic and use cases. This layer orchestrates the domain objects and repositories to implement application features.

- `user_service.py` - User business logic and use cases

### Domain Layer (`domain/`)
Contains the core business logic and domain models.

#### Models (`domain/model/`)
Domain entities that represent business objects with identity and lifecycle.

- `user.py` - User domain model with business rules

#### Value Objects (`domain/value/`)
Immutable objects that represent values without identity.

- `user_id.py` - User ID value object with validation
- `email.py` - Email value object with validation

### Repository Layer (`repository/`)
Defines interfaces for data access and provides implementations.

- `user_repository.py` - Abstract repository interface
- `user_repository_impl.py` - Repository implementation using DAO

### Data Access Layer (`dao/`)
Contains data access objects and database entities.

- `user_dao.py` - Data access object for user operations

#### Entities (`dao/entity/`)
Database-specific entities for ORM mapping.

- `user_entity.py` - User database entity

## Usage Examples

### Basic Usage

```python
from aqapi.user import User, UserId, Email, UserService, UserRepositoryImpl, UserDao

# Create components
user_dao = UserDao(database_connection)
user_repository = UserRepositoryImpl(user_dao)
user_service = UserService(user_repository)

# Use the service
user = await user_service.create_user("user@example.com", "John Doe")
```

### Direct Domain Object Usage

```python
from aqapi.user import User, UserId, Email
from datetime import datetime

# Create value objects
user_id = UserId.generate()
email = Email.create("user@example.com")

# Create domain model
user = User(
    id=user_id,
    email=email,
    name="John Doe",
    created_at=datetime.utcnow()
)

# Use domain methods
user.update_name("John Smith")
user.deactivate()
```

## Adding New Features

To add a new feature (e.g., `quest`), create the same directory structure:

```
aqapi/
  quest/
    service/
      quest_service.py
    domain/
      model/
        quest.py
      value/
        quest_id.py
    repository/
      quest_repository.py
      quest_repository_impl.py
    dao/
      quest_dao.py
      entity/
        quest_entity.py
```

## Benefits

1. **Clear Separation of Concerns**: Each layer has a specific responsibility
2. **Testability**: Easy to mock and test individual components
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features following the same pattern
5. **Domain-Driven Design**: Business logic is clearly separated from infrastructure