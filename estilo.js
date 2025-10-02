import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
  },
  containerHome: {
    flex: 1,
    backgroundColor: '#527954ff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 700,
    color: '#e9ce33ff',
    marginTop: 140,  
    marginBottom: 40
  },
  inputView: {
    width: '55%',
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 10
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    
  },
  inputPicker: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 8
  },
  buttonView: {
    width: '55%',
  },
  button: {
    backgroundColor: '#e9ce33ff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#070606ff',
    fontWeight: 700,
    fontSize: 15
  },
  buttonSec: {
    backgroundColor: '#ffffffff',
    borderColor: '#e9ce33ff',
    borderWidth: 2
  },
  buttonSecText: {
    color: '#020202ff'
  }
});
