import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// validation
export const createUser = async (Name,Email,Password) =>{
    if(Name.trim() === '' ||
        Email.trim() === '' ||
          Password.trim() === '' ){
          const error = new TypeError (
                'Name,Email, Password are required.'
            )
            error.statusCode = 400;
            throw error;
          }

          if(!validator.isEmail(Email)){
            const error = new TypeError ('Invalid emaild address.')
            error.statusCode = 400;
            throw error;
          }

          if(!validator.isStrongPassword(Password)){
            const error = new TypeError ('Password is not strong enough.')
            error.statusCode = 400;
            throw error;
          }


          const [user] = await pool.query("SELECT Email From tbluser  Where Email = ?", [Email]);

          if(!user.length === 1){
            const error = new Error(`The email ${Email} is alrady used.`)
            error.statusCode = 400;
            throw error;
          }

          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(Password, salt);

          const [newUser] =  await pool.query(
            "INSERT INTO tbluser(Name,Email,Password) VALUES(?,?,?)",
             [Name,Email,hashedPassword]
          );

          return newUser;


}


export const login = async (Email, Password) => {
    if(Email.trim() === '' || Password.trim() === ''){
        const error = new Error('Email and Password are required.')
        error.statusCode = 400;
        throw error;
    }   

        const [user] = await pool.query("SELECT * FROM tbluser WHERE Email = ?", [Email]);
            if(user.length === 0){const error = new Error(`An account with the email ${Email} does not exist.`)
            error.statusCode = 400;
            throw error;
    }

    if(!bcrypt.compareSync(Password, user[0].Password)){
        const error = new Error('Incorrect password.');
        error.statusCode = 400;
        throw error;
    }   
    
    const token = jwt.sign({id: user[0].id}, process.env.SECRET,{expiresIn: '1d'});

    return token;
}

export const getUser = async (id) =>{
  if(parseInt(id) === NaN){
    throw new Error ('Invalid Id');
  }

  const [user] = await pool.query('')
}


 