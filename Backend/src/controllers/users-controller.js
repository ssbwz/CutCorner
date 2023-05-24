const Barber = require("../models/barber")
const userRepository = require("../database/usersRepository")

exports.getUsers = async (req, res, next) => {
    try {
        const urlParts = req.url.split('/');
        const userId = urlParts[2];

        if (req.method === 'GET' && urlParts[1] === 'users') {
            if (userId !== undefined) {
                res.writeHead(200, { 'Content-Type': 'text/json' });


                const barber = new Barber(
                    'John',
                    '',
                    'Doe',
                    'john@example.com',
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
                );


                res.end(JSON.stringify(barber));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(`User ID: ${userId}`);
            return;
        }

    } catch (err) {
        console.log(err);
    }
}





exports.getUserByEmail = async (req, res, next) => {
    try {
        const urlParts = req.url.split('/');
        const userEmail = urlParts[2];
        
        const fetchedUser = userRepository.getUserByEmail(userEmail);
        console.log(fetchedUser)
        if (fetchedUser !== undefined) {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify(fetchedUser));          
            return;
        }
        
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Sorry, the requested resource was not found.');
        return;

    } catch (err) {
        console.log(err);
    }
}
