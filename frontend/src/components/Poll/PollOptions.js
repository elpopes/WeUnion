// import React from 'react';
// import PropTypes from 'prop-types';
// import jwtFetch from "../../store/jwt";

// class PollOptions extends React.Component {
//   handleClick = (selectedOption) => {
//     jwtFetch(`/api/polls/${this.props.poll._id}/vote`, {
//       method: 'PUT',
//       body: JSON.stringify({ selectedOption }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((poll) => {
//         // Update the parent component with the updated poll data
//         this.props.onPollUpdate(poll);
//       })
//       .catch((error) => console.error(error));
//   };

//   render() {
//     const options = this.props.poll.options.map((option) => (
//       <button
//         key={option._id}
//         onClick={() => this.handleClick(option.option)}
//         className="btn btn-primary"
//       >
//         {option.option}
//       </button>
//     ));

//     return <div>{options}</div>;
//   }
// }

// PollOptions.propTypes = {
//   poll: PropTypes.object.isRequired,
//   onPollUpdate: PropTypes.func.isRequired,
// };

// export default PollOptions;
