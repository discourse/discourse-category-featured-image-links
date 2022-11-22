import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { inject as controller } from "@ember/controller";

export default class CategoryFeaturedImages extends Component {
  @service router;
  @controller application;

  get shouldShow() {
    return this.router.currentRoute.name.includes("discovery.category");
  }

  get hideTopicList() {
    let categoryIDs = settings.hide_topic_list
      .split("|")
      .map((id) => parseInt(id, 10));
    let currentCategoryID = this?.args?.category?.id;

    if (categoryIDs?.includes(currentCategoryID)) {
      // if we hide the topic list, we need to force the footer to show
      this.application.showFooter = true;
    }

    return categoryIDs.includes(currentCategoryID);
  }

  get filteredSetting() {
    let parsedSetting = JSON.parse(settings.category_image_sections);
    let filteredSetting = [];

    parsedSetting.forEach((filter) => {
      // don't return empty settings
      if (Object.keys(filter).length) {
        filteredSetting.push(filter);
      }
    });

    filteredSetting.forEach((filter) => {
      filter.slug = filter.section_title.toLowerCase().replace(/\s/g, "");
    });

    let currentCategoryID = this?.args?.category?.id;

    let result = filteredSetting.filter(function (object) {
      return parseInt(object.category_id, 10) === currentCategoryID;
    });

    return result;
  }
}
