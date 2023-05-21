export const getYearsListOptions = (length = 70) => {
  const year = new Date().getFullYear();
  return Array.from(new Array(length), (val, index) => ({
    value: year - index,
    label: year - index,
  }));
};

export const getUniqueImagesFromCollection = (images) => {
  const uniqueImages = [];
  const imageUrls = new Set();

  images?.forEach(image => {
    const url = image?.href;

    if (url?.includes("thumb") && !imageUrls.has(url)) {
      imageUrls.add(url);
      uniqueImages.push(url);
    }
  });
  return uniqueImages;
};

export const mapCollectionMetadata = (data) => {
  return({
    title: data['AVAIL:Title'],
    description: data['AVAIL:Description'],
    location: data['AVAIL:Location'],
    keywords: data['AVAIL:Keywords'],
    photographer: data['AVAIL:Photographer'],
    date_created: convertDate(data['AVAIL:DateCreated']),
  })
}

const convertDate = (dateString) => {
  if (new Date(dateString) && ( new Date(dateString) instanceof Date && !isNaN(new Date(dateString)))) {
    return dateString
  }
  const [datePart] = dateString.split(" ");
  const [year, month, day] = datePart.split(":");

  return `${year}/${month}/${day}`;

}
