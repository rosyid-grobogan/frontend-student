## Run

```
yarn start
```

## Contoh Console error

```
console.log(JSON.stringify(err));
```

Hasil Error

```json
{
  "response": {
    "ok": false,
    "statusText": "Bad Request",
    "status": 400,
    "url": "http://localhost:3000/students",
    "headers": {}
  },
  "error": {
    "message": "Oops Email is taken",
    "httpStatus": "BAD_REQUEST",
    "timestamp": "2021-05-22T09:32:27.057334032Z"
  }
}
```
