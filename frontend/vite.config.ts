import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		reactRefresh(),
		svgr(),
		legacy({
			targets: ['defaults', 'not IE 11'],
		}),
	],
});

module.exports = {
	root: './',
	build: {
		outDir: 'dist',
	},
	publicDir: 'assets',
};
