
clean:
	rm -rf build

public/bundle.js:
	./node_modules/.bin/browserify browser/index.js --outfile public/bundle.js

public/bundle.css:
	cat stylesheets/index.css | ./node_modules/.bin/styl --compress > public/bundle.css

bundle: public/bundle.js public/bundle.css

build: clean bundle
	./node_modules/haiku/bin/haiku build

.PHONY: clean bundle public/bundle.js public/bundle.css
