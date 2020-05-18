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

const CREATE_ORDER_MUTATION = gql`
    mutation CreateOrder($userID:MongoID!, $vendorID:MongoID!, $items:[OrdersItemsInput] ) {
        orderCreateOne(record:{user:$userID, vendor:$vendorID, items:$items}) {
            record {
                _id
                createdAt
                items {
                    product {
                        name
                    }   
                    comments
                }
            }
            recordId
        }
    }
`

const CartItem = ({ product, navigation }) => {

    return (
        <View style={styles.item} onTouchEnd={() => navigation.navigate('ProductDetail', {})}>
            <Text>{product.name}</Text>
            <Text>{product.type}</Text>
        </View>
    )
}

const CartDetail = ({ navigation }) => {
    const { state, dispatch } = useContext(store);  

    const { userID, cart } = state;

    // TODO: Change this; placeholder for now
    let vendorID = cart.length > 0 ? cart[0].product.vendor._id : "";

    const transformToOrderItems = (cart) => {
        return cart.map(item => {
            return {
                product: item.product._id,
                addons: item.addons.map(addon => addon._id),
                quantity: 1,
                comments: item.comments
            }
        });
    }

    const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER_MUTATION);

    let orderVariables = { userID: userID, vendorID: vendorID };

    const handleClick = () => {
        // Submit order
        createOrder({ variables: {...orderVariables, items: transformToOrderItems(cart) }});

        // Clear cart
        dispatch({ type: CLEAR_CART });

        navigation.navigate("OrderDetail", { data, loading, error });
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>View Cart Items Below:</Text>
            <FlatList
            data={cart}
            renderItem={({ item }) => {
                return (<CartItem 
                    navigation={navigation} 
                    product={item.product} />
                    )
            }}
            keyExtractor={item => item.product._id}
            />
            <Button
            title={"Confirm"}
            onPress={handleClick}
            />
        </View>
    );
}

export default CartDetail;
