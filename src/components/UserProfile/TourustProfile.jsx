import { UserButton } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import React from 'react'

export default function TourustProfile() {

  return <div><UserButton /></div>;
}
 
// export default function TourustProfile() {
//   const { user } = useUser();
//   if (!user) return null;
//   const updateUser = async () => {
//     await user.update({
//       firstName: "John",
//       lastName: "Doe",
//     });
//   };
//   return (
//     <>
//       <button onClick={updateUser}>Click me to update your name</button>
//       <p>user.firstName: {user?.firstName}</p>
//       <p>user.lastName: {user?.lastName}</p>
//     </>
//   );
// }