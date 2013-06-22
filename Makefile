deps: thin_deps puma_deps

thin_deps:
	cd thin_app && bundle install

puma_deps:
	cd puma_app && bundle install

