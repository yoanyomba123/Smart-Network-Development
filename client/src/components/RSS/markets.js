import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

export default class Markets extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordcong: "",
      errors: {}
    };

    // binding this to onchange event

    axios
      .get("/api/rss/derivatives")
      .then(result => console.log(result.data))
      .catch(error => this.setState({ errors: error.response.data }));
  }
  render() {
    return <div />;
  }
}
