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
      width: 180,
      height: 180,
      marginBottom: 20,
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
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#ece0d7',
      marginVertical: 8,
      borderRadius: 12,
      margin: 6,
      elevation: 3,
      alignItems: 'center',
    },

    friendUserName: {
      fontSize: 18,
    },

    friendPhoto: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 6,
        elevation: 3,
    },

    friendsList: {
        flex: 1,
        width: '100%',
    }
  });

export default styles;