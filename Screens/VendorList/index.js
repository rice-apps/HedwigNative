import React, { useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useQuery, gql, useMutation, useApolloClient } from '@apollo/client';
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

const GET_VENDORS_QUERY = gql`
    query VendorList {
        vendorMany {
            _id
            name
            type
            phone
            hours {
                day
                start
                end
            }
            locations {
                name
            }
        }
    }
`

const CREATE_ORDER_MUTATION = gql`
    mutation CreateOrder($userID:MongoID!, $vendorID:MongoID!) {
        orderCreateOne(record:{user:$userID, vendor:$vendorID}) {
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

const GET_ORDER_QUERY = gql`
    query OrderSelect($userID: MongoID!, $vendorID: MongoID!) {
        orderOne(filter:{ user:$userID, vendor:$vendorID, fulfillment:Not_Placed}) {
            _id
            createdAt
            items {
                product {
                    name
                }   
                comments
            }
        }
    }
`

const VendorCard = ({ vendor, navigation }) => {
    console.log("VEndor card.");
    console.log(vendor);

    let userID = "5ebcc3b7a55cea938d503171";
    let vendorID = vendor._id;

    const handleClick = () => {
        // Change page
        navigation.navigate('VendorDetail', { vendor: vendor });
    }

    return (
        <View style={styles.item} onTouchEnd={handleClick}>
            <Text>{vendor.name}</Text>
            <Text>Pickup at: {vendor.locations.map(location => location.name).join(", ")} </Text>
        </View>
    )
}

const VendorList = ({ navigation }) => {
    const { data, loading, error } = useQuery(GET_VENDORS_QUERY);
    // Getting our global state
    const { state, dispatch } = useContext(store);

    if (error) { console.error('error', error) };
    if (loading) {
        return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator />
        </SafeAreaView>
        );
    };
    if (!data) return <p>No data...</p>;

    const vendors = data.vendorMany;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
            data={vendors}
            renderItem={({ item: vendor }) => <VendorCard navigation={navigation} vendor={vendor} />}
            keyExtractor={vendor => vendor._id}
            />
        </View>
    );
}

export default VendorList;
