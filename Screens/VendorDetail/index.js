import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { store, ADD_VENDOR_CART } from '../../store';

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

const GET_VENDOR_PRODUCTS_QUERY = gql`
    query VendorProducts($vendorID:MongoID!) {
        productMany(filter:{vendor:$vendorID}) {
            _id
            name
            vendor {
                _id
            }
            description
            type
            category
            price
        }
    }
`

const LOCAL_CREATE_ORDER_MUTATION = gql`
    mutation CreateOrder($userID:MongoID!, $vendorID:MongoID!) {
        orderCreateOne(record:{user:$userID, vendor:$vendorID, items:[]}) {
            record {
                items {
                    product {
                        name
                    }
                }
            }
            recordId
        }
    }
`

const ProductCard = ({ product, navigation }) => {
    let params = {
        product: product,
    };
    return (
        <View style={styles.item} onTouchEnd={() => navigation.navigate('ProductDetail', params)}>
            <Text>{product.name}</Text>
            <Text>{product.category}</Text>
        </View>
    )
}

const VendorDetail = ({ route, navigation }) => {
    const { vendor } = route.params;
    const { state, dispatch } = useContext(store);

    const { data, loading, error } = useQuery(
        GET_VENDOR_PRODUCTS_QUERY,
        { variables: { vendorID: vendor._id } }
    ); 

    if (error) { console.error('error', error) };
    if (loading) {
        return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator />
        </SafeAreaView>
        );
    };
    if (!data) return <p>No data...</p>;

    const products = data.productMany;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
            data={products}
            renderItem={({ item: product }) => {
                return (<ProductCard 
                    navigation={navigation} 
                    product={product} />
                    )
            }}
            keyExtractor={product => product._id}
            />
            <Button
            title={"View Cart"}
            onPress={() => navigation.navigate("CartDetail")}
            />
        </View>
    );
}

export default VendorDetail;
