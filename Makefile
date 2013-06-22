deps: thin_deps puma_deps node_deps

thin_deps:
	cd thin_app && bundle install

puma_deps:
	cd puma_app && bundle install

node_deps: 
	cd node_app && npm install
