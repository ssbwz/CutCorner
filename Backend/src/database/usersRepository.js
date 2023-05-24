const Barber = require("../models/barber");
const users = [
    new Barber(
      'John',
      '',
      'Doe',
      'test.cutcorner@gmail.com',
      '555-1234',
      '123 Main St',
      '01/01/1980',
      'male',
      'https://example.com/profile-pic.jpg',
      new Date('2022-01-01'),
      new Date('2022-05-13'),
      '456 Market St',
      'I have been cutting hair for 10 years and specialize in fades and beard trims.',
      ['Haircut', 'Beard Trim', 'Shave'],
      {
        monday: ['10:00am', '6:00pm'],
        tuesday: ['10:00am', '6:00pm'],
        wednesday: ['10:00am', '6:00pm'],
        thursday: ['10:00am', '6:00pm'],
        friday: ['10:00am', '6:00pm'],
        saturday: ['9:00am', '4:00pm'],
        sunday: ['closed']
      }
    ),
    new Barber(
      'Jane',
      '',
      'Smith',
      'jane@example.com',
      '555-5678',
      '456 Oak St',
      '02/14/1990',
      'female',
      'https://example.com/jane-profile-pic.jpg',
      new Date('2021-06-01'),
      new Date('2021-12-31'),
      '789 Elm St',
      'I am a licensed cosmetologist with 5 years of experience. I specialize in hair color and styling.',
      ['Haircut', 'Color', 'Styling'],
      {
        monday: ['9:00am', '5:00pm'],
        tuesday: ['9:00am', '5:00pm'],
        wednesday: ['11:00am', '7:00pm'],
        thursday: ['11:00am', '7:00pm'],
        friday: ['9:00am', '5:00pm'],
        saturday: ['closed'],
        sunday: ['closed']
      }
    )]

exports.getUserByEmail = (email) => {
    for (let index = 0; index < users.length; index++) {
        if (users[index].email == email) {                    
            return users[index];            
        }        
    }
    return undefined;
}