export const updateServiceRatings = async (service, rating) => {
  service.totalRatings += 1;
  service.sumOfRatings += parseInt(rating);
  service.averageRating = parseFloat(
    service.sumOfRatings / service.totalRatings
  ).toFixed(2);
  await service.save();
};
