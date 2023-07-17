import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import { test } from "qunit";
import { visit } from "@ember/test-helpers";

acceptance("Category featured image", function () {
  test("shows the images", async function (assert) {
    settings.category_image_sections = JSON.stringify([
      {
        category_id: "1",
        section_title: "Special Section",
        images: [
          {
            link_text: "First photo",
            link: "https://discourse.org",
            image_url: "special.jpg",
          },
        ],
      },
    ]);
    await visit("/c/bug/1");

    assert.dom(".custom-filter_specialsection").exists();
    assert
      .dom("#header-list-area .category-featured-image-section__title")
      .hasText("Special Section");
    assert
      .dom(".category-featured-image-section__images a")
      .hasAttribute("href", "https://discourse.org");
    assert
      .dom(".category-featured-image-section__images img")
      .hasAttribute("src", "special.jpg");
    assert
      .dom(".category-featured-image-section__images h3")
      .hasText("First photo");
    assert.dom(".topic-list-header").exists();
  });

  test("can hide the topic list", async function (assert) {
    settings.hide_topic_list = "1";
    await visit("/c/bug/1");

    assert.true(
      document.body.classList.contains(
        "category-featured-images--hide-topic-list-page"
      ),
      "body has the .category-featured-images--hide-topic-list-page class"
    );
  });
});
