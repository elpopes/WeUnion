// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const AllMembers = (unionId) => {

//     const [members, setMembers] = useState([]);

//     useEffect(() => {
//         .get(`/api/unions/${unionId}/members`)
//         .then((response) => {
//             setMembers(response.data);
//         })
//         .catch((err) => console.log(err));
//     }, [unionId]);

//     return (
//         <div>
//         <h2>Members</h2>
//         <ul>
//             {members.map((member) => (
//             <li key={member._id}>
//                 <Link to={`/users/${member._id}`}>{member.name}</Link>
//             </li>
//             ))}
//         </ul>
//         </div>
//     );
//     }

// export default AllMembers;
