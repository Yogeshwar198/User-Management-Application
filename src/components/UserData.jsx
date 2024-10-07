import React from 'react';

const UserData = ({ users }) => {
  return (
    <>
      {users.map((currUser) => {
        const { id, name, email, phone, address, company } = currUser;

        return (
          <tr key={id}> {/* Added a key to the row for React's list rendering */}
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address.street}{" , "}{address.city}</td>
            <td>{company.name}</td>
          </tr>
        );
      })}
    </>
  );
};

export default UserData;
