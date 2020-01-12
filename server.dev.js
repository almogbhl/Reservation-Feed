import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

export default app => {
	const compiler = webpack(webpackConfig);

	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath,
			logLevel: 'silent'
		})
	);
	app.use(webpackHotMiddleware(compiler));
};
