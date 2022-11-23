import {
  StyleSheet,
  Text,
  Modal,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";

import colors from "../config/colors";
import DriverCardPicker from "./DriverCardPicker";
function AppPicker({
  icon,
  items,
  numOfColumns,
  onSelectItem,
  placeholder = "Select Driver",
  selectedItem = "None",
  PickerItemComponent = DriverCardPicker,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    console.log("Items", items);
  }, [items]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <Text>
            {placeholder} :{"  "}
          </Text>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem && <Text style={styles.text}>{selectedItem.name}</Text>}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <AppButton
            title="close"
            onPress={() => setModalVisible(false)}
            style={styles.btn}
            icon="close"
          />

          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                driverName={item.name}
                item={item}
                name={item.name}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 50,
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: colors.danger,
  },
  container: {
    borderRadius: 12,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
