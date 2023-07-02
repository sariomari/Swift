# Swift
A fast clothing delivery app

# Team Members
Ahmad Rayan , Sari Omari , Yousef Taweel , Tamer Damouni , Feras Baransi , Mohammed Nashif

# Description
Swift is a dual app system that reshapes the way you handle your clothing needs. Swift facilitates the effortless delivery of apparel from your favorite shops that are in your zone, the app lets you order clothes and get them in the same hour, Whether you're a fashionista seeking convenience or a driver looking to earn, Swift makes fashion accessible, efficient, and exciting. Experience fashion delivery, simplified.

# Running Instructions
The backend and frontend are separate components which can be run simultaneously. In order for the app to function correctly both should be running.
## Start The Backend Server
- Install the latest VSCode version (or your favorite IDE)
- Clone the git repository
- Open the terminal in your IDE and make sure it's in the project directory
- Run `python manage.py runserver` (In some computers its `python3 manage.py runserver`

## Start The Apps
- Open a new separate terminal, and cd into one of myapp/myapp1
- Run the command `npm install` to install all dependencies
- Run the command `npx expo start` to star the app

## Opening The App
The last command will show a QR code in the terminal that you can scan and open in the Expo Go app in both iOS and Android.
You can also open the app on your computer using an Android or iOS simulator (in Xcode).
The easiest way would be to install the Expo app on your mobile and scan the QR code.
## IMPORTANT NOTE:
The apps send the requests to the backend which should be running on localhost:8000, if that's not where the backend is running on your machine, please make sure the requests are being sent to the correct place.

# Structure of The Project
The project contains 3 main components: 
- The user app /myapp
- The delivery driver's app /myapp1
- The backend which resides in /swiftbackend and implemented in /playground
  
### The User Application
The user application, where the user can browse, order or return clothes from nearby stores. The app's implementation consists of screens, where each screen is a .js file. The application interacts with the backend that should be running simultaneously.

### The Delivery Application
The delivery app consists of login/singup screens and the main screen containing the city map, which is deliveryMain.js. The app tracks the delivery driver's location in real time and sends it to the backend, and checks if there are any new tasks for the driver to accept, based on his location.

### The Backend
Implemented in Python Django Library, the backend resides in /swiftbackend which contains the routes and basic information, and the implementation resides in /playground which contains the implementations of the backend API and responses to the frontend.
The backend has the access to the SQLite database which contains all the necessary information for the apps to function. The backend also keeps track of the delivery drivers in each zone using a python dictionary called `task_manager` which is saved in the cache implemented in /shared_data.py (SQLite in our case). task_manager updated itself each time a delivery driver changes his zone, so it's updated at all times.
