import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import DataDetail from '../components/DataDetail';
import { textToBigCurrency } from '../helpers/componentHelp';

const AssetDetailsSafe = ({
  match,
  currentCryptoList,
  currencyFilter,
}) => {
  const asset = currentCryptoList.find((asset) => asset.id === match.match.params.id);
  let assetRender;
  if (asset) {
    const showData = [
      { 'Market Cap': asset.market_cap },
      { Symbol: asset.symbol },
      {
        ath: asset.ath,
        ath_date: asset.ath_date,
      },
      { 'Low 24h': asset.low_24h },
      { 'High 24h': asset.high_24h },
      { 'Total Volume': asset.total_volume },
    ];
    assetRender = (
      <>
        <Link to={{
          pathname: '/',
        }}
        >
          Go back
        </Link>
        <div>
          <div>
            <img src={asset.image} alt={asset.name} />
          </div>
          <div>
            <h1>{asset.id}</h1>
            <div>
              <h2>{`${textToBigCurrency(asset.current_price)} `}</h2>
              <span>{currencyFilter}</span>
            </div>
          </div>
        </div>
        <div>
          <p>
            Crypto currency details | ticker:
            {asset.symbol}
          </p>
        </div>
        <ul>
          {
            showData.map((data, id) => (
              // eslint-disable-next-line
              <DataDetail idRow={id} key={id * 2} data={data} />
            ))
          }
        </ul>
      </>
    );
  } else {
    assetRender = <Redirect to="/" />;
  }

  return (
    <div className="asset-details-box">
      {assetRender}
    </div>
  );
};

const mapStateToProps = (state, match) => ({
  currentCryptoList: state.crypto,
  currencyFilter: state.currencyFilter,
  match,
});

AssetDetailsSafe.propTypes = {
  currentCryptoList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  currencyFilter: PropTypes.string.isRequired,
  match: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
    staticContext: PropTypes.string,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      path: PropTypes.string,
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default connect(mapStateToProps, null)(AssetDetailsSafe);
