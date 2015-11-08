# @file Makefile
# @brief Builds the single JS file for deployment.
# 
# Yeah yeah I should use Gulp, but it's literally one file so. . . yeah.
#
# @author Oscar Bezi (oscar@bezi.io)
#===============================================================================

../index.min.js: index-src.jsx
	babel index-src.jsx -o index-babel.js --presets react,es2015
	uglifyjs --compress --mangle -o ../index.min.js -- index-babel.js
	# For development it's nicer to not minify the JS
	# cp index-babel.js ../index.min.js

clean:
	rm index-babel.js
