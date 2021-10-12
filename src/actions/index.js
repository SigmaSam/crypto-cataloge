import fetchApiCryptoList from '../apis/coingecko';

const UPDATE_ASSET_LIST = 'UPDATE_ASSET_LIST';

const updateAssetList = (assetList) => ({
  type: UPDATE_ASSET_LIST,
  assetList,
});

const updateApiRenderList = () => (dispatch, getState) => fetchApiCryptoList(
  {
    url: null,
    currency: getState().currencyFilter,
  },
)
  .then((result) => {
    dispatch(updateAssetList(result));
  }).catch((error) => {
    throw (error);
  });

export default updateApiRenderList;
