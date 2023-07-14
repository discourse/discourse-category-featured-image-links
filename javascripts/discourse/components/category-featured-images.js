import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { inject as controller } from "@ember/controller";

export default class CategoryFeaturedImages extends Component {
  @service router;
  @controller application;

  get shouldShow() {
    if (this.router.currentRoute.name.includes("discovery.category")) {
      this.application.showFooter = true;
      return true;
    }
  }

  get hideTopicList() {
    let categoryIDs = settings.hide_topic_list
      .split("|")
      .map((id) => parseInt(id, 10));
    let currentCategoryID = this?.args?.category?.id;

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
