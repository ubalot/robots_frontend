import React from 'react'
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider } from 'material-ui'

const style = {
  margin: 20
}

export default class RobotsTxtForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.state = {
      value: false
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    alert(this.state.value)
    event.preventDefault()
  }

  handleClear (event) {

  }

  render () {
    return (
      <Paper style={style}>
        <Card>
          <CardTitle title="Fill in, then press Submit" subtitle="All fields are necessary." />
          <form onSubmit={this.handleSubmit}>
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
            <CardActions>
              <FlatButton label="Submit" onClick={this.handleSubmit} />
              <FlatButton label="Clear" onClick={this.handleClear} />
            </CardActions>
          </form>
        </Card>
      </Paper>
    )
  }
}
