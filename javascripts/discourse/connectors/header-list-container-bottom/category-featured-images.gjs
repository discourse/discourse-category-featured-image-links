import Component from "@glimmer/component";
import bodyClass from "discourse/helpers/body-class";

export default class CategoryFeaturedImages extends Component {
  static shouldRender(args, context, owner) {
    const router = owner.lookup("service:router");
    return router.currentRoute.name.includes("discovery.category");
  }

  get hideTopicList() {
    const categoryIDs = settings.hide_topic_list
      .split("|")
      .map((id) => parseInt(id, 10));

    return categoryIDs.includes(this.args.outletArgs.category.id);
  }

  get filteredSetting() {
    const parsedSetting = JSON.parse(settings.category_image_sections);
    const filteredSetting = parsedSetting.filter(
      (section) =>
        Object.keys(section).length &&
        parseInt(section.category_id, 10) === this.args.outletArgs.category.id
    );

    filteredSetting.forEach((section) => {
      section.slug = section.section_title.toLowerCase().replace(/\s/g, "");
    });

    return filteredSetting;
  }

  <template>
    {{if this.hideTopicList (bodyClass "hide-topic-list")}}

    {{#each this.filteredSetting as |fs|}}
      <div class="category-featured-image-section custom-filter_{{fs.slug}}">
        {{#if fs.section_title}}
          <h2 class="category-featured-image-section__title">
            {{fs.section_title}}
          </h2>
        {{/if}}

        <div class="category-featured-image-section__images">
          {{#each fs.images as |image|}}
            <a href={{image.link}}>
              <img
                class="category-featured-image-section__image"
                src={{image.image_url}}
              />

              {{#if image.link_text}}
                <h3 class="category-featured-image-section__image-title">
                  {{image.link_text}}
                </h3>
              {{/if}}
            </a>
          {{/each}}
        </div>
      </div>
    {{/each}}
  </template>
}
