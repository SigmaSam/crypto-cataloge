import React from 'react';
import { PropTypes } from 'prop-types';
import { textToBigCurrency } from '../helpers/componentHelp';

const DashAsset = ({
  asset,
  currency,
}) => (

  <li key={asset.id}>
    <div>
      <img src={asset.image} alt={asset.name} />
    </div>
    <div>
      <h1>{asset.id}</h1>
      <div>
        <h2>{`${textToBigCurrency(asset.market_cap)} `}</h2>
        <h2>{`  ${currency}`}</h2>
      </div>
      <h2>{asset.symbol}</h2>
    </div>
  </li>
);

DashAsset.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    market_cap: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  currency: PropTypes.string.isRequired,
};

export default DashAsset;
