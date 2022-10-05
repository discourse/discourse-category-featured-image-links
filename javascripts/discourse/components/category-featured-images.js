import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class CategoryFeaturedImages extends Component {
  @service router;

  get shouldShow() {
    return this.router.currentRoute.name.includes("discovery.category");
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

    let currentCategoryID = this?.args?.category?.id;

    let result = filteredSetting.filter(function (object) {
      return parseInt(object.category_id, 10) === currentCategoryID;
    });

    return result;
  }
}
