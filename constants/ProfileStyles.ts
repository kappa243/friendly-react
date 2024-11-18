import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#76706b',
    },

    userBox: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },

    image: {
      width: 220,
      height: 220,
      marginVertical: 10,
      marginHorizontal: 'auto',
      borderRadius: 12,
      elevation: 3,
    },

    userName: {
        fontSize: 32,
        marginBottom: 6,
        padding: 2,
        color: '#2f2c2a',
        fontWeight: 'bold',
    },

    userDescription: {
        color: '#2f2c2a',
        marginBottom: 20,
        padding: 2,
    },

    friendBox: {
      padding: 6,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#dcecf2',
      marginVertical: 6,
      borderRadius: 12,
      elevation: 3,
      alignItems: 'center',
    },

    friendUserName: {
      fontSize: 18,
      paddingVertical: 20,
      paddingHorizontal: 6,
      width: '100%', 
      color: 'black'
    },

    friendPhoto: {
        width: 64,
        height: 64,
        marginRight: 12,
        borderRadius: 6,
        elevation: 3,
    },

    friendsList: {
        flex: 1,
        width: '100%',
    },

  });

export default styles;