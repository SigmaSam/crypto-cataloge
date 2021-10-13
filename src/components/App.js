import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import DashBoard from '../container/DashBoard';
import AssetDetailsSafe from '../container/AssetDetailsSafe';
import { updateApiRenderList } from '../actions/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { renderAssetList, currentCrypto, currencyFilter } = props;

    this.renderAssetList = renderAssetList;
    this.renderAssetList = this.renderAssetList.bind(this);
    this.currentCrypto = currentCrypto;
    this.currencyFilter = currencyFilter;
  }

  componentDidMount() {
    this.renderAssetList();
    this.assetsListUpInterval = setInterval(this.fetchApi.bind(this), 50000);
  }

  componentWillUnmount() {
    clearInterval(this.assetsListUpInterval);
  }

  fetchApi() {
    this.renderAssetList();
  }

  render() {
    return (
      <Router>
        <div>
          <h1> Current Crypto Price</h1>
          <a href="https://github.com/SigmaSam/crypto-cataloge">
            <img src="https://img.shields.io/badge/Github-Repo-green" alt="repo" />
          </a>
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route
              path="/asset/:id"
              render={(props) => (
                <AssetDetailsSafe
                  currency={this.currencyFilter}
                  data={this.currentCryptoList}
                  // eslint-disable-next-line
                  {...props}
                />
              )}
            />
            <Route
              path={'/*'}
              render={() => <Redirect to="/" />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  renderAssetList: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  renderAssetList: () => dispatch(updateApiRenderList()),
});

const mapStateToProps = (state) => ({
  currentCrypto: state.crypto,
  currencyFilter: state.currencyFilter,
});

App.propTypes = {
  currencyFilter: PropTypes.string.isRequired,
  currentCrypto: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
