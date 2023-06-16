// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // exports.sendMail = () => {
// //   const msg = {
// //     to: 'himanshu.aswal@acelucid.com', // Change to the recipient's email address
// //     from: 'shivam.rawat@acelucid.com', // Change to your verified Gmail address
// //     subject: 'Sending with SendGrid is Fun',
// //     text: 'and easy to do anywhere, even with Node.js',
// //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// //   };

// //   sgMail
// //     .send(msg)
// //     .then((response) => {
// //      res.status(200).json(response)
// //       console.log(`Email sent ${response}`);
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //     });
// // };


// exports.sendLeaveApprovalEmail = async (leaveRequestId) => {
//   try {
//     const adminEmail = 'shivam.rawat@acelucid.com'; // Change to the admin's email address

//     const approveUrl = `https://yourserver.com/approve-leave?id=${leaveRequestId}`;
//     const disapproveUrl = `https://yourserver.com/disapprove-leave?id=${leaveRequestId}`;
//     const emailContent = `
//       <p>A new leave request is waiting for approval.</p>
//       <p>Leave Request ID: ${leaveRequestId}</p>
//       <p>Please review the request and take appropriate action:</p>
//       <a href="${approveUrl}">
//         <button style="background-color: green; color: white; padding: 10px 20px; border: none;">Approve</button>
//       </a>
//       <a href="${disapproveUrl}">
//         <button style="background-color: red; color: white; padding: 10px 20px; border: none;">Disapprove</button>
//       </a>
//     `;

//     const msg = {
//       to: 'himanshu.aswal@acelucid.com',
//       from: 'shivam.rawat@acelucid.com', // Change to your verified email address or desired sender address
//       subject: 'New Leave Request',
//       html: emailContent,
//     };

//     await sgMail.send(msg);
//     console.log('Leave approval email sent successfully');
//   } catch (err) {
//     console.error('Error sending leave approval email:', err);
//   }
// };




