// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Login from './Login';
// // import SignUp from './SignUp';
// // import VerifyEmail from './VerifyEmail';
// import Login from './Component/Login/Login';
// import SignUp from './Component/Signup/Signup';
// import VerifyEmail from './Component/VerifyEmail/VerifyEmail';

// function App() {
//   return (
// <div>
//   <SignUp/>
// {/* // <Router> */}
//       {/* <Routes> */}
//         {/* <Route path="/login" element={<Login />} /> */}
//         {/* <Route path="/" element={<SignUp />} /> */}
//         {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
//       {/* </Routes> */}
//     {/* </Router> */}
  
// </div>
//   );
// }

// export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import SignUp from './Component/Signup/Signup';
import VerifyEmail from './Component/VerifyEmail/VerifyEmail';
import Protected from './Component/Protected/Protected';

function App() {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path='/protected-page' element={<Protected/>}/>
      </Routes>

  );
}

export default App;
