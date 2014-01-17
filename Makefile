
node_modules: package.json
	@npm prune
	@npm install

clean:
	@$(RM) -fr build
	@$(RM) -fr node_modules $(STANDALONE).js
	@$(RM) -fr npm-debug.log

public/bundle.js: node_modules
	./node_modules/.bin/browserify browser/index.js --outfile public/bundle.js

public/bundle.css: node_modules
	cat stylesheets/index.css | ./node_modules/.bin/styl --compress > public/bundle.css

bundle: public/bundle.js public/bundle.css

build: clean bundle
	./node_modules/haiku/bin/haiku build

.PHONY: clean bundle public/bundle.js public/bundle.css
