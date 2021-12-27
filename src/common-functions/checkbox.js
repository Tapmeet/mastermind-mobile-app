import React from "react";
import { Select, VStack, CheckIcon, Center, NativeBaseProvider, Left } from "native-base";
export const Dropdown = () => {
  let [select, setSelected] = React.useState("");
  return (
    <VStack alignItems="center" space={4}>
      <Select
        selectedValue={select}
        minWidth={200}
        accessibilityLabel="Select your favorite programming language"
        placeholder="Select your favorite programming language"
        onValueChange={(itemValue) => setSelected(itemValue)}
        _selectedItem={{
          bg: "cyan.600",
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="JavaScript" value="js" />
        <Select.Item label="TypeScript" value="ts" />
        <Select.Item label="C" value="c" />
        <Select.Item label="Python" value="py" />
        <Select.Item label="Java" value="java" />
      </Select>
    </VStack>
  );
};

export default () => {
  return (
    <Left flex={1}>
      <Dropdown />
    </Left>
  );
};
