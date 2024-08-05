import React, { useEffect, useState } from 'react';
import { getUsersCount,  disableUsersCount } from '../../API/users';
export default function UsersStatus(){
    // const[activeUsers, setactiveUsers] = useState(0);
    const[usersCount, settotalUsers] = useState(0);
    const[disableUsers, setdisableUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          const users = await getUsersCount();
        //   const active = await activeUserscount();
          const disable = await disableUsersCount();
    
          if (users !== null) {
            settotalUsers(users);
          }
        //   if (active !== null) {
        //     setactiveUsers(active);
        //   }
          
          if (disable !== null){
            setdisableUsers(disable);
          }
        };
    
        fetchData();
      }, []);
      console.log(disableUsers);

    return(
        <div>
            <h1>disable users-count:{disableUsers}</h1>
            {/* <h1>Active-users-count:{activeUsers}</h1> */}
            <h1>users count: {usersCount}</h1>
         
            
        </div>
    )
}