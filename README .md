# Week 6 Lab - A React Native Cinema Booking Application
This lab aims to build on previous techniques by using local persistent storage within our app to store data.

Goal
The goals for this weeks lab are
- To build on the previous cinema booking example
- To add a single json object to store booking details in a hook
- To pass the state and the setState using props to the PersonalInfo Component and the MovieBooking Component
- To use a UUID unique identifier generated from the Crypto library
- To store the booking as a json object using local data AsyncStorage.setItem()
- To retrieve the data from local storage using AysncStorage.getItem()

# Part 1
Add the following code snippet inside the App.js component. Place it inside the App() function but before the return () block.
```
const [booking, setBooking] = useState({
      bookDate: "2026-10-19",
      movieTitle: "",
      numberOfSeats: 0,
      balcony: 0,
  });
```
This code sets up the booking as a single json object with a number of different attributes. These values are initialised to 0 or "" or a test date. In order to pass this data into the PersonalInfo component and the MovieBooking component we will introduce two props data and setData to each component. To pass this data via props add
```
data={booking} setData={setBooking}
```
as props when loading the ```<PersonalInfo/>``` and ```<MovieBooking/>``` components
To allow this data to be received by those components change the function headers in each of the files for PersonalInfo and MovieBookings inside the components folders.
Inside the function headers for both components three arguments should now be received in the following form
```export default function PersonalInfo({screenstyle, data, setData})```
This should be similar in the MovieBooking header. 
Introduce the following functions into the MovieBooking component. Place it below the function header but before the return block
```
 function handleChangeMovieTitle(newTitle) {
    setData(data => ({
      ...data, // use the spread operator to 'spread' the previous booking properties
      movieTitle: newTitle // update only the movieTitle
    }));
  };
```
To get this function to work when movie changes, we need to chnage the onChange event in the props of the relevant components. To do this add the following snippet of code inside the ```<Picker.....>``` component.
```
onValueChange={(itemValue) => handleChangeMovieTitle(itemValue)}>
```
Also make sure that the ```selectedValue={data.movieTitle}``` inside the ```<Picker>``` component. This will now set the picker to always show the currently selected movie in the dropdown. Now when the user selects a different movie from the Dropdown, the data inisde the booking object will change at the App.js level and in the dropdown list.

# Part 2
Add the following line inside the dependencies in package.json ```"expo-crypto": "~13.0.2",``` this will make the Crypto package availble to use.

Then add the line 
```import * as Crypto from 'expo-crypto';```
At the top of App.js to import the Crypto package from expo-crypto

Add the following line of code just inside the App() function - as the first line of code in that function.
```
var uuid = Crypto.randomUUID();//this uses the Crypto library to generate a Universal Unique Identifier
```

Add a new function in App.js called saveData - it should take no arguments. This function should be inside the App() function but before the return statement
Add the following line of code at the bottom of your screen i.e. place it below the swiper component
``` <TouchableOpacity style={styles.button} onPress={saveData}><Text style={{fontSize: 24, fontWeight: "bold"}}>Save Data</Text></TouchableOpacity>```
This line uses a TouchableOpacity which can make any element behave like a button. It's a little bit more sophisticated than a button and has some additional features but in this case we will use it like a button.
When this button is clicked, the onPress event will look to call a function called saveData(). Until we give it that function we will get an error so add the following function inside the App() function but before the render().
```
  async function saveData() {
        alert("Saved with UUID: " + uuid);
        Alert.alert("Saved with UUID: " + uuid);
}

```
Try this - click on the Save Data button, if it works, it should output a really long string of random letters and numbers - i.e. a Universal Unique Identifier. Commit and push your changes for Part 2.

# Part 3
To add the AsyncStorage library to our application, add the following line t package.json
```"@react-native-async-storage/async-storage": "1.23.1"```
And include the following line at the top of App.js with the other import statements

```import AsyncStorage from '@react-native-async-storage/async-storage';```

Now we can use AsyncStorage to save our booking object, add the following line to the saveData function
```
await AsyncStorage.setItem(uuid, JSON.stringify(booking));
```
This saves the object in Local Async Storage using a Universal Unique Identifier as the key. The object must be "stringified" before it can be stored as Async storeage only stores text data. Note that we are using the 'await' modifier to wait until the task is complete before proceeding.

# Part 4
To retrieve the data add another button to the bottom of the screen. Copy and paste the line for the ```<TouchableOpacity>``` Save data button. Change the text on the button to "Get Data" and change the function which the onPress event calls to getData.
Copy and paste the saveData function to a new function just below saveData() call the new function getData(). Make sure your new button works properly by adding an alert that says the "get data button was clicked".

If the button works add the following try - catch block of code inside your function.
```
    async function getData() {
        try {
            let thisBooking = await AsyncStorage.getItem(uuid);
            let parsedBooking = JSON.parse(thisBooking); // Convert from string to object
            alert("Movie Title: " + parsedBooking.movieTitle);
        } catch (error) {
          alert("Error getting data: " + error.message);
        }
      }
```
A try-catch block is a mechanism for catching exceptions. Exceptions are faults which can arise when relying on things outside the application itself, such as accessing a file through the Operating System. If a fault occurs the "exception handler" will catch it and issue an error message. If the code works, the movie title of the booking you saved will be sent in the Alert.




