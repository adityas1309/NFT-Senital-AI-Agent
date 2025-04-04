import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://data-api.nftgo.io/eth/v1/whale/',
  params: {
    sort_by: 'portfolio_value',
    include_contract: 'false',
    asc: 'false',
    offset: '0',
    limit: '20'
  },
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'api'
  }
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));