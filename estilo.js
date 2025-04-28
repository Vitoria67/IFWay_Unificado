import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#D5D3CC' // LIGHT GRAY
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20
    },
    input:{
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#6FA9BB' // MOONSTONE BLUE
    },

    buttonContainer: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#19350C', // PHTHALO GREEN
        width: '100%',
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        margin: 10
    },
    buttonText:{
        color: '#D5D3CC', // LIGHT GRAY
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderColor: '#19350C', // PHTHALO GREEN
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#19350C'
    },

    //FLATLIST
    item: {
        backgroundColor: '#6FA9BB', // MOONSTONE BLUE
        borderColor: '#406768', // DEEP SPACE SPARKLE
        borderWidth: 2,
        borderRadius: 15, 
        padding: 20,
        marginVertical: 10       
    },
    titulo: {
        fontSize: 18,
        color: '#19350C', // PHTHALO GREEN
        fontWeight: '600'
    },
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        borderWidth: 2,
        borderColor: '#406768' // DEEP SPACE SPARKLE
    },
    imagemView: {
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    }
});
