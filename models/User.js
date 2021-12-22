const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');


//create user model
class User extends Model {
    //setup method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and config
User.init(
    {
        //table column definitions here
        //define an id column
        id: {
            //use special sequelize datatypes object to provide what type of  data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQLs NOT NULL option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true

        },
            //define a username column
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            //define an email column
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                //there cannot be any duplicate email address values in table
                unique: true,
                //if allowNull is set to false, run data through validators before creating table
                validate: {
                    isEmail: true
                }
            },
            //define a password column
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    //this means password must be 4 chars
                    len: [4]
                }
            }
        },
        {
            hooks: {
                //set up beforeCreate lifecycle "hook" functionality
                /*beforeCreate(userData) {
                    return bcrypt.hash(userData.password, 10).then(newUserData => {
                        return newUserData
                    });
                }*/

                //alternate way of doing the same thing
                async beforeCreate(newUserData) {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
                //setup beforeUpdate lifecycle hook functionality
                async beforeUpdate(updatedUserData) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
                }

            },
    
    
        //table config options go here
        //pass in sequalize connection to directly connect to db
        sequelize,
        //dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel casing 
        underscored: true,
        //make it so our model name stays lowercase in db
        modelName: 'user'

    }
);

module.exports = User;