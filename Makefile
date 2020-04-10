webpack-dev:
	yarn run build-dev

webpack-prod:
	yarn run build-prod

watch:
	yarn run watch

hotreload:
	yarn run hotreload

generate-icon-font:
	icon-font-generator src/img/icons/*.svg -o src/fonts/icons -n portfolio-icons -p portfolio-icon --normalize