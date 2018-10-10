# m4a.api

### Modelos de Dados
```
var Volunteer = {
  name: 'name',
  email: 'email',
  moreThan18Years: 'bool',
  motivation: 'enum:op1;op2;op3;op4',
  remote: 'integer',
  areas: ['enum:op1;op2;op3;op4'],
  location = {
    lat: 'decimal:2',
    lng: 'decimal:2',
    zipCode: 'stringMask:/9{5}-9{3}/',
    address: 'text',
    number: 'integer',
    city: 'name',
    country: 'name'
  }
};

var Volunteer = {
  name: 'name',
  email: 'email',
  moreThan18Years: 'bool',
  motivation: 'enum:op1;op2;op3;op4',
  remote: 'integer',
  areas: ['enum:op1;op2;op3;op4'],
  location = {
    lat: 'decimal:2',
    lng: 'decimal:2',
    zipCode: 'stringMask:/99999-999/',
    address: 'text',
    number: 'integer',
    city: 'name',
    country: 'name'
  }
};
```
continua...
  
  
