import React, { useRef, useEffect } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from '@expo/vector-icons';
import { getUserData } from "../store/actions/user";

import { DARKMODE_OPTIONS } from "../data/settings";
import H2 from "../components/H2";
import { Theme } from "../constants/Theme";
import HapticButton from '../components/HapticButton';
import H1 from '../components/H1';
import { setDarkmode } from "../store/actions/settings";
import P from '../components/P';
import { logoutUser } from '../store/actions/user';
import ReduxActionDependencyLoading from '../components/ReduxActionDependencyLoading';
import H3 from '../components/H3';
import Card from '../components/Card';


const loadingDependencies = [getUserData];

const DarkmodeOptionButtons = () => {
    const theme = Theme();

    const dispatch = useDispatch();
    const setDarkmodeOption = (darkmodeOption) => {
        dispatch(setDarkmode(darkmodeOption));
    }

    const Button = props => {
        const activeDot = (active) => {
            return <Entypo name="dot-single" size={15} color={active ? theme.colors.text : theme.colors.background} />;
        };
        return (<View style={styles.optionButtonsContainer}>
            <HapticButton style={styles.optionButton} onPress={() => { setDarkmodeOption(DARKMODE_OPTIONS.DARK) }}>
                <H1>🌑</H1>
                <P style={props.dark ? {} : { color: theme.colors.disabled }}>DARK</P>
                {activeDot(props.dark)}
            </HapticButton>
            <HapticButton style={styles.optionButton} onPress={() => { setDarkmodeOption(DARKMODE_OPTIONS.AUTO) }}>
                <H1>🌓</H1>
                <P style={props.auto ? {} : { color: theme.colors.disabled }}>AUTO</P>
                {activeDot(props.auto)}
            </HapticButton>
            <HapticButton style={styles.optionButton} onPress={() => { setDarkmodeOption(DARKMODE_OPTIONS.LIGHT) }}>
                <H1>🌕</H1>
                <P style={props.light ? {} : { color: theme.colors.disabled }}>LIGHT</P>
                {activeDot(props.light)}
            </HapticButton>
        </View>
        );
    };

    const themeSettings = useSelector(state => state.settings.settings);

    switch (themeSettings.darkmode) {
        case DARKMODE_OPTIONS.LIGHT:
            return <Button light={true} />

        case DARKMODE_OPTIONS.DARK:
            return <Button dark={true} />

        case DARKMODE_OPTIONS.AUTO:
            return <Button auto={true} />

        default:
            return <Button />
    }
};

const UserScreen = ({ route, navigation }) => {
    const theme = Theme();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);

    const dependencyLoaderRef = useRef(null);
    const isFirstRender = dependencyLoaderRef.current === null ? true : false;

    const handleDependencyReload = () => {
        if (!isFirstRender) dependencyLoaderRef.current.load(true);
    };

    useEffect(() => {
        const listener = navigation.addListener('focus', handleDependencyReload);
        return listener;
    }, [handleDependencyReload, navigation]);

    //SettingsScreen JSX

    const loadedView = () => (
        <View style={styles.screen}>
            {/* <View style={styles.settingContainer}>
                <H1 style={styles.optionName}>Color Theme</H1>
                <DarkmodeOptionButtons />
            </View> */}
            <Card style={styles.sectionContainer}>
                <View style={styles.sectionContainerHeader}>
                    <H3>Account details</H3>
                </View>
                <P>{userData.name}</P>
                <P>{userData.email}</P>
                <P>UID: {userData.userId}</P>
            </Card>
            <View style={{ alignSelf: "center", justifyContent: "flex-end", flex: 1 }}>
                <HapticButton style={{ ...styles.submitButton, backgroundColor: theme.colors.remove }} onPress={() => (dispatch(logoutUser()))}><P>Logout</P></HapticButton>
            </View>
        </View>
    );

    return <ReduxActionDependencyLoading ref={dependencyLoaderRef} loadedView={loadedView} dependencies={loadingDependencies} />;
};

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flex: 1
    },
    settingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    optionButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    optionButton: {
        flexDirection: "column",
        width: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    optionName: {
        fontFamily: "OpenSans-Regular"
    },
    submitButton: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 30,
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 10
    },
    sectionContainer: {
        alignItems: "center",
        padding: 10
    },
    sectionContainerHeader: {
        paddingBottom: 10
    }

});


export default UserScreen;
