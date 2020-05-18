import React, { useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { store, ADD_TO_CART } from '../../store';

const styles = StyleSheet.create(({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
}));

const ProductDetail = ({ route, navigation }) => {
    const { product } = route.params;
    const { state, dispatch } = useContext(store);  
    
    // We define
    const vendorID = product.vendor ? product.vendor._id : "";
    const orderItem = {
        product: product,
        addons: [],
        comments: ""
    }

    const handleClick = () => {
        dispatch({ type: ADD_TO_CART, vendorID: vendorID, item: orderItem });
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{product.name}</Text>
            <Text>{product.price}</Text>
            <Button
            title={"Add to Order"}
            onPress={handleClick}
            />
            <Button
            title={"View Cart"}
            onPress={() => navigation.navigate("CartDetail")}
            />
        </View>
    );
}

export default ProductDetail;
