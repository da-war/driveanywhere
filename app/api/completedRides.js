//get trips from async storage
const getTrips = async () => {
  const myTrips = [];
  try {
    const value = await AsyncStorage.getItem("trips");
    if (value !== null) {
      myTrips = JSON.parse(value);
      //check myTrips where
    }
  } catch (error) {
    console.log(error);
  }
};
//
