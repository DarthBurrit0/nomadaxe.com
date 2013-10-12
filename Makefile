
clean:
	rm -rf build

build: clean
	./node_modules/.bin/browserify browser/index.js --outfile public/bundle.js
	cat stylesheets/index.css | ./node_modules/.bin/styl --compress > public/bundle.css
	./node_modules/haiku/bin/haiku build

.PHONY: clean watch
