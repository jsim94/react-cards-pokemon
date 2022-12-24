import { useState, useEffect } from "react";
import axios from "axios";

function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flipCard = () => {
    setIsFacingUp((isUp) => !isUp);
  };
  return [isFacingUp, flipCard];
}

function useAxios({ url, keyName, formatter = (data) => data }) {
  if (!keyName) throw new Error("keyName must be provided");
  const [data, setData] = useLocalStorage(keyName);

  const addData = async (options) => {
    const response = await axios.get(
      `${url}${options ? options.join("/") : ""}`
    );

    setData((data) => [...data, formatter(response.data)]);
  };

  const removeData = () => {
    setData([]);
  };

  return [data, addData, removeData];
}

function useLocalStorage(key, initValue = []) {
  const init = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : initValue;

  console.log(JSON.parse(localStorage.getItem(key)));

  const [value, setValue] = useState(init);

  useEffect(() => {
    console.log(JSON.stringify(value));
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export { useFlip, useAxios, useLocalStorage };
