import { User } from "../models/user";
import { UserDTO } from "../dtos/UserDTO";

export function userDTOToUserConverter(userDTO:UserDTO):User
{
    
    return new User(
        userDTO.userId ,
        userDTO.username,
        '############9##',
        //userDTO.password,
        userDTO.firstName,
        userDTO.lastName,
        userDTO.email,
        userDTO.roleId,
        userDTO.role
          
    )
  
    
    
}