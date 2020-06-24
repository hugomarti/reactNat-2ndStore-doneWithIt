import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import Button from "../components/Button";
import Card from "../components/Card";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";

import colors from "../config/colors";

import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );
  useEffect(() => {
    loadListings(1, 2, 3);
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <React.Fragment>
          <AppText>Couldn't retreive the listings.</AppText>
          <Button title="Retry" onPress={loadListings} />
        </React.Fragment>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
