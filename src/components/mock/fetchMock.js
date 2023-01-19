import mockData from './mockData';

function fetchMock() {
  return Promise.resolve({ json: () => Promise.resolve(mockData) });
}

export default fetchMock;
