OUT_DIR='./dist'

build:
	@make clear
	@npm run build

clear:
	@rm ${OUT_DIR}/*.js ${OUT_DIR}/index.html ${OUT_DIR}/main.css

