# Cars Api

This simple API was created with the purpose of exercising some principles on NodeJS API development.

It features:

    - Schema Validation
    - Automated Unit Tests
    - Live Documentation

# Getting Started

## Initial Setup

Install the dependencies and run the server:

```
npm install
npm start
```

## Usage

After the server has started the live documentation will be available at http://localhost:3000/docs

It's possible to Create, Update, Delete, Get and ListAll Drivers and Cars. It's also possible to open a new Usage Record, finish an existing Usage Record and list all existing Usage Records.

A Usage Record signifies that a Driver is currently using a Car.

A Driver cannot have more than one Usage Record open at the same time and neither can a Car be Used by more than one driver at the same time.

## Testing

To see a sumary of all the unit tests run:

```
npm run test:list
```
