import RootProdaction from 'Root.prod';
import RootDevelop from 'Root.dev';

if (process.env.NODE_ENV === 'production') {
  module.exports = RootProdaction;
} else {
  module.exports = RootDevelop;
}
