const mongoose = require('mongoose')
const {expect} = require('chai')
const {User} = require('../../../models')
const logic = require('../../../logic')



describe('logic-register-user', ()=>{
    before(()=>{
        mongoose.connect('mongodb://localhost/my-stuff-api', {useNewUrlParser: true})
       
    })

    describe('register-user', ()=>{
        let name, surname, email, password

        beforeEach(()=>{
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@dsa.com`
            password = `password-${Math.random()}`

            return User.deleteMany()
           

        })

        it('should succeed on correct data', ()=>
            
            logic.user.register(name, surname, email, password)
             .then(()=> User.findOne({email}))
             .then(user => {
                 expect(user).to.exist
                 expect(user.name).to.equal(name)
                 expect(user.surname).to.equal(surname)
                 expect(user.email).to.equal(email)
                 
             })
        )

        it('should fail on incorrect data', ()=>
            
            logic.user.register('safd', surname, email, password)
             .then(()=> User.findOne({email}))
             .then(user => {
                 expect(user).to.exist 
                 expect(user.name).to.not.equal(name)
               
             })
        )

       

        it('should fail on non-valid email', () =>
            expect(() =>
                logic.user.register('John-3', 'Doe-3', 'johndoe-3#mail.com', 'Password3')).to.throw(Error, 'email with value johndoe-3#mail.com is not a valid e-mail')
        )

        it('should fail with name if is not  a string', () =>
            expect(() =>
                logic.user.register([], 'Doe-6', 'johndoe-6@mail.com', 'Password6')).to.throw(Error, 'name with value  is not a string')
        )

        it('should fail with surname if is not  a string', () =>
            expect(() =>
                logic.user.register('John-7', NaN, 'johndoe-7@mail.com', 'Password7')).to.throw(Error, 'surname with value NaN is not a string')
        )

        
       
    })

    after(()=> mongoose.disconnect())
})