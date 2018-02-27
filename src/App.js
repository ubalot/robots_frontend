import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as Colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './components/Header'
import RobotsTxtForm from './components/RobotsTxtForm'

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.black,
    primary1Color: Colors.blue700,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA400,
    pickerHeaderColor: Colors.darkBlack
  }
})

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Header />
        <RobotsTxtForm />
      </MuiThemeProvider>
    )
  }
}

export default App
