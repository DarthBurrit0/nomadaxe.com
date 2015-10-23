MAKEFLAGS += --warn-undefined-variables
PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

all: bundles

node_modules: package.json
	@npm prune
	@npm install
	@touch node_modules

.PHONY: test
test:
	@exit 0

.PHONY: deploy
deploy: build node_modules
	surge build/ nomadaxe.com

.PHONY: clean
clean:
	@$(RM) -fr build
	@$(RM) -fr npm-debug.log

public/bundle.js: node_modules
	./node_modules/.bin/browserify browser/index.js --outfile public/bundle.js

public/bundle.css: node_modules
	cat stylesheets/index.css | ./node_modules/.bin/styl --compress > public/bundle.css

.PHONY: bundles
bundles: public/bundle.js public/bundle.css

build: bundles
	./node_modules/haiku/bin/haiku build
