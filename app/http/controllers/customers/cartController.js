// // factory function

// function cartController() {
//     return {
//         index(req,res) {
//             const formData = req.session.formData || {};
            
//             // Render the cart page with the stored form data
//             function calculateCost() {
//                 const formData = req.session.formData || {};
//                 const itemWeight = parseFloat(formData.weight) || 0; //|| 0
//                   const originState = formData.senderCity.trim().toLowerCase();
//                   const destinationState = formData.receiverCity.trim().toLowerCase();
              
//                 // Define a simple cost calculation formula (you may adjust this based on your requirements)
//                 const distanceFactor = 0.5; // Adjust as needed
//                 const weightFactor = 2; // Adjust as needed
              
//                 const distance = getDistanceBetweenStates(originState, destinationState);
//                 const cost = (distance * distanceFactor + itemWeight * weightFactor).toFixed(2);
              
//                 // document.getElementById('result').innerText = `Estimated Cost: ₹${cost}`;
                
//                  // Save the calculated cost in the session
//                  req.session.formData.cost = cost;
//               } 
              
//               // Example function to get distance between states (you might need a more accurate method)
//               function getDistanceBetweenStates(originState, destinationState) {
//                 // This is a placeholder, you should replace it with a proper distance calculation method
//                 // based on your requirements (e.g., using an external API or a database)
//                 // For simplicity, assuming a constant distance for the example.
//                 const stateDistances = {
//                 'andhra pradesh': 500,
//                 'arunachal pradesh': 800,
//                 'assam': 700,
//                 'bihar': 600,
//                 'chhattisgarh': 450,
//                 'goa': 250,
//                 'gujarat': 300,
//                 'haryana': 600,
//                 'himachal pradesh': 500,
//                 'jammu and kashmir': 1000,
//                 'jharkhand': 550,
//                 'karnataka': 400,
//                 'kerala': 300,
//                 'madhya pradesh': 500,
//                 'maharashtra': 200,
//                 'manipur': 900,
//                 'meghalaya': 850,
//                 'mizoram': 950,
//                 'nagaland': 850,
//                 'odisha': 600,
//                 'punjab': 750,
//                 'rajasthan': 750,
//                 'sikkim': 700,
//                 'tamil nadu': 300,
//                 'telangana': 400,
//                 'tripura': 900,
//                 'uttar pradesh': 450,
//                 'uttarakhand': 300,
//                 'west bengal': 550,
//                 'andaman and nicobar islands': 1100,
//                 'chandigarh': 600,
//                 'dadra and nagar haveli and daman and diu': 150,
//                 'lakshadweep': 1200,
//                 'delhi': 500,
//                 'puducherry': 400,
//               };
              
              
//                 return stateDistances[destinationState] || 0;
//               }
//             calculateCost()
//             res.render('customers/cart', { formData }) // passing session data to cart page
            
//         }
    
//     }
// }

// module.exports = cartController;

// factory function
function cartController() {
  return {
      index(req, res) {
          const formData = req.session.formData || {};

          // Render the cart page with the stored form data
          function calculateCost() {
              const formData = req.session.formData || {};

              //Ensure that req.session.formData is an object
              if (typeof req.session.formData !== 'object') {
                  req.session.formData = {};
              }

              // Check if the required properties are present in formData
              if (formData.weight && formData.senderCity && formData.receiverCity) {
                  const itemWeight = parseFloat(formData.weight) || 0;
                  const originState = formData.senderCity.trim().toLowerCase();
                  const destinationState = formData.receiverCity.trim().toLowerCase();

                  // Define a simple cost calculation formula (you may adjust this based on your requirements)
                  const distanceFactor = 0.5; // Adjust as needed
                  const weightFactor = 2; // Adjust as needed

                  const distance = getDistanceBetweenStates(originState, destinationState);
                  const cost = (distance * distanceFactor + itemWeight * weightFactor).toFixed(2);
                  
                  // Save the calculated cost in the session
                  req.session.formData.cost = cost;
              } else {
                req.session.formData.cost = 0;
                  // Handle the case where required properties are missing
                  console.error("Missing required properties in formData");
              }
          }

          // Example function to get distance between states (you might need a more accurate method)
          function getDistanceBetweenStates(originState, destinationState) {
              // This is a placeholder, you should replace it with a proper distance calculation method
              // based on your requirements (e.g., using an external API or a database)
              // For simplicity, assuming a constant distance for the example.
              const stateDistances = {
                'andhra pradesh': 500,
                'arunachal pradesh': 800,
                'assam': 700,
                'bihar': 600,
                'chhattisgarh': 450,
                'goa': 250,
                'gujarat': 300,
                'haryana': 600,
                'himachal pradesh': 500,
                'jammu and kashmir': 1000,
                'jharkhand': 550,
                'karnataka': 400,
                'kerala': 300,
                'madhya pradesh': 500,
                'maharashtra': 200,
                'manipur': 900,
                'meghalaya': 850,
                'mizoram': 950,
                'nagaland': 850,
                'odisha': 600,
                'punjab': 750,
                'rajasthan': 750,
                'sikkim': 700,
                'tamil nadu': 300,
                'telangana': 400,
                'tripura': 900,
                'uttar pradesh': 450,
                'uttarakhand': 300,
                'west bengal': 550,
                'andaman and nicobar islands': 1100,
                'chandigarh': 600,
                'dadra and nagar haveli and daman and diu': 150,
                'lakshadweep': 1200,
                'delhi': 500,
                'puducherry': 400,
              };

              return stateDistances[destinationState] || 0;
          }

          calculateCost();
          res.render('customers/cart', { formData }); // passing session data to cart page
      },
  };
}

module.exports = cartController;

