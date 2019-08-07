# GraphQl Node Server

This is typical eCommerce API builded with GraphQL, Node.js, MongoDB
test database already connected

Available instances:
1.Product
2.Order
3.User

# How to use!
Install all dependencies

`npm install`

Run the server

`npm start`


#### Creating a User
```json
mutation {
  createUser(email: "jhondou@example.com", password: "jonny12453") {
    _id
    email
    password
    orders {
      _id
    }
  }
}
```

#### For query all Users

```json
query{
  users{
    _id
    email
    password
    orders {
      _id
    }
  }
}
```

#### For query specific User

```json
query{
user(_id:"5d4b305c112b1f1f13e0eb10"){
    _id
    email
    password
}
}
```

#### For make order

```json
mutation{
  createOrder(
    _customerID: "5d4b305c112b1f1f13e0eb10"
  ){
    _id
    number
    created
    status
  }
}
```

#### Cherry on the pie. Query like this
```json
query{
  user(_id:"5d4b305c112b1f1f13e0eb10"){
    _id
    email
    password
    orders{
      _id
      number
      customer {
        _id
      }
    }
  }
}
```



