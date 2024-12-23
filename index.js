
class Car {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }
}


const cars = [
    new Car("Ferrari", "488", "Blue"),
    new Car("Cadillac", "Escalade", "Red"),
]


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // Serve the HTML with two buttons for each car
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Details</title>
</head>
<body>
    <h1>Car Details</h1>
    
    <button onclick="showCar(0)">Show Car 1</button>
    <button onclick="showCar(1)">Show Car 2</button>
    <button onclick="showAllCars()">Show All Cars</button>
    
    <div id="carDetails"></div>

    <script>
      // Pass the cars array from the server-side to the client-side
      const cars = ${JSON.stringify(cars)};
      console.log(cars);
      
      function showCar(carIndex) {
        // Access the correct car object from the array
        const car = cars[carIndex];
        
        // Check if car is found
        if (car) {
          const carDetails = \`
            <h2>\${car.make} \${car.model}</h2>
            <p>Color: \${car.color}</p>
          \`;
          document.getElementById('carDetails').innerHTML = carDetails;
        } else {
          document.getElementById('carDetails').innerHTML = 'Car not found!';
        }
      }

      function showAllCars() {
        let carDetailsHTML = "";
        
        // Loop through all cars and display each one's details
        cars.forEach(car => {
          carDetailsHTML += \`
            <h2>\${car.make} \${car.model}</h2>
            <p>Color: \${car.color}</p>
            <hr>
          \`;
        });
        
        document.getElementById('carDetails').innerHTML = carDetailsHTML;
      }
    </script>
</body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
