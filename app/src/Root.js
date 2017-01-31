import RootProduction from 'Root.prod';
import RootDevelop from 'Root.dev';

if (process.env.NODE_ENV === 'production') {
  module.exports = RootProduction;
} else {
  module.exports = RootDevelop;
}
