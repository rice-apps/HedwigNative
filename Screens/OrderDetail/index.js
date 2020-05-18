import React, { useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import { store, ADD_TO_CART, CLEAR_CART } from '../../store';

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

const GET_ORDERS_QUERY = gql`
    query Orders($userID: MongoID!) {
        orderMany( filter: { user: $userID }, sort: _ID_DESC ){
            _id
            createdAt
            vendor {
                name
            }
            fulfillment
        }
    }
`

const OrderItem = ({ order, navigation }) => {

    return (
        <View style={styles.item} onTouchEnd={() => navigation.navigate('ProductDetail', {})}>
            <Text>{order._id}</Text>
            <Text>{order.vendor.name}</Text>
            <Text>{order.createdAt}</Text>
        </View>
    )
}

const OrderDetail = ({ route, navigation }) => {
    const { state, dispatch } = useContext(store);  

    let { userID } = state;

    const { data, loading, error } = useQuery(
        GET_ORDERS_QUERY, 
        { variables: { userID: userID } }
    );

    if (error) { console.error('error', error) };
    if (loading) {
        return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator />
        </SafeAreaView>
        );
    };
    if (!data) return (<Text>No data...</Text>);

    const orders = data.orderMany;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>View Order Status Below:</Text>
            <FlatList
            data={orders}
            renderItem={({ item: order }) => {
                return (<OrderItem 
                    navigation={navigation} 
                    order={order} />
                    )
            }}
            keyExtractor={order => order._id}
            />
        </View>
    );
}

export default OrderDetail;
