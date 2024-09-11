dist: dist/index.js
dist/index.js: $(wildcard src/*.ts) bun.lockb
	bun build.ts

bun.lockb: package.json
	bun install
	touch "$@"

.PHONY: all build clean dev format lint release test

all: dist
build: dist

clean:
	git clean -Xfd

dev:
	bun build.ts --watch

format:
	npx biome format --write .

lint:
	npx biome lint src/
	npx tsc

release:
	npx bumpp

test:
	bun test
