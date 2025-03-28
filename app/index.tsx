import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleButtonPress = (value: string) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        let expression = input.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(expression);
        setInput(String(result));
      } catch (e) {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttonValues = [
    ["AC", "%", "⌫", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["00", "0", ".", "="],
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "white" },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>
        My Calculator
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            color: isDarkMode ? "white" : "black",
            borderColor: isDarkMode ? "white" : "black",
          },
        ]}
        value={input}
        editable={false}
      />

      {buttonValues.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn, colIndex) => {
            const isInFirstRow = rowIndex === 0;
            const isInLastColumn = colIndex === row.length - 1;
            const isSpecial = isInFirstRow || isInLastColumn;

            return (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  isDarkMode && { backgroundColor: "#000f00" }, // Same background for first row & last column
                  btn === "=" && styles.equalButton, // Orange background for "="
                  btn === "AC"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                  btn === "+"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                  btn === "-"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                  btn === "×"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                  btn === "÷"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                  btn === "⌫"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                  btn === "%"
                    ? isDarkMode
                      ? { backgroundColor: "grey" } // dark mode: use predefined style
                      : styles.button1 // light mode: custom color
                    : null,
                ]}
                onPress={() => handleButtonPress(btn)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isDarkMode && { color: "white" }, // Text becomes white in dark mode
                  ]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <View style={styles.toggleRow}>
        <Text style={{ color: isDarkMode ? "white" : "black" }}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    fontSize: 32,
    padding: 10,
    height: 80,
    marginBottom: 50,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    fontSize: 100,
    borderRadius: 50,
    backgroundColor: "rgb(255, 250, 236)", // Default background
  },
  button1: {
    borderRadius: 100,
    minWidth: 10,
    backgroundColor: "rgb(226, 226, 226)",
    // First row & last column buttons
    //rgb(175,175,175)
  },
  buttonText: {
    fontSize: 20,
    color: "black", // Default text color
  },
  equalButton: {
    borderRadius: 100,
    minWidth: 10,
    backgroundColor: "orange", // For "=" button
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
});
