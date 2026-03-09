import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        width: 340,
        borderRadius: 16,
        padding: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: 'transparent',
    },
    divider: {
        marginBottom: 12,
    },
    sectionHint: {
        textAlign: 'center',
        marginVertical: 8,
        fontStyle: 'italic',
        color: '#8F9BB3',
    },
    inputContainer: {
        marginBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        paddingHorizontal: 16,
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    weightContainer: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    unitContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    inputLabel: {
        marginBottom: 4,
        marginLeft: 4,
    },
    input: {
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: 'transparent',
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
        borderRadius: 8,
    },
    createButton: {
        flex: 1,
        marginLeft: 8,
        borderRadius: 8,
    },
});