
const getDataApi = async (page = 1) => {
  try {
    let response = await fetch('http://dantri.com.vn/su-kien/toan-canh-hau-qua-bao-so-12-chua-tung-co-hon-20-nam-o-nha-trang-20171105073925328.htm');
    let responseJson = await response.text();
    return responseJson;
  } catch (error) {

  }
}
export default getDataApi;