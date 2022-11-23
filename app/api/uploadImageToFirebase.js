const addToFirestore = (urls, description) => {
  const myUrl = urls;
  const myDescription = description;

  const requestDocID = randomString(30);

  setDoc(doc(db, "driverRequests", requestDocID), {
    images: myUrl,
    description: myDescription,
    time: Date.now(),
    docID: requestDocID,
  })
    .then(() => {
      Alert.alert("Success", "Driver Request Successfully");
      setModalVisible(false);
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
      setModalVisible(false);
    });
};

// urls.push(url);
