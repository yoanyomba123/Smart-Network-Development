import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { loadFeed } from "../../actions/auth.action";
class Markets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: props.feeds,
      errors: props.errors
    };
  }
  componentWillMount() {
    // perform load User Market Feed
    this.props.loadFeed();
  }

  componentDidMount() {
    this.setState({ feeds: this.props.feeds });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.feeds) {
      this.setState({ feeds: nextProps.feeds });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();

    // perform load User Market Feed
    this.props.loadFeed();
  }

  render() {
    // destructuring

    var { data } = this.state.feeds;
    var count = 0;
    let feedItems = [];
    let curr_infoset = [];

    let elements = [];
    if (data !== null || data !== undefined) {
      for (var item in data) {
        data[item].map((value, index) => {
          var info = data[item];
          //if (count < 20) {
          if (index % 2 && index > 0) {
            curr_infoset.push([info[index], info[index - 1]]);
          }
          //}
          count += 1;
        });
      }
    }

    return (
      <div>
        {this.state.feeds.data === null ? (
          <div>Please wait, loading…</div>
        ) : (
          <div>
            <br />
            <br />

            {curr_infoset.map((item, index) => {
              return (
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <div className="container">
                      <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                          <strong className="d-inline-block mb-2 text-primary" />
                          <h3 className="mb-0 text-center">
                            <a className="text-dark">{item[0].title}</a>
                            <hr />
                          </h3>
                          <h6 className="mb-1 text-muted">{item[0].pubDate}</h6>
                          <br />
                          <p className="card-text mb-auto">{item[0].content}</p>
                          <br />
                          <p className="lead mb-0">
                            <a
                              className="text-muted font-weight-bold"
                              href={item[0].link}
                            >
                              {" "}
                              <p>Continue reading... </p>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <div className="container">
                      <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                          <strong className="d-inline-block mb-2 text-primary" />
                          <h3 className="mb-0 text-center">
                            <a className="text-dark">{item[1].title}</a>
                            <hr />
                          </h3>
                          <h6 className="mb-1 text-muted">{item[1].pubDate}</h6>
                          <br />

                          <p className="card-text mb-auto">{item[1].content}</p>
                          <br />
                          <p className="lead mb-0">
                            <a
                              className="text-muted font-weight-bold"
                              href={item[1].link}
                            >
                              {" "}
                              <p>Continue reading... </p>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
// mapping properties to prop types
Markets.propTypes = {
  loadFeed: PropTypes.func.isRequired,
  feeds: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  // comes from root reducer called index
  feeds: state.feeds,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loadFeed }
)(withRouter(Markets));
