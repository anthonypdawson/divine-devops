# Makefile for Divine DevOps image conversion
# Usage:
#   make webp IMAGE=assets/images/posts/your-image.png
#
# Converts the given image to WebP format in the same directory.

WEBP_SCRIPT = scripts/convert-to-webp.sh

webp:
	@if [ -z "$(IMAGE)" ]; then \
		echo "Usage: make webp IMAGE=assets/images/posts/your-image.png"; \
		exit 1; \
	fi
	@bash $(WEBP_SCRIPT) $(IMAGE)

build:
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

clean:
	rm -rf _site .sass-cache

lint:
	npm run lint:css && npm run lint:html

optimize-images:
	bash scripts/optimize-images.sh

check-links:
	bash scripts/check-links.sh
