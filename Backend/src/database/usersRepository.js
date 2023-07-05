const Barber = require("../models/Users/barber");
const users = [
  new Barber(
    '3e4258d8-e054-4a0d-8c2a-53cb6ba188c4',
    'John',
    '',
    'Doe',
    "John123",
    'test.cutcorner@gmail.com',
    '555-1234',
    '123 Main St',
    '01/01/1980',
    'male',
    'https://cdn.vectorstock.com/i/preview-1x/53/48/trendy-barber-man-vector-35975348.jpg',
    new Date('2022-01-01'),
    new Date('2022-05-13'),
    {
      city: 'Amsterdam',
      street: '456 Market St',
      postcode: '4636 KR'
    },
    'I have been cutting hair for 10 years and specialize in fades and beard trims.',
    [{
      title: 'Haircut',
      price: 5.6,
      currencySign: '€'
    }, {
      title: 'Color',
      price: 10.6,
      currencySign: '€'
    }, {
      title: 'Styling',
      price: 10.1,
      currencySign: '€'
    }],
    [
      {
        day: "Monday",
        startTime: '9:00am',
        endTime: '5:00pm'
      },
      {
        day: "Tuesday",
        startTime: '9:00am',
        endTime: '5:00pm'
      },
      {
        day: "Wednesday",
        startTime: '11:00am',
        endTime: '7:00pm'
      },
      {
        day: "Thursday",
        startTime: '11:00am',
        endTime: '7:00pm'
      },
      {
        day: "Friday",
        startTime: '9:00am',
        endTime: '5:00pm'
      },
      {
        day: "Saturday",
        startTime: '9:00am',
        endTime: '5:00pm'
      },
      {
        day: "Sunday",
        startTime: undefined,
        endTime: undefined
      }
    ]
  ),
  new Barber(
    'd9704074-96c0-40a4-bfa9-b37da817c79d',
    'Jane',
    '',
    'Smith',
    "CoolJane",
    'jane@example.com',
    '555-5678',
    '456 Oak St',
    '02/14/1990',
    'female',
    'https://cdn.vectorstock.com/i/preview-1x/53/48/trendy-barber-man-vector-35975348.jpg',
    new Date('2021-06-01'),
    new Date('2021-12-31'),
    {
      city: 'Sittard',
      street: '789 Elm St',
      postcode: '4422 AA'
    },
    'I am a licensed cosmetologist with 5 years of experience. I specialize in hair color and styling.',
    [{
      title: 'Haircut',
      price: 10.6,
      currencySign: '€'
    }, {
      title: 'Color',
      price: 1.6,
      currencySign: '€'
    }, {
      title: 'Styling',
      price: 150.1,
      currencySign: '€'
    }],
    [{
      day: "Monday",
      startTime: '9:00am',
      endTime: '5:00pm'
    },
    {
      day: "Tuesday",
      startTime: '9:00am',
      endTime: '5:00pm'
    },
    {
      day: "Wednesday",
      startTime: '11:00am',
      endTime: '7:00pm'
    },
    {
      day: "Thursday",
      startTime: '11:00am',
      endTime: '7:00pm'
    },
    {
      day: "Friday",
      startTime: '9:00am',
      endTime: '5:00pm'
    },
    {
      day: "Saturday",
    },
    {
      day: "Sunday"
    }
    ]
  )]

exports.getUserByUsername = (username) => {
  for (let index = 0; index < users.length; index++) {
    if (users[index].username == username) {
      return users[index];
    }
  }
  return undefined;
}

exports.getUserById = (id) => {
  for (let index = 0; index < users.length; index++) {
    if (users[index].id == id) {
      return users[index];
    }
  }
  return undefined;
}

exports.getUsers = () => {
  return users;
}


exports.getbarbers = (pageNumber) => {
  const barbers = []
  for (let index = 0; index < users.length; index++) {
    if (users[index] instanceof  Barber) {
      barbers.push(users[index]);
    }
  }
  return paginate(barbers,5,pageNumber);
}


function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}