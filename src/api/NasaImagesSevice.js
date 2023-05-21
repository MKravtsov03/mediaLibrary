import axios from "axios";

export default class NasaImagesService {
  static async getSearchResults(payload) {
    console.log(payload)
    return axios.get(
      `https://images-api.nasa.gov/search?media_type=image&q=${payload?.searchString}${payload?.year_start && `&year_start=${payload.year_start}`}${payload?.year_end && `&year_end=${payload.year_end}`}&page=${payload.page}&page_size=${payload.page_size}`
    );
  }
  static async getAssetResults(payload) {
    console.log(payload)
    return axios.get(
      `https://images-api.nasa.gov/asset/${payload}`
    );
  }
  static async getCollectionData(payload) {
    console.log(payload)
    return axios.get(
      `https://images-assets.nasa.gov/image/${payload}/metadata.json`
    );
  }
}
