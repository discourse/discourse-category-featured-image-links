import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class CategoryFeaturedImages extends Component {
  static shouldRender(args, context, owner) {
    const router = owner.lookup("service:router");
    return router.currentRoute.name.includes("discovery.category");
  }

  @service router;

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
}
