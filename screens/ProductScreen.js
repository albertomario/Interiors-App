import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addToCart, removeFromCart, updateCartQuantity } from '../store/actions/cart';
import * as productActions from "../store/actions/products";
import * as cartActions from "../store/actions/cart";

import P from "../components/P";
import H2 from "../components/H2";
import H3 from "../components/H3";
import Card from '../components/Card';
import HapticButton from "../components/HapticButton";
import { Theme } from '../constants/Theme';
import CenteredModal from "../components/CenteredModal";
import HorizontalLine from "../components/HorizontalLine";

import ReduxActionDependencyLoading from '../components/ReduxActionDependencyLoading';

const loadingDependencies = [productActions.fetchProducts, cartActions.getCart];

const ProductScreen = ({ route, navigation }) => {
    //setup
    const theme = Theme();
    const dispatch = useDispatch();

    //for icons at bottom of page
    const detailIconSize = 30;

    //setup modal visible state hook
    const [modalVisible, setModalVisible] = useState(false);

    //reload products from server on navigation
    const dependencyLoaderRef = useRef(null);
    const isFirstRender = dependencyLoaderRef.current === null ? true : false;

    const handleDependencyReload = () => {
        if (!isFirstRender) dependencyLoaderRef.current.load(true);
    };
    useEffect(() => {
        return navigation.addListener('focus', handleDependencyReload);
    }, [handleDependencyReload]);

    //get current product data
    const productId = route.params.productId;
    const product = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));
    const cartItem = useSelector(state =>
        state.cart.items.find(prod => prod.productId === productId));

    const imageWidth = Dimensions.get('window').width;

    // change quantity flatlist numbers choice list data
    const [quantityNumberList, setQuantityNumberList] = useState([]);
    useEffect(() => {
        setQuantityNumberList([...Array(product.stock).keys()].map(num => num + 1));
    }, [cartItem]);

    //quantity modal
    const QuantitySelectorModal = () => (
        <CenteredModal visible={modalVisible} style={styles.modalView} close={() => { setModalVisible(false) }}>
            <View>
                <FlatList data={quantityNumberList} keyExtractor={(item, index) => index.toString()} renderItem={
                    itemData => {
                        return (
                            <TouchableOpacity style={{ height: 40, backgroundColor: itemData.item === cartItem.quantity ? theme.colors.tint : theme.colors.card }}
                                onPress={() => { dispatch(updateCartQuantity(productId, itemData.item)); setModalVisible(false) }}>
                                <View style={{ alignItems: "center", padding: 10 }}>
                                    <P>{itemData.item}</P>
                                </View>
                                <HorizontalLine style={{ borderColor: "grey" }} />
                            </TouchableOpacity>
                        );
                    }
                }
                />
            </View>
        </CenteredModal>
    );

    //horizontal image flatlists render item
    const renderProductImage = ({ item, index }) => {
        return (
            <Image source={{ uri: item }} style={{ width: imageWidth, height: imageWidth }} />
        );
    };

    //Homepage JSX

    const loadedView = () => (

        <View style={styles.screen}>
            <QuantitySelectorModal />
            <ScrollView style={styles.screen} keyboardShouldPersistTaps="never">

                {/* images */}
                <View style={styles.flatListElementConstainer}>

                    <Card style={{ ...styles.card, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                        <FlatList
                            data={product.imageURLs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderProductImage}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment={"start"}
                            snapToInterval={imageWidth + 10}
                            decelerationRate={"fast"}
                            pagingEnabled
                        />
                        <View style={styles.imageFooter}>
                            {
                                cartItem === undefined ?
                                    product.stock > 0 ?
                                        <HapticButton style={{ backgroundColor: theme.colors.tint, ...styles.cartButton }} onPress={() => { dispatch(addToCart(product.id, 1)) }}>
                                            <P>ADD TO CART</P>
                                        </HapticButton>
                                        :
                                        <View style={styles.cartButton}><H3>Out Of Stock</H3></View>
                                    :
                                    <View>
                                        <HapticButton style={{ backgroundColor: theme.colors.remove, ...styles.cartButton }} onPress={() => { dispatch(removeFromCart(product.id)) }}>
                                            <P>REMOVE FROM CART</P>
                                        </HapticButton>
                                        <View style={styles.quantityContainer}>

                                            <P style={styles.quantityText}>Quantity: {cartItem.quantity}</P>

                                            <HapticButton style={{ backgroundColor: theme.colors.tint, ...styles.changeButton }} onPress={() => { setModalVisible(!modalVisible) }}>
                                                <P>CHANGE</P>
                                            </HapticButton>
                                        </View>
                                    </View>
                            }
                        </View>
                    </Card>
                </View>
                <Card style={{ ...styles.screenPadding, ...styles.card, ...styles.marginVertical }}>
                    <View style={styles.cardSection}>
                        <H2>{product.name}</H2>
                    </View>
                    <View style={styles.cardSection}>
                        <H3>£{product.price}</H3>
                    </View>
                    <P>{product.description}</P>
                </Card>
                <Card style={{ ...styles.screenPadding, ...styles.card, ...styles.marginVertical }}>
                    <View style={styles.cardSection}>
                        <H3>Details</H3>
                    </View>
                    <View style={styles.detailsRow}>
                        <View style={styles.detailsContainer}>
                            <MaterialCommunityIcons name="ruler" size={detailIconSize} color={theme.colors.text} />
                            <View>
                                <P>Height: {product.height}</P>
                                <P>Width: {product.width}</P>
                                <P>Depth: {product.depth}</P>
                            </View>
                        </View>
                        <View style={styles.detailsContainer}>
                            <MaterialCommunityIcons name="weight" size={detailIconSize} color={theme.colors.text} />
                            <View>
                                <P>Weight: {product.weight}</P>
                            </View>
                        </View>
                        <View style={styles.detailsContainer}>
                            <MaterialCommunityIcons name="format-paint" size={detailIconSize} color={theme.colors.text} />
                            <View>
                                <P>Color: {product.color}</P>
                            </View>
                        </View>
                        <View style={styles.detailsContainer}>
                            <MaterialCommunityIcons name="hammer" size={detailIconSize} color={theme.colors.text} />
                            <View>
                                <P>Material: {product.material}</P>
                            </View>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );

    return <ReduxActionDependencyLoading ref={dependencyLoaderRef} loadedView={loadedView} dependencies={loadingDependencies} />
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: "100%"
    },
    screenPadding: {
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    flatList: {
        width: "100%",
        height: "100%"
    },
    flatListElementConstainer: {
        flex: 1,
        width: "100%",
        marginBottom: 5
    },
    imageFooter: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: "center"
    },
    card: {
        borderRadius: 12
    },
    marginVertical: {
        marginVertical: 10
    },
    cartButton: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 30,
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 10
    },
    cardSection: {
        paddingBottom: 20
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%"
    },
    detailsContainer: {
        alignItems: "center",
        maxWidth: Math.floor(Dimensions.get("window").width / 4)
    },
    changeButton: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: 100
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 15
    },
    modalView: {
        padding: 10,
        width: Dimensions.get("window").width / 1.25,
        height: Dimensions.get("window").height / 1.5
    }
});


export default ProductScreen;
