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

const CartDetail = ({ navigation }) => {
    const { state, dispatch } = useContext(store);  

    const { cart } = state;
    
    console.log(cart);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>View Cart Items Below:</Text>
            <Text>{cart.map(item => item.product.name)}</Text>
        </View>
    );
}

export default CartDetail;
