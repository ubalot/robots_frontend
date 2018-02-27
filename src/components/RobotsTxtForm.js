import React from 'react'
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider } from 'material-ui'

const style = {
  margin: 20
}

export default class RobotsTxtForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)

    this.state = {
      value: false
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleAddButton () {
    console.log(this.state.value)
  }

  render () {
    return (
      <Paper style={style}>
        <Card>
          <CardTitle title="Fill in, then press Add" subtitle="" />
          <Paper zDepth={1} style={style}>
            <TextField
              hintText="Domain"
              name="domain"
              style={style}
              underlineShow={true}
              onChange={this.handleChange}
            />
            <Divider />
            <TextField
              hintText="Website url"
              name="websiteUrl"
              style={style}
              underlineShow={true}
            />
            <Divider />
            <TextField
              hintText="RobotsTxt url"
              name="RobotsTxtUrl"
              style={style}
              underlineShow={true}
            />
            <Divider />
          </Paper>
          <CardActions>
            <FlatButton label="Add" onClick={this.handleAddButton} />
            <FlatButton label="Clear" />
          </CardActions>
        </Card>
      </Paper>
    )
  }
}
