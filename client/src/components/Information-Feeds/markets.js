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

    let elements = [];
    if (data !== null || data !== undefined) {
      for (var item in data) {
        data[item].map(value => {
          if (count < 20) {
            feedItems.push(
              <div className="container">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                  <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block mb-2 text-primary" />
                    <h3 className="mb-0">
                      <a className="text-dark">{value.title}</a>
                      <hr />
                    </h3>
                    <h4 className="mb-1 text-muted">{value.pubdate}</h4>
                    <p className="card-text mb-auto">{value.content}</p>
                    <br />
                    <p className="lead mb-0">
                      <a
                        className="text-muted font-weight-bold"
                        href={value.link}
                      >
                        {" "}
                        Continue reading...{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          count += 1;
        });
      }
    }

    return (
      <div>
        {this.state.feeds.data === null ? (
          <div>Please wait, loading…</div>
        ) : (
          <div className="row-3"> {feedItems}</div>
        )}
      </div>
    );
    /*
    if (feeds) {
      var data = feeds.map(feed => {
        feed.items.map(item => {
          <div className="col-md-4">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary" />
                <h3 className="mb-0">
                  <a className="text-dark">{item.title}</a>
                </h3>
                <div className="mb-1 text-muted">{item.pubdate}</div>
                <p className="card-text mb-auto">{item.content}</p>
              </div>
            </div>
          </div>;
        });
      });
    } else {
      data = "Empty";
    }


    return <div>{data}</div>;
    */
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
export default connect(mapStateToProps, { loadFeed })(withRouter(Markets));
