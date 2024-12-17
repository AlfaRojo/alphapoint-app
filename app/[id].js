import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Link } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [priceData, setPriceData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.coinlore.net/api/ticker/?id=${id}`
      );
      const data = await response.json();
      setPriceData(data);
      setHistoricalData((prevData) => [
        ...prevData,
        {
          date: new Date(),
          value: parseFloat(data[0].percent_change_24h),
          price: parseFloat(data[0].price_usd),
        },
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => (prev === 1 ? 30 : prev - 1));
    }, 1000);

    const fetchInterval = setInterval(() => {
      if (fetchCount < 5) {
        fetchData();
        setFetchCount((prev) => prev + 1);
        setTimeRemaining(30);
      } else {
        clearInterval(fetchInterval);
        clearInterval(intervalRef.current);
      }
    }, 30000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(intervalRef.current);
    };
  }, [id, fetchCount]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const data = historicalData.map((item) => item.price);
  const yMin = Math.min(...data) * 0.98;
  const yMax = Math.max(...data) * 1.02;

  const axesSvg = { fontSize: 10, fill: "grey" };
  const grid = { stroke: "#eee" };

  return (
    <View style={styles.container}>
      <Link asChild href="/">
        <Pressable>
          <AntDesign name="back" size={24} color="white" />
        </Pressable>
      </Link>
      <Text style={styles.text}>
        Price (USD): {parseFloat(priceData[0].price_usd).toLocaleString()}
      </Text>
      {fetchCount < 5 && (
        <Text style={styles.fetchText}>
          Next fetch in({fetchCount}/5): {timeRemaining} seconds
        </Text>
      )}
      <View style={styles.chartContainer}>
        <YAxis
          data={data}
          style={styles.yAxis}
          contentInset={{ top: 10, bottom: 10 }}
          svg={axesSvg}
          min={yMin}
          max={yMax}
          formatLabel={(value) => `$${value.toFixed(2)}`}
        />
        <View style={styles.lineChart}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            curve={shape.curveNatural}
          >
            <Grid {...grid} />
          </LineChart>
          <XAxis
            style={styles.xAxis}
            data={data}
            formatLabel={(value, index) =>
              historicalData[index].date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    borderColor: "red",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  fetchText: {
    color: "#fff",
    fontSize: 14,
  },
  chartContainer: {
    height: 200,
    flexDirection: "row",
    width: Dimensions.get("window").width - 50,
  },
  yAxis: {
    marginBottom: 10,
  },
  lineChart: {
    flex: 1,
    marginLeft: 10,
  },
  xAxis: {
    marginHorizontal: -10,
    height: 30,
  },
});
